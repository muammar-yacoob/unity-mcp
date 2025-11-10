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

    this.isConnecting = true;
    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        const connectTimeout = setTimeout(() => {
          if (this.ws) {
            this.ws.close();
          }
          this.isConnecting = false;
          reject(new Error('WebSocket connection timeout'));
        }, 10000);

        this.ws.on('open', () => {
          clearTimeout(connectTimeout);
          this.reconnectAttempts = 0;
          this.isConnecting = false;
          console.error(`[Unity MCP] WebSocket connected to ${this.url}`);
          resolve();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
          this.handleMessage(data.toString());
        });

        this.ws.on('error', (error) => {
          console.error('[Unity MCP] WebSocket error:', error.message);
          clearTimeout(connectTimeout);
          this.isConnecting = false;
          if (this.ws?.readyState === WebSocket.CONNECTING) {
            reject(error);
          }
        });

        this.ws.on('close', () => {
          console.error('[Unity MCP] WebSocket disconnected');
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
    try {
      const response: JsonRpcResponse = JSON.parse(data);

      if (!response.id) {
        console.error('[Unity MCP] Received message without ID:', data);
        return;
      }

      const pending = this.pendingRequests.get(response.id);
      if (!pending) {
        console.error('[Unity MCP] Received response for unknown request:', response.id);
        return;
      }

      // Clear timeout
      clearTimeout(pending.timeout);
      this.pendingRequests.delete(response.id);

      // Handle error or result
      if (response.error) {
        pending.reject(
          new Error(`Unity error: ${response.error.message} (code: ${response.error.code})`)
        );
      } else {
        pending.resolve(response.result);
      }
    } catch (error) {
      console.error('[Unity MCP] Error parsing WebSocket message:', error);
    }
  }

  async request<T = any>(endpoint: string, params: any): Promise<T> {
    // Ensure we're connected
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      await this.connect();
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not connected');
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

    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error(`Request timeout: ${method}`));
      }, this.requestTimeout);

      this.pendingRequests.set(id, { resolve, reject, timeout });

      try {
        this.ws!.send(JSON.stringify(request));
      } catch (error) {
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
