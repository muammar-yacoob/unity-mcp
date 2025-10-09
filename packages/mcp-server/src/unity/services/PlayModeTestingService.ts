import axios from 'axios';

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
 */
export class PlayModeTestingService {
  private baseUrl: string;

  constructor(port: number = 8080) {
    this.baseUrl = `http://localhost:${port}`;
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

  private async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000 // Play mode operations may take longer
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
