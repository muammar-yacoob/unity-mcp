<div align="center">

# ⚡ Unity MCP

### Real-Time Unity Editor Control via AI

**🎮 Control Unity Editor • 🤖 AI-Powered Automation • 🚀 Zero Template Code**

[![npm version](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![Downloads](https://img.shields.io/npm/dt/@spark-apps/unity-mcp?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?style=for-the-badge&logo=github)](https://github.com/sponsors/muammar-yacoob)

![Unity Version](https://img.shields.io/badge/Unity-2022.3%2B-black?style=flat-square&logo=unity)
![Node Version](https://img.shields.io/badge/Node-18.0%2B-green?style=flat-square&logo=node.js)
![MCP](https://img.shields.io/badge/MCP-Compatible-blue?style=flat-square)

---

### 🎯 The Only Unity MCP That Actually Controls Your Editor

</div>

## 🎯 What Makes This Different

<table>
<tr>
<td width="50%">

### ❌ Other Unity MCPs
- Generate code templates
- No editor interaction
- Manual implementation needed
- Limited to code generation

</td>
<td width="50%">

### ✅ Unity MCP
- **Real-time editor control**
- **Direct IPC communication**
- **Instant execution**
- **Undo support built-in**

</td>
</tr>
</table>

> 💡 **TIP:** Combine with [context7 MCP](https://github.com/context7/mcp-server) for Unity documentation and code generation!

## ✨ Core Features

<details open>
<summary><b>🎯 Editor Manipulation</b></summary>

<br>

| Feature | Description |
|---------|-------------|
| 🎯 **Selection** | Select objects by name, tag, or pattern with automatic framing |
| 🔄 **Transform** | Absolute or relative position/rotation/scale operations |
| 📐 **Alignment** | Align objects left, right, top, bottom, center |
| 📏 **Distribution** | Evenly distribute 3+ objects horizontally or vertically |
| 📦 **Batch Operations** | Duplicate, delete, parent multiple objects with undo |
| 🔍 **Find Objects** | Find by component type or name pattern |

</details>

<details open>
<summary><b>🧪 Play Mode Testing</b></summary>

<br>

| Feature | Description |
|---------|-------------|
| ▶️ **Play Mode Control** | Enter/exit play mode programmatically |
| 🤖 **Automated Tests** | Move, destroy, activate objects during runtime |
| ⏸️ **Pause & Debug** | Pause and step through frames for debugging |
| ⏱️ **Time Scale** | Slow motion or fast forward testing |
| 📊 **Status Monitoring** | Real-time play mode status with detailed logs |

</details>

<details open>
<summary><b>🗺️ Scene Operations</b></summary>

<br>

| Feature | Description |
|---------|-------------|
| 🎬 **Scene Navigation** | List, load, save scenes programmatically |
| 🌳 **Hierarchy Inspection** | Get complete scene hierarchy with components |
| 🔎 **Advanced Search** | Find objects by tag, name, or component type |
| 🧹 **Scene Cleanup** | Remove missing scripts and empty GameObjects |

</details>

## 🚀 Quick Setup

<details>
<summary><b>📋 Prerequisites</b></summary>

<br>

| Requirement | Version | Download |
|------------|---------|----------|
| 🟢 Node.js | >= 18.0.0 | [nodejs.org](https://nodejs.org/) |
| 🎮 Unity | 2022.3 LTS+ | [unity.com](https://unity.com/) |
| 🤖 Claude Desktop | Latest | [claude.ai](https://claude.ai/download) |

</details>

<details open>
<summary><b>📥 Installation</b></summary>

<br>

**Option 1: Global Installation (Recommended)**
```bash
npm install -g @spark-apps/unity-mcp
```

**Option 2: Use npx directly**
```bash
npx -y @spark-apps/unity-mcp
```

</details>

<details open>
<summary><b>⚙️ Configure Claude Desktop</b></summary>

<br>

**Step 1:** Locate your Claude Desktop config file:

| Platform | Path |
|----------|------|
| 🍎 macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| 🪟 Windows | `%APPDATA%/Claude/claude_desktop_config.json` |
| 🐧 Linux | `~/.config/Claude/claude_desktop_config.json` |

**Step 2:** Add Unity MCP to the configuration:

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

**Step 3:** Restart Claude Desktop

**Step 4:** Verify installation
- Look for the 🔌 icon in Claude Desktop
- Click it to see "unity-mcp" listed as a connected server

</details>

<details open>
<summary><b>🎮 Unity Editor Integration</b></summary>

<br>

Before using Unity MCP, install the editor scripts **once per project**:

1. Open Claude Desktop
2. Tell Claude:
   ```
   Setup Unity MCP in my project at /path/to/unity/project
   ```
3. Restart Unity Editor
4. Verify installation:
   - Check Console for: `[Unity MCP] Server started on port 8080`
   - Or go to **Tools → Unity MCP → Server Status**

✅ **That's it!** You're ready to control Unity with AI.

</details>

## 🛠️ Available Tools

<details>
<summary><b>🔧 Complete Tool List (20 tools)</b></summary>

<br>

### ⚙️ Setup
| Tool | Description |
|------|-------------|
| `setup_unity_mcp` | Install editor integration (run once per project) |

### 🎯 Editor Manipulation
| Tool | Description |
|------|-------------|
| `unity_select_objects` | Select by name, tag, or pattern |
| `unity_transform_objects` | Move, rotate, scale objects |
| `unity_align_objects` | Align left/right/top/bottom/center |
| `unity_distribute_objects` | Distribute evenly along axis |
| `unity_duplicate_objects` | Duplicate with undo support |
| `unity_delete_objects` | Delete with undo support |
| `unity_find_objects` | Find by component or pattern |

### 🧪 Play Mode Testing
| Tool | Description |
|------|-------------|
| `unity_enter_play_mode` | Enter play mode (with optional pause) |
| `unity_exit_play_mode` | Exit play mode |
| `unity_run_test` | Run automated test scenarios |
| `unity_playmode_status` | Get status and test logs |
| `unity_set_timescale` | Slow motion or fast forward |

### 🗺️ Scene Operations
| Tool | Description |
|------|-------------|
| `unity_list_scenes` | List all scenes in build settings |
| `unity_load_scene` | Load scene by name or index |
| `unity_save_scene` | Save current or all scenes |
| `unity_get_hierarchy` | Get complete scene hierarchy |
| `unity_find_in_scene` | Find objects in scene |
| `unity_cleanup_scene` | Remove missing scripts/empty objects |

</details>

## 💬 Usage Examples

<details>
<summary><b>🎯 Editor Manipulation</b></summary>

<br>

```
"Select all objects with tag 'Enemy' and align them horizontally"

"Move the Player object to position (0, 5, 10)"

"Select objects matching 'Cube' and distribute them evenly along the x axis"

"Find all objects with Camera component"

"Align the selected UI elements to the left"
```

</details>

<details>
<summary><b>🧪 Play Mode Testing</b></summary>

<br>

```
"Enter play mode and run a test that moves the Player to (10, 0, 0) for 5 seconds"

"Enter play mode, wait 3 seconds, then exit"

"Get the current play mode status and show test logs"

"Set time scale to 0.5 for slow motion testing"

"Run a test that destroys the 'Boss' object after 2 seconds"
```

</details>

<details>
<summary><b>🗺️ Scene Operations</b></summary>

<br>

```
"List all scenes in the project"

"Load the MainMenu scene"

"Show me the complete hierarchy of the current scene"

"Find all objects in the scene with Rigidbody component"

"Clean up the scene by removing missing scripts"
```

</details>

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

## 📖 Documentation & Resources

<div align="center">

[![Unity Docs](https://img.shields.io/badge/Unity_Editor_API-Docs-black?style=for-the-badge&logo=unity)](https://docs.unity3d.com/ScriptReference/UnityEditor.html)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-blue?style=for-the-badge)](https://modelcontextprotocol.io/)
[![Report Issues](https://img.shields.io/badge/Report-Issues-red?style=for-the-badge&logo=github)](https://github.com/muammar-yacoob/unity-mcp/issues)

</div>

## 🤝 Contributing

Contributions are welcome! This project focuses on **real Unity workflow automation**.

<details>
<summary><b>✅ Focus Areas (PRs Welcome)</b></summary>

<br>

- ✅ Editor manipulation and automation
- ✅ Testing workflows
- ✅ Scene management
- ✅ Asset operations
- ✅ Performance improvements
- ✅ Bug fixes

</details>

<details>
<summary><b>❌ Not in Scope</b></summary>

<br>

- ❌ Code generation (use context7 MCP)
- ❌ Game-specific templates
- ❌ Asset creation from scratch

</details>

## 📝 License

MIT © [Muammar Yacoob](https://github.com/muammar-yacoob)

---

<div align="center">

## 🌟 Support This Project

**If Unity MCP saves you time, show some love!**

[![Star on GitHub](https://img.shields.io/github/stars/muammar-yacoob/unity-mcp?style=social)](https://github.com/muammar-yacoob/unity-mcp)
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-pink?style=for-the-badge)](https://github.com/sponsors/muammar-yacoob)

### Ways to Support

| Action | Impact |
|--------|--------|
| ⭐ **Star this repo** | Helps others discover Unity MCP |
| 💖 **[Sponsor](https://github.com/sponsors/muammar-yacoob)** | Supports continued development |
| 🐛 **Report bugs** | Improves stability for everyone |
| 📢 **Share** | Helps the Unity community |
| 🔧 **Contribute** | Makes Unity MCP better |

---

### 🛠️ Built for Game Developers

**Unity MCP** is built with ❤️ for developers who want to:
- Automate repetitive editor tasks
- Test game mechanics faster
- Focus on creativity, not tedious work

<sub>Made with TypeScript, C#, and the Model Context Protocol</sub>

</div>
