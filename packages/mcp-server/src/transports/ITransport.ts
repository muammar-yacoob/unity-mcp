/**
 * Transport interface for Unity Editor communication
 * Supports both HTTP and WebSocket transports
 */
export interface ITransport {
  /**
   * Send a request to Unity Editor
   * @param endpoint The endpoint path (e.g., '/editor/select')
   * @param data The request payload
   * @returns The response from Unity
   */
  request<T = any>(endpoint: string, data: any): Promise<T>;

  /**
   * Check if the transport is connected and ready
   * @returns True if connected, false otherwise
   */
  isConnected(): Promise<boolean>;

  /**
   * Connect to Unity Editor (for WebSocket)
   * @returns Promise that resolves when connected
   */
  connect(): Promise<void>;

  /**
   * Disconnect from Unity Editor (for WebSocket)
   */
  disconnect(): Promise<void>;

  /**
   * Get the transport type
   */
  getType(): 'http' | 'websocket';
}
