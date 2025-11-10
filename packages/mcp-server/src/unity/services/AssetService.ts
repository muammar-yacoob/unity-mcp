import { ITransport } from '../../transports/index.js';
import { BaseService } from './BaseService.js';

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
 * Supports both HTTP and WebSocket transports
 */
export class AssetService extends BaseService {
  constructor(transport: ITransport) {
    super(transport);
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
}
