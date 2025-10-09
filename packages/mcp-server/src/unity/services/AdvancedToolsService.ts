import axios from 'axios';

export interface ExecuteMenuParams {
  menuPath: string;
}

export interface AddPackageParams {
  packageName: string;
}

export interface RunTestsParams {
  testMode?: 'EditMode' | 'PlayMode';
  filter?: string;
}

export interface AddAssetToSceneParams {
  assetPath: string;
  parentPath?: string;
}

export interface CreateScriptParams {
  scriptName: string;
  content?: string;
  folderPath?: string;
}

export interface ReadScriptParams {
  scriptPath: string;
}

export interface UpdateScriptParams {
  scriptPath: string;
  content: string;
}

export interface DeleteScriptParams {
  scriptPath: string;
}

export interface ValidateScriptParams {
  scriptPath?: string;
  content?: string;
}

/**
 * Service for advanced Unity tools
 * Provides menu execution, package management, testing, and script operations
 */
export class AdvancedToolsService {
  private baseUrl: string;

  constructor(port: number = 8080) {
    this.baseUrl = `http://localhost:${port}`;
  }

  /**
   * Execute Unity Editor menu item
   */
  async executeMenuItem(params: ExecuteMenuParams) {
    return this.post('/advanced/execute_menu', params);
  }

  /**
   * Install Unity package via Package Manager
   */
  async addPackage(params: AddPackageParams) {
    return this.post('/advanced/add_package', params);
  }

  /**
   * Run Unity Test Runner tests
   */
  async runUnityTests(params: RunTestsParams = {}) {
    return this.post('/advanced/run_tests', params);
  }

  /**
   * Add asset to current scene
   */
  async addAssetToScene(params: AddAssetToSceneParams) {
    return this.post('/advanced/add_asset_to_scene', params);
  }

  /**
   * Create new C# script
   */
  async createScript(params: CreateScriptParams) {
    return this.post('/advanced/create_script', params);
  }

  /**
   * Read script contents
   */
  async readScript(params: ReadScriptParams) {
    return this.post('/advanced/read_script', params);
  }

  /**
   * Update script contents
   */
  async updateScript(params: UpdateScriptParams) {
    return this.post('/advanced/update_script', params);
  }

  /**
   * Delete script file
   */
  async deleteScript(params: DeleteScriptParams) {
    return this.post('/advanced/delete_script', params);
  }

  /**
   * Validate C# script syntax
   */
  async validateScript(params: ValidateScriptParams) {
    return this.post('/advanced/validate_script', params);
  }

  private async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000 // Advanced operations may take longer
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
