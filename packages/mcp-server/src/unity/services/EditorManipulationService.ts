import { ITransport } from '../../transports/index.js';
import { BaseService } from './BaseService.js';

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
 * Service for Unity Editor manipulation
 * Provides real-time control over Unity Editor selection, transforms, and operations
 * Supports both HTTP and WebSocket transports
 */
export class EditorManipulationService extends BaseService {
  constructor(transport: ITransport) {
    super(transport);
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
}
