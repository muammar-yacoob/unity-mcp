import { FastMCP } from "fastmcp";
import { z } from "zod";
import { TransportFactory } from "../transports/index.js";
import { PlayModeTestingService } from "../unity/services/PlayModeTestingService.js";
import { SceneOperationsService } from "../unity/services/SceneOperationsService.js";
import { AssetService } from "../unity/services/AssetService.js";

/**
 * SIMPLIFIED ARCHITECTURE: 8 Essential Tools
 *
 * This MCP server now follows the minimal philosophy:
 * - execute_csharp: Execute ANY Unity operation with full API access
 * - 7 convenience tools for common operations
 *
 * Inspired by Arodoid's UnityMCP - simplicity over complexity
 */
export function registerTools(server: FastMCP) {
  // Create transport instance (WebSocket by default, HTTP as fallback)
  const transport = TransportFactory.create();

  // Services for essential operations
  const playModeService = new PlayModeTestingService(transport);
  const sceneService = new SceneOperationsService(transport);
  const assetService = new AssetService(transport);

  // ===== THE KILLER TOOL ⭐ =====
  server.addTool({
    name: "execute_csharp",
    description: `Execute arbitrary C# code in Unity Editor context with full access to UnityEngine and UnityEditor APIs.

This is the most powerful tool - it enables you to perform ANY Unity operation without predefined tools.

Examples:
- Select objects: Selection.activeGameObject = GameObject.Find("Player");
- Transform: transform.position = new Vector3(0, 0, 0);
- Create objects: GameObject.CreatePrimitive(PrimitiveType.Cube);
- Modify components: GetComponent<Rigidbody>().mass = 10f;
- Scene operations: EditorSceneManager.SaveScene(EditorSceneManager.GetActiveScene());
- Asset operations: AssetDatabase.CreateAsset(myAsset, "Assets/MyAsset.asset");
- Play mode: EditorApplication.isPlaying = true;

The code has access to:
- UnityEngine (GameObject, Transform, Component, etc.)
- UnityEditor (Selection, EditorApplication, AssetDatabase, etc.)
- System.Linq
- System.Collections.Generic

Returns execution result with logs, warnings, and errors.`,
    parameters: z.object({
      code: z.string().min(1).describe("C# code to execute. Can be multi-line. Will be wrapped in a static method."),
    }),
    execute: async (params) => {
      try {
        // Send to Unity via transport
        const response = await transport.request("/execute_csharp", {
          code: params.code,
        });

        if (response && typeof response === "object" && "success" in response) {
          const result = response as {
            success: boolean;
            message: string;
            data?: any;
          };

          if (result.success) {
            return JSON.stringify({
              success: true,
              message: "Code executed successfully",
              ...result.data,
            }, null, 2);
          } else {
            return JSON.stringify({
              success: false,
              error: result.message,
              ...result.data,
            }, null, 2);
          }
        }

        return JSON.stringify({
          success: false,
          error: "Invalid response from Unity",
        }, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== SCENE OPERATIONS =====
  server.addTool({
    name: "get_scene_hierarchy",
    description: "Get the complete scene hierarchy with all GameObjects and their components. Returns a tree structure of the active scene.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await sceneService.getHierarchy();
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  server.addTool({
    name: "load_scene",
    description: "Load a scene by name or index. Useful for switching between scenes in your project.",
    parameters: z.object({
      sceneName: z.string().optional().describe("Scene name to load (e.g., 'MainMenu')"),
      sceneIndex: z.number().optional().describe("Scene index in build settings"),
      additive: z.boolean().optional().default(false).describe("Load additively without unloading current scene"),
    }),
    execute: async (params) => {
      try {
        const result = await sceneService.loadScene(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  server.addTool({
    name: "save_scene",
    description: "Save the current scene or all open scenes. Essential for preserving changes made during automation.",
    parameters: z.object({
      saveAll: z.boolean().optional().default(false).describe("Save all open scenes instead of just current"),
    }),
    execute: async (params) => {
      try {
        const result = await sceneService.saveScene(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== CONSOLE & LOGGING =====
  server.addTool({
    name: "get_console_logs",
    description: "Retrieve Unity console logs with filtering options. Essential for debugging and monitoring Unity Editor state.",
    parameters: z.object({
      types: z.array(z.enum(["Log", "Warning", "Error"])).optional().describe("Filter by log types"),
      limit: z.number().optional().default(100).describe("Maximum number of logs to return"),
      contains: z.string().optional().describe("Filter logs containing this text"),
    }),
    execute: async (params) => {
      try {
        const result = await assetService.getConsoleLogs(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== PLAY MODE TESTING =====
  server.addTool({
    name: "enter_playmode",
    description: "Enter Unity Play Mode for testing gameplay. Can optionally pause on enter.",
    parameters: z.object({
      pauseOnEnter: z.boolean().optional().default(false).describe("Pause immediately after entering play mode"),
    }),
    execute: async (params) => {
      try {
        const result = await playModeService.enterPlayMode(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  server.addTool({
    name: "exit_playmode",
    description: "Exit Unity Play Mode and return to Edit Mode. Safe way to stop gameplay testing.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await playModeService.exitPlayMode();
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  server.addTool({
    name: "get_playmode_status",
    description: "Get current Play Mode status (playing, paused, or stopped) and recent logs from play mode.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await playModeService.getStatus();
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  console.error("[Unity MCP] ✨ Simplified architecture with 8 essential tools registered");
  console.error("[Unity MCP] 🎯 Use 'execute_csharp' for maximum flexibility with Unity API");
}
