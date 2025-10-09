import axios from 'axios';

export interface LoadSceneParams {
  index?: number;
  sceneName?: string;
}

export interface SaveSceneParams {
  saveAll?: boolean;
}

export interface CreateSceneParams {
  sceneName?: string;
}

export interface FindInSceneParams {
  tag?: string;
  pattern?: string;
  componentType?: string;
}

export interface CleanupSceneParams {
  removeMissingScripts?: boolean;
  removeEmpty?: boolean;
}

/**
 * Service for Unity scene operations and hierarchy management
 * Provides scene navigation, object finding, and batch operations
 */
export class SceneOperationsService {
  private baseUrl: string;

  constructor(port: number = 8080) {
    this.baseUrl = `http://localhost:${port}`;
  }

  /**
   * List all scenes in build settings
   */
  async listScenes() {
    return this.post('/scene/list', {});
  }

  /**
   * Load a scene
   */
  async loadScene(params: LoadSceneParams) {
    return this.post('/scene/load', params);
  }

  /**
   * Save current or all scenes
   */
  async saveScene(params: SaveSceneParams = {}) {
    return this.post('/scene/save', params);
  }

  /**
   * Create a new scene
   */
  async createNewScene(params: CreateSceneParams = {}) {
    return this.post('/scene/new', params);
  }

  /**
   * Get scene hierarchy
   */
  async getHierarchy() {
    return this.post('/scene/hierarchy', {});
  }

  /**
   * Find objects in current scene
   */
  async findInScene(params: FindInSceneParams) {
    return this.post('/scene/find', params);
  }

  /**
   * Clean up scene (remove missing scripts, empty objects, etc.)
   */
  async cleanupScene(params: CleanupSceneParams) {
    return this.post('/scene/cleanup', params);
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
