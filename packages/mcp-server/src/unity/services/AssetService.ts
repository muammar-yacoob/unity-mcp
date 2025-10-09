import axios from 'axios';

export interface GetConsoleLogsParams {
  logType?: 'all' | 'error' | 'warning' | 'log';
  limit?: number;
}

export interface CreatePrefabParams {
  prefabName: string;
  folderPath?: string;
}

/**
 * Service for Unity asset and console operations
 * Provides console log access, prefab creation, and asset management
 */
export class AssetService {
  private baseUrl: string;

  constructor(port: number = 8080) {
    this.baseUrl = `http://localhost:${port}`;
  }

  /**
   * Get console logs from Unity Editor
   */
  async getConsoleLogs(params: GetConsoleLogsParams = {}) {
    return this.get('/console/logs', params);
  }

  /**
   * Clear console logs
   */
  async clearConsole() {
    return this.post('/console/clear', {});
  }

  /**
   * Create a prefab from selected GameObject(s)
   */
  async createPrefab(params: CreatePrefabParams) {
    return this.post('/asset/prefab/create', params);
  }

  /**
   * Get list of assets in project
   */
  async getAssets(params: { type?: string; folder?: string } = {}) {
    return this.get('/project/assets', params);
  }

  /**
   * Refresh asset database
   */
  async refreshAssets() {
    return this.post('/asset/refresh', {});
  }

  private async get(endpoint: string, params: any = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params,
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Unity Editor MCP server is not running. Please start Unity Editor and ensure the MCP server is installed.');
        }
        throw new Error(`Unity Editor request failed: ${error.message}`);
      }
      throw error;
    }
  }

  private async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Unity Editor MCP server is not running. Please start Unity Editor and ensure the MCP server is installed.');
        }
        throw new Error(`Unity Editor request failed: ${error.message}`);
      }
      throw error;
    }
  }
}
