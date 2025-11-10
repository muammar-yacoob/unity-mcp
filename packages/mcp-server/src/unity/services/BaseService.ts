import { ITransport } from '../../transports/index.js';

/**
 * Base service class providing transport abstraction
 * All Unity services should extend this class
 */
export class BaseService {
  protected transport: ITransport;

  constructor(transport: ITransport) {
    this.transport = transport;
  }

  /**
   * Check if Unity Editor is reachable
   */
  async health(): Promise<boolean> {
    try {
      return await this.transport.isConnected();
    } catch {
      return false;
    }
  }

  /**
   * Send a request to Unity Editor via the configured transport
   * @param endpoint The endpoint path
   * @param data The request data
   * @returns The response from Unity
   */
  protected async post<T = any>(endpoint: string, data: any): Promise<T> {
    try {
      return await this.transport.request<T>(endpoint, data);
    } catch (error) {
      throw error;
    }
  }
}
