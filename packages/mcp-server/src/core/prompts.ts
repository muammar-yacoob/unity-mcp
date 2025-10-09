import { FastMCP } from "fastmcp";

/**
 * Register all prompts with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerPrompts(server: FastMCP) {
  // Unity editor automation prompt
  server.addPrompt({
    name: "unity_editor_automation",
    description: "Get help with Unity Editor automation tasks",
    arguments: [
      {
        name: "task",
        description: "The Unity Editor automation task you need help with",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const task = args.task as string;
      return `I'll help you automate Unity Editor for: ${task}

Available Unity MCP capabilities:
- GameObject selection and manipulation
- Transform operations (position, rotation, scale)
- Batch operations and alignment tools
- Play mode testing automation
- Scene operations and hierarchy management
- Console log monitoring
- Asset management

The Unity MCP server provides real-time editor control via HTTP on localhost:8080.

For Unity code generation and documentation, use the context7 MCP server.

What specific editor automation do you need?`;
    }
  });

  // Scene setup workflow
  server.addPrompt({
    name: "unity_scene_setup",
    description: "Guide for setting up a new Unity scene with common objects",
    arguments: [
      {
        name: "scene_type",
        description: "Type of scene to setup (e.g., 'gameplay', 'menu', 'test')",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const sceneType = args.scene_type as string;
      return `Setting up a ${sceneType} scene in Unity. I'll help you:

1. **Create New Scene**: Use 'Create New Scene' tool
2. **Add Essential Objects**:
   - Create Camera if needed
   - Add Lighting (Directional Light)
   - Setup Environment
3. **Configure Scene Settings**:
   - Check scene hierarchy
   - Verify object placement
4. **Save Scene**: Use 'Save Scene' tool

Available tools:
- create_new_scene
- select_objects
- find_objects
- get_hierarchy
- save_scene

What would you like to add to your ${sceneType} scene?`;
    }
  });

  // Testing workflow
  server.addPrompt({
    name: "unity_testing_workflow",
    description: "Automated testing workflow for Unity game objects",
    arguments: [
      {
        name: "test_scenario",
        description: "What you want to test (e.g., 'player movement', 'enemy AI')",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const scenario = args.test_scenario as string;
      return `Automated testing workflow for: ${scenario}

Standard testing steps:
1. **Prepare**: Select target objects
2. **Enter Play Mode**: Start play mode (optionally paused)
3. **Execute Test**: Run automated test actions
4. **Monitor**: Check console logs for errors
5. **Exit Play Mode**: Stop play mode
6. **Review**: Analyze test results

Available testing tools:
- enter_play_mode (with pause option)
- run_test (automated test scenarios)
- get_play_mode_status (check logs)
- set_time_scale (slow motion testing)
- exit_play_mode

Resource available:
- unity://console/logs (real-time debug logs)

What specific test actions do you need for ${scenario}?`;
    }
  });

  // Prefab creation workflow
  server.addPrompt({
    name: "unity_prefab_workflow",
    description: "Guide for creating and managing prefabs",
    arguments: [
      {
        name: "prefab_name",
        description: "Name of the prefab to create",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const prefabName = args.prefab_name as string;
      return `Creating prefab: ${prefabName}

Prefab creation workflow:
1. **Select Object(s)**: Use select_objects tool
2. **Configure Properties**:
   - Transform position/rotation/scale
   - Add/configure components
3. **Create Prefab**: Use create_prefab tool
4. **Verify**: Check project assets
5. **Test**: Instantiate and test in scene

Available tools:
- select_objects
- transform_objects
- component_operation
- create_prefab
- duplicate_objects

Resources:
- unity://project/assets (view created prefab)

What components or properties should ${prefabName} have?`;
    }
  });

  // Debug workflow
  server.addPrompt({
    name: "unity_debug_workflow",
    description: "Debugging workflow for Unity issues",
    arguments: [
      {
        name: "issue",
        description: "The issue you're debugging",
        required: false
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const issue = (args.issue as string) || "general issue";
      return `Debugging Unity issue: ${issue}

Debug workflow:
1. **Check Console Logs**: View unity://console/logs resource
2. **Inspect Scene**: Get scene hierarchy
3. **Find Objects**: Locate problematic GameObjects
4. **Test Scenarios**: Enter play mode with debugging
5. **Monitor Behavior**: Watch console during play mode
6. **Cleanup**: Remove unnecessary objects or scripts

Available debug tools:
- get_play_mode_status (includes logs)
- find_objects
- get_hierarchy
- cleanup_scene (remove missing scripts)

Resources:
- unity://console/logs (real-time logs)
- unity://scene/hierarchy (scene structure)

What specifically needs debugging for ${issue}?`;
    }
  });

  // Object alignment workflow
  server.addPrompt({
    name: "unity_alignment_workflow",
    description: "Batch operations and alignment workflow",
    arguments: [
      {
        name: "operation",
        description: "Alignment operation (e.g., 'grid layout', 'circular arrangement')",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const operation = args.operation as string;
      return `Batch ${operation} workflow:

Steps:
1. **Select Objects**: Use select_objects (by name, tag, or pattern)
2. **Align**: Use align_objects (left/right/top/bottom/center)
3. **Distribute**: Use distribute_objects (evenly space)
4. **Transform**: Fine-tune positions/rotations
5. **Verify**: Check final layout

Available batch tools:
- select_objects (select multiple by criteria)
- align_objects (6 alignment modes)
- distribute_objects (horizontal/vertical)
- duplicate_objects (create copies)
- transform_objects (batch transform)

Undo is supported for all operations!

What layout pattern do you need for ${operation}?`;
    }
  });
}
