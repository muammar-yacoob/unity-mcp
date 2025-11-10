import { ITransport } from '../../transports/index.js';
import { BaseService } from './BaseService.js';

export interface EnterPlayModeParams {
  pauseOnEnter?: boolean;
}

export interface RunTestParams {
  testName?: string;
  targetObject?: string;
  action?: 'move' | 'destroy' | 'activate';
  x?: number;
  y?: number;
  z?: number;
  value?: boolean;
  duration?: number;
  exitAfter?: boolean;
}

export interface TimeScaleParams {
  timeScale?: number;
}

export interface ScreenshotParams {
  screenshotPath?: string;
}

/**
 * Service for Unity Play Mode testing and automation
 * Enables automated testing workflows for game development
 * Supports both HTTP and WebSocket transports
 */
export class PlayModeTestingService extends BaseService {
  constructor(transport: ITransport) {
    super(transport);
  }

  /**
   * Enter play mode
   */
  async enterPlayMode(params: EnterPlayModeParams = {}) {
    return this.post('/playmode/enter', params);
  }

  /**
   * Exit play mode
   */
  async exitPlayMode() {
    return this.post('/playmode/exit', {});
  }

  /**
   * Get play mode status
   */
  async getStatus() {
    return this.post('/playmode/status', {});
  }

  /**
   * Run automated test
   */
  async runTest(params: RunTestParams) {
    return this.post('/playmode/test', params);
  }

  /**
   * Pause/unpause play mode
   */
  async pause() {
    return this.post('/playmode/pause', {});
  }

  /**
   * Step one frame
   */
  async stepFrame() {
    return this.post('/playmode/step', {});
  }

  /**
   * Set time scale
   */
  async setTimeScale(params: TimeScaleParams) {
    return this.post('/playmode/timescale', params);
  }

  /**
   * Capture screenshot
   */
  async captureScreenshot(params: ScreenshotParams = {}) {
    return this.post('/playmode/screenshot', params);
  }
}
