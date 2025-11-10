import { ITransport } from '../../transports/index.js';
import { BaseService } from './BaseService.js';

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
 * Supports both HTTP and WebSocket transports
 */
export class SceneOperationsService extends BaseService {
  constructor(transport: ITransport) {
    super(transport);
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
}
