import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { ITransport } from './ITransport.js';

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timeout: NodeJS.Timeout;
}

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params: any;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

/**
 * WebSocket transport for Unity Editor communication
 * Uses JSON-RPC 2.0 protocol for request/response correlation
 */
export class WebSocketTransport implements ITransport {
  private ws: WebSocket | null = null;
  private url: string;
  private pendingRequests: Map<string, PendingRequest> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private requestTimeout: number;
  private isConnecting = false;
  private connectionPromise: Promise<void> | null = null;

  constructor(port: number = 8090, requestTimeout: number = 30000) {
    this.url = `ws://localhost:${port}`;
    this.requestTimeout = requestTimeout;
  }

  async connect(): Promise<void> {
    // If already connecting, return the existing promise
    if (this.isConnecting && this.connectionPromise) {
      return this.connectionPromise;
    }

    // If already connected, return immediately
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }

    console.error(`[Unity MCP] Attempting to connect to Unity Editor at ${this.url}`);
    console.error('[Unity MCP] Make sure Unity Editor is running with MCP WebSocket server started');
    console.error('[Unity MCP] Check Unity Console for: "[Unity MCP] WebSocket server started on port..."');

    this.isConnecting = true;
    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        const connectTimeout = setTimeout(() => {
          if (this.ws) {
            this.ws.close();
          }
          this.isConnecting = false;
          const errorMsg = `WebSocket connection timeout to ${this.url}. ` +
            `Make sure Unity Editor is running and MCP WebSocket server is started. ` +
            `Check Unity Console (Window > General > Console) for server status.`;
          console.error(`[Unity MCP] ${errorMsg}`);
          reject(new Error(errorMsg));
        }, 10000);

        this.ws.on('open', () => {
          clearTimeout(connectTimeout);
          this.reconnectAttempts = 0;
          this.isConnecting = false;
          console.error(`[Unity MCP] WebSocket connected to ${this.url}`);
          resolve();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
          console.error('[Unity MCP] WebSocket.on("message") event fired');
          const messageStr = data.toString();
          console.error('[Unity MCP] Raw message received, type:', typeof data, 'length:', messageStr.length);
          this.handleMessage(messageStr);
        });

        this.ws.on('error', (error) => {
          const errorMsg = error instanceof Error ? error.message : String(error);
          console.error(`[Unity MCP] WebSocket connection error: ${errorMsg}`);
          console.error(`[Unity MCP] Failed to connect to ${this.url}`);
          console.error('[Unity MCP] Troubleshooting:');
          console.error('  1. Is Unity Editor running?');
          console.error('  2. Is MCP WebSocket server started? (Check Unity Console)');
          console.error('  3. Is the port correct? (Default: 8090)');
          console.error('  4. Check Unity > Tools > Unity MCP > Control Panel');
          clearTimeout(connectTimeout);
          this.isConnecting = false;
          if (this.ws?.readyState === WebSocket.CONNECTING) {
            reject(new Error(`Failed to connect to Unity Editor: ${errorMsg}. ` +
              `Make sure Unity is running with MCP WebSocket server started.`));
          }
        });

        this.ws.on('close', (code, reason) => {
          console.error('[Unity MCP] WebSocket disconnected', 'code:', code, 'reason:', reason?.toString());
          console.error('[Unity MCP] Pending requests at disconnect:', Array.from(this.pendingRequests.keys()));
          this.handleDisconnect();
        });
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  async disconnect(): Promise<void> {
    if (this.ws) {
      // Reject all pending requests
      for (const pending of this.pendingRequests.values()) {
        clearTimeout(pending.timeout);
        pending.reject(new Error('WebSocket disconnected'));
      }
      this.pendingRequests.clear();

      this.ws.close();
      this.ws = null;
    }
    this.isConnecting = false;
    this.connectionPromise = null;
  }

  private handleDisconnect(): void {
    // Reject all pending requests
    for (const pending of this.pendingRequests.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error('WebSocket connection closed'));
    }
    this.pendingRequests.clear();

