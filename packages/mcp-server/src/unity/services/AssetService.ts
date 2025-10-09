import axios from 'axios';

export interface GetConsoleLogsParams {
  logType?: 'all' | 'error' | 'warning' | 'log';
  limit?: number;
}

export interface CreatePrefabParams {
  prefabName: string;
  folderPath?: string;
}

export interface GetAssetsParams {
  type?: string;
  folder?: string;
}

/**
 * Service for Unity console logs, assets, and project operations
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
    return this.post('/console/get_logs', params);
  }

  /**
   * Clear Unity console logs
   */
  async clearConsole() {
    return this.post('/console/clear', {});
  }

  /**
   * Create prefab from selected GameObject
   */
  async createPrefab(params: CreatePrefabParams) {
    return this.post('/asset/create_prefab', params);
  }

  /**
   * Get list of assets in project
   */
  async getAssets(params: GetAssetsParams = {}) {
    return this.post('/project/get_assets', params);
  }

  /**
   * Refresh Unity asset database
   */
  async refreshAssets() {
    return this.post('/asset/refresh', {});
  }

  private async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
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
