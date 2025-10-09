# ⚡ Unity MCP - Real Unity Editor Control

**🎮 Control Unity Editor in real-time • 🤖 AI-powered workflows • 🚀 Solve real game dev pain points**

[![npm version](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=flat-square)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?style=social)](https://github.com/sponsors/muammar-yacoob)

## 🎯 What Makes This Different

Unlike other Unity MCPs that just generate code, **Unity MCP provides REAL-TIME control** of the Unity Editor through direct IPC communication. This means you can:

- **Select, move, rotate, and scale** objects in real-time
- **Align and distribute** objects with single commands
- **Automate testing** by entering play mode and running scenarios
- **Navigate scenes** and find objects instantly
- **Batch operations** on multiple objects with undo support

## ✨ Core Features

### 🎯 Editor Manipulation
| Feature                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| **Selection**             | Select objects by name, tag, or pattern with framing    |
| **Transform**             | Absolute or relative position/rotation/scale changes    |
| **Alignment**             | Align objects left, right, top, bottom, center           |
| **Distribution**          | Evenly distribute 3+ objects horizontally or vertically  |
| **Batch Operations**      | Duplicate, delete, parent objects with undo support     |
| **Find Objects**          | Find by component type or name pattern                   |

### 🧪 Play Mode Testing
| Feature                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| **Enter/Exit Play Mode**  | Control play mode programmatically                       |
| **Automated Tests**       | Move, destroy, activate objects during play mode        |
| **Pause & Step**          | Pause and step through frames for debugging             |
| **Time Scale**            | Slow motion or fast forward testing                      |
| **Status Monitoring**     | Get play mode status with detailed test logs            |

### 🗺️ Scene Operations
| Feature                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| **Scene Navigation**      | List, load, save scenes programmatically                 |
| **Hierarchy Inspection**  | Get full scene hierarchy with components                 |
| **Search**                | Find objects by tag, name, or component                  |
| **Cleanup**               | Remove missing scripts and empty GameObjects             |

## 🚀 Quick Setup

### 📋 Prerequisites

- **Node.js** >= 18.0.0
- **Unity** 2022.3 LTS or later
- **Claude Desktop** app

### 📥 Installation

```bash
npm install -g @spark-apps/unity-mcp
```

### ⚙️ Configure Claude Desktop

1. **Open Claude Desktop settings** and locate the MCP configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add Unity MCP server** to the configuration:

```json
{
  "mcpServers": {
    "unity-mcp": {
      "command": "npx",
      "args": ["-y", "@spark-apps/unity-mcp"]
    }
  }
}
```

3. **Restart Claude Desktop**

4. **Verify installation**: Look for the 🔌 icon in Claude Desktop. Click it to see "unity-mcp" listed as a connected server.

### 🎮 Install Unity Editor Integration

Before using Unity MCP tools, you need to install the editor scripts into your Unity project:

1. **Open Claude Desktop**
2. **Tell Claude**: "Setup Unity MCP in my project at /path/to/unity/project"
3. **Restart Unity Editor**
4. **Verify**: Check Console for `[Unity MCP] Server started on port 8080`

You only need to do this once per Unity project!

## 🛠️ Available Tools

### Setup
- **setup_unity_mcp** - Install Unity MCP into a Unity project (run first!)

### Editor Manipulation
- **unity_select_objects** - Select by name, tag, or pattern
- **unity_transform_objects** - Move, rotate, scale objects
- **unity_align_objects** - Align objects (left/right/top/bottom/center)
- **unity_distribute_objects** - Distribute evenly along axis
- **unity_duplicate_objects** - Duplicate selected objects
- **unity_delete_objects** - Delete selected objects
- **unity_find_objects** - Find by component type or pattern

### Play Mode Testing
- **unity_enter_play_mode** - Enter play mode (with optional pause)
- **unity_exit_play_mode** - Exit play mode
- **unity_run_test** - Run automated test scenarios
- **unity_playmode_status** - Get status and test logs
- **unity_set_timescale** - Slow motion or fast forward

### Scene Operations
- **unity_list_scenes** - List all scenes in build settings
- **unity_load_scene** - Load scene by name or index
- **unity_save_scene** - Save current or all scenes
- **unity_get_hierarchy** - Get complete scene hierarchy
- **unity_find_in_scene** - Find objects in current scene
- **unity_cleanup_scene** - Remove missing scripts and empty objects

## 💬 Example Commands

### Editor Manipulation
```
"Select all objects with tag 'Enemy' and align them horizontally"

"Move the Player object to position (0, 5, 10)"

"Select objects matching 'Cube' and distribute them evenly along the x axis"

"Find all objects with Camera component"

"Align the selected UI elements to the left"
```

### Play Mode Testing
```
"Enter play mode and run a test that moves the Player to (10, 0, 0) for 5 seconds"

"Enter play mode, wait 3 seconds, then exit"

"Get the current play mode status and show test logs"

"Set time scale to 0.5 for slow motion testing"

"Run a test that destroys the 'Boss' object after 2 seconds"
```

### Scene Operations
```
"List all scenes in the project"

"Load the MainMenu scene"

"Show me the complete hierarchy of the current scene"

"Find all objects in the scene with Rigidbody component"

"Clean up the scene by removing missing scripts"
```

## 🎓 Workflow Examples

### Quick Object Arrangement
```
You: "I need to arrange 5 cubes evenly in a row"

Claude uses:
1. unity_select_objects (pattern: "Cube")
2. unity_distribute_objects (axis: "horizontal")

Result: Cubes perfectly distributed!
```

### Automated Testing Workflow
```
You: "Test if the player can move to the goal"

Claude uses:
1. unity_enter_play_mode
2. unity_run_test (targetObject: "Player", action: "move", x: 10, y: 0, z: 0, duration: 3)
3. unity_playmode_status (check results)
4. unity_exit_play_mode

Result: Automated test with detailed logs!
```

### Scene Cleanup
```
You: "Clean up this messy scene"

Claude uses:
1. unity_get_hierarchy (inspect scene)
2. unity_cleanup_scene (removeMissingScripts: true, removeEmpty: true)
3. unity_save_scene

Result: Clean, optimized scene!
```

## 🏗️ Architecture

Unity MCP uses a **client-server architecture** for real-time editor control:

```
┌─────────────────┐         HTTP/JSON         ┌─────────────────┐
│                 │      (localhost:8080)      │                 │
│  Claude Desktop │◄──────────────────────────►│  Unity Editor   │
│   (MCP Client)  │                            │   (HTTP Server) │
│                 │                            │                 │
└─────────────────┘                            └─────────────────┘
        │                                              │
        │ TypeScript Services                          │ C# Editor Scripts
        │  - EditorManipulationService                 │  - MCPEditorServer
        │  - PlayModeTestingService                    │  - EditorCommandHandler
        │  - SceneOperationsService                    │  - PlayModeHandler
        │                                              │  - SceneHandler
        └──────────────────────────────────────────────┘
```

### How It Works
1. **Setup Phase**: Install C# editor scripts into Unity project
2. **Runtime**: Unity Editor runs HTTP server on port 8080
3. **Commands**: MCP sends HTTP requests to Unity
4. **Execution**: Unity executes commands using Editor APIs (Selection, Transform, Undo, etc.)
5. **Response**: Unity returns results via JSON

## 🔧 Advanced Usage

### Custom Port
If port 8080 is taken, modify the Unity scripts:
```csharp
// In MCPEditorServer.cs
private const int PORT = 9090; // Change to your preferred port
```

Then update the TypeScript service:
```typescript
const editorService = new EditorManipulationService(9090);
```

### Undo Support
All destructive operations (transform, delete, etc.) are registered with Unity's Undo system. Press Ctrl+Z (Cmd+Z on Mac) to undo MCP operations.

## 🐛 Troubleshooting

### "Unity Editor MCP server is not running"
1. Ensure Unity Editor is open
2. Check Console for `[Unity MCP] Server started on port 8080`
3. If not running, go to **Tools → Unity MCP → Start Server**
4. Restart Unity Editor if necessary

### Port Already in Use
1. Check what's using port 8080: `lsof -i :8080` (Mac/Linux) or `netstat -ano | findstr :8080` (Windows)
2. Stop the conflicting process or change the MCP port (see Advanced Usage)

### MCP Commands Not Working
1. Verify setup with: "Is the Unity MCP server running?"
2. Check Unity Console for error messages
3. Ensure you ran `setup_unity_mcp` on your project
4. Try manually starting server: **Tools → Unity MCP → Start Server**

## 📖 Documentation

- [Unity Editor Scripting API](https://docs.unity3d.com/ScriptReference/UnityEditor.html)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Report Issues](https://github.com/muammar-yacoob/unity-mcp/issues)

## 🤝 Contributing

Contributions are welcome! This project focuses on solving real Unity workflow pain points.

**Focus Areas:**
- Editor manipulation and automation
- Testing workflows
- Scene management
- Asset operations

**Not in Scope:**
- Code generation (there are other tools for that)
- Game-specific templates
- Asset creation from scratch

## 📝 License

MIT © [Muammar Yacoob](https://github.com/muammar-yacoob)

## 🌟 Support

If you find Unity MCP helpful:

- ⭐ Star the repository
- 💖 [Sponsor the project](https://github.com/sponsors/muammar-yacoob)
- 🐛 Report bugs and suggest features
- 📢 Share with other Unity developers

---

**Built with ❤️ for game developers who want to automate repetitive tasks and focus on creativity**