    // Auto-reconnect logic
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.error(
        `[Unity MCP] Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`
      );
      setTimeout(() => {
        this.connect().catch((err) => {
          console.error('[Unity MCP] Reconnection failed:', err.message);
        });
      }, delay);
    }
  }

  private handleMessage(data: string): void {
    console.error('[Unity MCP] WebSocket received message, length:', data.length);
    console.error('[Unity MCP] Message preview:', data.substring(0, Math.min(200, data.length)));

    try {
      const response: JsonRpcResponse = JSON.parse(data);
      console.error('[Unity MCP] Parsed JSON successfully, id:', response.id);
      console.error('[Unity MCP] Response has error?', !!response.error, 'has result?', !!response.result);

      if (!response.id) {
        console.error('[Unity MCP] Received message without ID:', data);
        return;
      }

      const pending = this.pendingRequests.get(response.id);
      if (!pending) {
        console.error('[Unity MCP] Received response for unknown request:', response.id);
        console.error('[Unity MCP] Pending requests:', Array.from(this.pendingRequests.keys()));
        console.error('[Unity MCP] Full response:', JSON.stringify(response, null, 2));
        return;
      }

      console.error('[Unity MCP] Found pending request, resolving...');

      // Clear timeout
      clearTimeout(pending.timeout);
      this.pendingRequests.delete(response.id);

      // Handle error or result
      if (response.error) {
        console.error('[Unity MCP] Response has error:', JSON.stringify(response.error, null, 2));
        pending.reject(
          new Error(`Unity error: ${response.error.message} (code: ${response.error.code})`)
        );
      } else if (response.result !== undefined) {
        console.error('[Unity MCP] Response has result, type:', typeof response.result);
        console.error('[Unity MCP] Result preview:', JSON.stringify(response.result).substring(0, 200));
        pending.resolve(response.result);
      } else {
        console.error('[Unity MCP] Response has neither error nor result!', JSON.stringify(response, null, 2));
        pending.reject(new Error('Invalid JSON-RPC response: missing both error and result'));
      }
    } catch (error) {
      console.error('[Unity MCP] Error parsing WebSocket message:', error);
      console.error('[Unity MCP] Raw data that failed to parse:', data);
      // Try to find and reject any pending requests that might be waiting
      // This is a fallback in case the response format is unexpected
      if (this.pendingRequests.size > 0) {
        console.error('[Unity MCP] Attempting to reject oldest pending request as fallback');
        const oldestId = Array.from(this.pendingRequests.keys())[0];
        const oldest = this.pendingRequests.get(oldestId);
        if (oldest) {
          clearTimeout(oldest.timeout);
          this.pendingRequests.delete(oldestId);
          oldest.reject(new Error(`Failed to parse Unity response: ${error instanceof Error ? error.message : String(error)}`));
        }
      }
    }
  }

  async request<T = any>(endpoint: string, params: any): Promise<T> {
    // Ensure we're connected
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      await this.connect();
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      const state = this.ws ? 
        (this.ws.readyState === WebSocket.CONNECTING ? 'CONNECTING' :
         this.ws.readyState === WebSocket.CLOSING ? 'CLOSING' :
         this.ws.readyState === WebSocket.CLOSED ? 'CLOSED' : 'UNKNOWN') : 'NULL';
      throw new Error(`WebSocket not connected (state: ${state}). ` +
        `Make sure Unity Editor is running with MCP WebSocket server started on port ${this.url.split(':').pop()}`);
    }

    const id = uuidv4();

    // Convert HTTP-style endpoint to method name
    // e.g., '/editor/select' -> 'unity_editor_select'
    const method = this.endpointToMethod(endpoint);

    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };

    console.error('[Unity MCP] Sending request:', JSON.stringify(request).substring(0, 200));
    console.error('[Unity MCP] Request ID:', id, 'Method:', method, 'Timeout:', this.requestTimeout, 'ms');

    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const wsState = this.ws ? this.ws.readyState : 'null';
        const wsStateName = this.ws ? 
          (this.ws.readyState === WebSocket.OPEN ? 'OPEN' :
           this.ws.readyState === WebSocket.CONNECTING ? 'CONNECTING' :
           this.ws.readyState === WebSocket.CLOSING ? 'CLOSING' :
           this.ws.readyState === WebSocket.CLOSED ? 'CLOSED' : 'UNKNOWN') : 'NULL';
        console.error('[Unity MCP] REQUEST TIMEOUT!', 'ID:', id, 'Method:', method);
        console.error('[Unity MCP] WebSocket state:', wsStateName, `(${wsState})`);
        console.error('[Unity MCP] Pending requests at timeout:', Array.from(this.pendingRequests.keys()));
        console.error('[Unity MCP] Is connected?', this.ws && this.ws.readyState === WebSocket.OPEN);
        this.pendingRequests.delete(id);
        reject(new Error(`Request timeout: ${method} (WebSocket state: ${wsStateName})`));
      }, this.requestTimeout);

      this.pendingRequests.set(id, { resolve, reject, timeout });

      try {
        this.ws!.send(JSON.stringify(request));
        console.error('[Unity MCP] Message sent to WebSocket successfully');
      } catch (error) {
        console.error('[Unity MCP] Failed to send message to WebSocket:', error);
        clearTimeout(timeout);
        this.pendingRequests.delete(id);
        reject(error);
      }
    });
  }

  private endpointToMethod(endpoint: string): string {
    // Convert '/editor/select' to 'editor_select'
    // Remove leading slash and replace remaining slashes with underscores
    const cleaned = endpoint.replace(/^\//, '').replace(/\//g, '_');
    return cleaned;
  }

  async isConnected(): Promise<boolean> {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  getType(): 'websocket' {
    return 'websocket';
  }
}
