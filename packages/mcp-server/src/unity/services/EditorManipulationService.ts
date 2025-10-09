import axios from 'axios';

export interface SelectObjectsParams {
  names?: string[];
  tag?: string;
  pattern?: string;
  frame?: boolean;
}

export interface TransformParams {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  moveBy?: [number, number, number];
  rotateBy?: [number, number, number];
  scaleBy?: [number, number, number];
}

export interface AlignParams {
  alignment?: 'left' | 'right' | 'top' | 'bottom' | 'center-horizontal' | 'center-vertical';
}

export interface DistributeParams {
  axis?: 'horizontal' | 'vertical' | 'x' | 'y';
}

export interface ParentParams {
  parentName?: string;
}

export interface ComponentParams {
  operation: 'add' | 'remove';
  componentType: string;
}

export interface FindParams {
  type?: string;
  pattern?: string;
}

/**
 * Service for Unity Editor manipulation via HTTP communication
 * Provides real-time control over Unity Editor selection, transforms, and operations
 */
export class EditorManipulationService {
  private baseUrl: string;

  constructor(port: number = 8080) {
    this.baseUrl = `http://localhost:${port}`;
  }

  /**
   * Check if Unity Editor MCP server is running
   */
  async health(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, { timeout: 2000 });
      return response.data.status === 'ok';
    } catch {
      return false;
    }
  }

  /**
   * Select objects in Unity Editor
   */
  async selectObjects(params: SelectObjectsParams) {
    return this.post('/editor/select', params);
  }

  /**
   * Transform selected objects
   */
  async transformObjects(params: TransformParams) {
    return this.post('/editor/transform', params);
  }

  /**
   * Align selected objects
   */
  async alignObjects(params: AlignParams) {
    return this.post('/editor/align', params);
  }

  /**
   * Distribute selected objects evenly
   */
  async distributeObjects(params: DistributeParams) {
    return this.post('/editor/distribute', params);
  }

  /**
   * Duplicate selected objects
   */
  async duplicateObjects() {
    return this.post('/editor/duplicate', {});
  }

  /**
   * Delete selected objects
   */
  async deleteObjects() {
    return this.post('/editor/delete', {});
  }

  /**
   * Parent selected objects
   */
  async parentObjects(params: ParentParams) {
    return this.post('/editor/parent', params);
  }

  /**
   * Add or remove components
   */
  async componentOperation(params: ComponentParams) {
    return this.post('/editor/component', params);
  }

  /**
   * Find objects in scene
   */
  async findObjects(params: FindParams) {
    return this.post('/editor/find', params);
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
