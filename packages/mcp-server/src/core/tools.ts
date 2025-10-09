import { FastMCP } from "fastmcp";
import { z } from "zod";
import { SetupService } from "../unity/services/SetupService.js";
import { EditorManipulationService } from "../unity/services/EditorManipulationService.js";
import { PlayModeTestingService } from "../unity/services/PlayModeTestingService.js";
import { SceneOperationsService } from "../unity/services/SceneOperationsService.js";

/**
 * Register all Unity MCP tools with the server
 * Focused on real Unity Editor interaction and automation
 */
export function registerTools(server: FastMCP) {
  const setupService = new SetupService();
  const editorService = new EditorManipulationService();
  const playModeService = new PlayModeTestingService();
  const sceneService = new SceneOperationsService();

  // ===== SETUP TOOL =====
  server.addTool({
    name: "setup_unity_mcp",
    description: "Install Unity MCP editor integration into a Unity project. Run this first to enable editor control.",
    parameters: z.object({
      projectPath: z.string().describe("Path to the Unity project root directory (containing Assets folder)"),
    }),
    execute: async (params) => {
      try {
        const result = await setupService.setupUnityMCP({
          projectPath: params.projectPath,
        });
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== EDITOR MANIPULATION TOOLS =====
  server.addTool({
    name: "unity_select_objects",
    description: "Select objects in Unity Editor by name, tag, or pattern. Frame the selection in Scene view.",
    parameters: z.object({
      names: z.array(z.string()).optional().describe("Object names to select"),
      tag: z.string().optional().describe("Select all objects with this tag"),
      pattern: z.string().optional().describe("Select objects whose names contain this pattern"),
      frame: z.boolean().optional().default(false).describe("Frame selected objects in Scene view"),
    }),
    execute: async (params) => {
      try {
        const result = await editorService.selectObjects(params);
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
    name: "unity_transform_objects",
    description: "Transform selected objects in Unity Editor. Set or modify position, rotation, and scale.",
    parameters: z.object({
      position: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Absolute position [x, y, z]"),
      rotation: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Absolute rotation [x, y, z] in degrees"),
      scale: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Absolute scale [x, y, z]"),
      moveBy: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Relative movement [x, y, z]"),
      rotateBy: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Relative rotation [x, y, z] in degrees"),
      scaleBy: z.tuple([z.number(), z.number(), z.number()]).optional().describe("Relative scale multiplier [x, y, z]"),
    }),
    execute: async (params) => {
      try {
        const result = await editorService.transformObjects(params as any);
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
    name: "unity_align_objects",
    description: "Align selected objects in Unity Editor. Supports left, right, top, bottom, center horizontal/vertical.",
    parameters: z.object({
      alignment: z.enum(["left", "right", "top", "bottom", "center-horizontal", "center-vertical"]).describe("Alignment direction"),
    }),
    execute: async (params) => {
      try {
        const result = await editorService.alignObjects(params);
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
    name: "unity_distribute_objects",
    description: "Distribute selected objects evenly in Unity Editor. Requires 3+ objects selected.",
    parameters: z.object({
      axis: z.enum(["horizontal", "vertical", "x", "y"]).describe("Distribution axis"),
    }),
    execute: async (params) => {
      try {
        const result = await editorService.distributeObjects(params);
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
    name: "unity_duplicate_objects",
    description: "Duplicate selected objects in Unity Editor with undo support.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await editorService.duplicateObjects();
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
    name: "unity_delete_objects",
    description: "Delete selected objects in Unity Editor with undo support.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await editorService.deleteObjects();
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
    name: "unity_find_objects",
    description: "Find objects in Unity Editor by component type or name pattern.",
    parameters: z.object({
      type: z.string().optional().describe("Component type to find (e.g., 'UnityEngine.Camera')"),
      pattern: z.string().optional().describe("Name pattern to match"),
    }),
    execute: async (params) => {
      try {
        const result = await editorService.findObjects(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== PLAY MODE TESTING TOOLS =====
  server.addTool({
    name: "unity_enter_play_mode",
    description: "Enter Unity play mode for testing. Optionally pause on enter for debugging.",
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
    name: "unity_exit_play_mode",
    description: "Exit Unity play mode.",
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
    name: "unity_run_test",
    description: "Run automated test in Unity play mode. Can move, destroy, or activate objects and wait for duration.",
    parameters: z.object({
      testName: z.string().describe("Name of the test for logging"),
      targetObject: z.string().optional().describe("GameObject name to operate on"),
      action: z.enum(["move", "destroy", "activate"]).optional().describe("Action to perform on target"),
      x: z.number().optional().describe("X position for move action"),
      y: z.number().optional().describe("Y position for move action"),
      z: z.number().optional().describe("Z position for move action"),
      value: z.boolean().optional().describe("Boolean value for activate action"),
      duration: z.number().optional().default(0).describe("Wait duration in seconds"),
      exitAfter: z.boolean().optional().default(false).describe("Exit play mode after test completes"),
    }),
    execute: async (params) => {
      try {
        const result = await playModeService.runTest(params);
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
    name: "unity_playmode_status",
    description: "Get Unity play mode status including test logs and timing information.",
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

  server.addTool({
    name: "unity_set_timescale",
    description: "Set Unity time scale for slow motion or fast forward testing. Default is 1.0.",
    parameters: z.object({
      timeScale: z.number().min(0).max(10).describe("Time scale multiplier (0.1 = slow motion, 2.0 = fast forward)"),
    }),
    execute: async (params) => {
      try {
        const result = await playModeService.setTimeScale(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== SCENE OPERATION TOOLS =====
  server.addTool({
    name: "unity_list_scenes",
    description: "List all scenes in Unity project build settings and currently loaded scenes.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await sceneService.listScenes();
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
    name: "unity_load_scene",
    description: "Load a Unity scene by name or build index.",
    parameters: z.object({
      index: z.number().optional().describe("Scene build index"),
      sceneName: z.string().optional().describe("Scene name"),
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
    name: "unity_save_scene",
    description: "Save current Unity scene or all open scenes.",
    parameters: z.object({
      saveAll: z.boolean().optional().default(false).describe("Save all open scenes"),
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

  server.addTool({
    name: "unity_get_hierarchy",
    description: "Get Unity scene hierarchy with all GameObjects, components, and children.",
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
    name: "unity_find_in_scene",
    description: "Find objects in current Unity scene by tag, name pattern, or component type.",
    parameters: z.object({
      tag: z.string().optional().describe("Tag to search for"),
      pattern: z.string().optional().describe("Name pattern to match"),
      componentType: z.string().optional().describe("Component type (e.g., 'UnityEngine.Camera')"),
    }),
    execute: async (params) => {
      try {
        const result = await sceneService.findInScene(params);
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
    name: "unity_cleanup_scene",
    description: "Clean up Unity scene by removing missing scripts and empty GameObjects.",
    parameters: z.object({
      removeMissingScripts: z.boolean().optional().default(true).describe("Remove missing script references"),
      removeEmpty: z.boolean().optional().default(false).describe("Remove empty GameObjects (with only Transform)"),
    }),
    execute: async (params) => {
      try {
        const result = await sceneService.cleanupScene(params);
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });
}
