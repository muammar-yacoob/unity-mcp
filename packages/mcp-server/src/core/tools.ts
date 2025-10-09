import { FastMCP } from "fastmcp";
import { z } from "zod";
import { SetupService } from "../unity/services/SetupService.js";
import { EditorManipulationService } from "../unity/services/EditorManipulationService.js";
import { PlayModeTestingService } from "../unity/services/PlayModeTestingService.js";
import { SceneOperationsService } from "../unity/services/SceneOperationsService.js";
import { AssetService } from "../unity/services/AssetService.js";
import { AdvancedToolsService } from "../unity/services/AdvancedToolsService.js";

/**
 * Register all Unity MCP tools with the server
 * Focused on real Unity Editor interaction and automation
 */
export function registerTools(server: FastMCP) {
  const setupService = new SetupService();
  const editorService = new EditorManipulationService();
  const playModeService = new PlayModeTestingService();
  const sceneService = new SceneOperationsService();
  const assetService = new AssetService();
  const advancedService = new AdvancedToolsService();

  // ===== SETUP TOOL =====
  server.addTool({
    name: "setup_unity_mcp",
    description: "Install Unity MCP editor integration into a Unity project. Run this first to enable editor control.",
    parameters: z.object({
      projectPath: z.string().describe("Path to the Unity project root directory (containing Assets folder)"),
    }),
    execute: async (params) => {
      try {
        const result = await setupService.setupunity-mcp({
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

  // ===== CONSOLE & ASSET TOOLS =====
  server.addTool({
    name: "unity_get_console_logs",
    description: "Get console logs from Unity Editor for debugging. Filter by log type and limit results.",
    parameters: z.object({
      logType: z.enum(["all", "error", "warning", "log"]).optional().default("all").describe("Type of logs to retrieve"),
      limit: z.number().optional().default(50).describe("Maximum number of logs to return"),
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

  server.addTool({
    name: "unity_clear_console",
    description: "Clear all console logs in Unity Editor.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await assetService.clearConsole();
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
    name: "unity_create_prefab",
    description: "Create a prefab from currently selected GameObject(s) in Unity Editor.",
    parameters: z.object({
      prefabName: z.string().describe("Name for the prefab file"),
      folderPath: z.string().optional().default("Assets/Prefabs").describe("Folder path to save prefab (e.g., 'Assets/Prefabs')"),
    }),
    execute: async (params) => {
      try {
        const result = await assetService.createPrefab(params);
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
    name: "unity_get_assets",
    description: "Get list of assets in Unity project. Filter by type or folder path.",
    parameters: z.object({
      type: z.string().optional().describe("Asset type filter (e.g., 'Prefab', 'Material', 'Script')"),
      folder: z.string().optional().describe("Folder path to search in (e.g., 'Assets/Scripts')"),
    }),
    execute: async (params) => {
      try {
        const result = await assetService.getAssets(params);
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
    name: "unity_refresh_assets",
    description: "Refresh Unity asset database to detect new or modified files.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const result = await assetService.refreshAssets();
        return JSON.stringify(result, null, 2);
      } catch (error) {
        return JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }, null, 2);
      }
    },
  });

  // ===== ADVANCED TOOLS =====
  server.addTool({
    name: "unity_execute_menu_item",
    description: "Execute Unity Editor menu item by path (e.g., 'Assets/Refresh', 'Window/Package Manager').",
    parameters: z.object({
      menuPath: z.string().describe("Full menu path to execute"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.executeMenuItem(params);
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
    name: "unity_add_package",
    description: "Install Unity package via Package Manager. Supports package names or git URLs.",
    parameters: z.object({
      packageName: z.string().describe("Package name (e.g., 'com.unity.textmeshpro') or git URL"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.addPackage(params);
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
    name: "unity_run_tests",
    description: "Execute Unity Test Runner tests. Supports EditMode and PlayMode tests with filtering.",
    parameters: z.object({
      testMode: z.enum(["EditMode", "PlayMode"]).optional().default("EditMode").describe("Test mode to run"),
      filter: z.string().optional().describe("Optional filter for specific test names"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.runUnityTests(params);
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
    name: "unity_add_asset_to_scene",
    description: "Add an asset (prefab) to the current scene. Optionally parent to an existing GameObject.",
    parameters: z.object({
      assetPath: z.string().describe("Path to asset (e.g., 'Assets/Prefabs/Player.prefab')"),
      parentPath: z.string().optional().describe("Optional parent GameObject path in scene"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.addAssetToScene(params);
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
    name: "unity_create_script",
    description: "Create a new C# script file with optional template content.",
    parameters: z.object({
      scriptName: z.string().describe("Name of the script (without .cs extension)"),
      content: z.string().optional().describe("Optional script content. If not provided, uses default MonoBehaviour template"),
      folderPath: z.string().optional().default("Assets/Scripts").describe("Folder to create script in"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.createScript(params);
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
    name: "unity_read_script",
    description: "Read the contents of a C# script file.",
    parameters: z.object({
      scriptPath: z.string().describe("Path to script file (e.g., 'Assets/Scripts/Player.cs')"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.readScript(params);
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
    name: "unity_update_script",
    description: "Update the contents of an existing C# script file.",
    parameters: z.object({
      scriptPath: z.string().describe("Path to script file"),
      content: z.string().describe("New script content"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.updateScript(params);
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
    name: "unity_delete_script",
    description: "Delete a C# script file from the project.",
    parameters: z.object({
      scriptPath: z.string().describe("Path to script file to delete"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.deleteScript(params);
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
    name: "unity_validate_script",
    description: "Validate C# script syntax. Can validate by file path or content string.",
    parameters: z.object({
      scriptPath: z.string().optional().describe("Path to script file to validate"),
      content: z.string().optional().describe("Script content to validate directly"),
    }),
    execute: async (params) => {
      try {
        const result = await advancedService.validateScript(params);
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
