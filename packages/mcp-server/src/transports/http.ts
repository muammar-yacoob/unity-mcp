import axios, { AxiosInstance } from 'axios';
import { ITransport } from './ITransport.js';

/**
 * HTTP transport for Unity Editor communication
 * Uses axios to make REST API calls to Unity's HTTP server
 */
export class HttpTransport implements ITransport {
  private client: AxiosInstance;
  private baseUrl: string;
  private timeout: number;

  constructor(port: number = 8080, timeout: number = 30000) {
    this.baseUrl = `http://localhost:${port}`;
    this.timeout = timeout;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async request<T = any>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `HTTP request failed: ${error.message}${
            error.response ? ` (Status: ${error.response.status})` : ''
          }`
        );
      }
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      const response = await this.client.get('/health', { timeout: 2000 });
      return response.data.status === 'ok';
    } catch {
      return false;
    }
  }

  async connect(): Promise<void> {
    // HTTP doesn't require explicit connection
    // Verify server is reachable
    const connected = await this.isConnected();
    if (!connected) {
      throw new Error('Unity Editor HTTP server not reachable');
    }
  }

  async disconnect(): Promise<void> {
    // HTTP doesn't require explicit disconnection
  }

  getType(): 'http' {
    return 'http';
  }
}
