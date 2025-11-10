import { ITransport } from './ITransport.js';
import { HttpTransport } from './http.js';
import { WebSocketTransport } from './websocket.js';

export type TransportType = 'http' | 'websocket';

export interface TransportConfig {
  type: TransportType;
  port?: number;
  timeout?: number;
}

/**
 * Factory for creating transport instances based on configuration
 */
export class TransportFactory {
  /**
   * Create a transport instance based on environment variables or config
   */
  static create(config?: Partial<TransportConfig>): ITransport {
    const transportType = (config?.type ||
      process.env.UNITY_MCP_TRANSPORT ||
      'http') as TransportType;

    const httpPort = parseInt(process.env.UNITY_MCP_HTTP_PORT || '8080');
    const wsPort = parseInt(process.env.UNITY_MCP_WS_PORT || '8090');
    const timeout = parseInt(process.env.UNITY_MCP_TIMEOUT || '30000');

    switch (transportType) {
      case 'websocket':
        const port = config?.port || wsPort;
        const wsTimeout = config?.timeout || timeout;
        console.error(`[Unity MCP] Using WebSocket transport on port ${port}`);
        return new WebSocketTransport(port, wsTimeout);

      case 'http':
      default:
        const httpPortFinal = config?.port || httpPort;
        const httpTimeout = config?.timeout || timeout;
        console.error(`[Unity MCP] Using HTTP transport on port ${httpPortFinal}`);
        return new HttpTransport(httpPortFinal, httpTimeout);
    }
  }

  /**
   * Get the configured transport type from environment
   */
  static getConfiguredType(): TransportType {
    return (process.env.UNITY_MCP_TRANSPORT || 'http') as TransportType;
  }
}
