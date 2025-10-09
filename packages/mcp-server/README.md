# ⚡ Unity MCP

**🎮 Real-time Unity Editor control • 🤖 AI-powered automation • 🚀 Eliminate repetitive tasks**

[![npm version](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=flat-square)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?style=social)](https://github.com/sponsors/muammar-yacoob)
[![Report Bug](https://img.shields.io/badge/Report-Bug-red?style=flat-square)](https://github.com/muammar-yacoob/unity-mcp/issues)

## ✨ What It Does

Control Unity Editor in real-time through Claude Desktop. Select, transform, align objects, automate testing, and manage scenes using natural language. Built for game developers who want to eliminate repetitive workflows.

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

## 🛠️ Available Tools

### Setup

| Tool | Description |
|------|-------------|
| **setup_unity_mcp** | Install Unity MCP editor scripts into your Unity project |

### Editor Manipulation

| Tool | Description |
|------|-------------|
| **unity_select_objects** | Select objects by name, tag, or pattern |
| **unity_transform_objects** | Move, rotate, or scale selected objects |
| **unity_align_objects** | Align objects (left, right, top, bottom, center) |
| **unity_distribute_objects** | Distribute objects evenly |
| **unity_duplicate_objects** | Clone selected objects |
| **unity_delete_objects** | Delete selected objects |
| **unity_find_objects** | Search scene for objects by criteria |

### Play Mode Testing

| Tool | Description |
|------|-------------|
| **unity_enter_play_mode** | Start play mode programmatically |
| **unity_exit_play_mode** | Exit play mode programmatically |
| **unity_run_test** | Execute automated test scenarios |
| **unity_playmode_status** | Check play mode state |
| **unity_set_timescale** | Control game time speed |

### Scene Operations

| Tool | Description |
|------|-------------|
| **unity_list_scenes** | List all scenes in build settings |
| **unity_load_scene** | Load a specific scene |
| **unity_save_scene** | Save current or all scenes |
| **unity_get_hierarchy** | Get complete scene hierarchy |
| **unity_find_in_scene** | Find objects by tag, pattern, or component |
| **unity_cleanup_scene** | Remove missing scripts and empty objects |

## 💬 Example Workflows

<details>
<summary><strong>🎯 Object Manipulation</strong></summary>

> "Select all objects tagged 'Enemy' and align them to the left"

> "Find objects with 'Player' in the name and move them to position (0, 2, 0)"

> "Distribute selected objects evenly along the horizontal axis"

> "Duplicate the selected object 5 times"

</details>

<details>
<summary><strong>🧪 Testing Automation</strong></summary>

> "Enter play mode and run a test where the player moves to (5, 0, 0)"

> "Set time scale to 2x and enter play mode"

> "Check if play mode is active"

> "Exit play mode and save the scene"

</details>

<details>
<summary><strong>🎬 Scene Management</strong></summary>

> "List all available scenes"

> "Load scene 'Level_02' and get the hierarchy"

> "Find all objects with MeshRenderer component"

> "Clean up the scene by removing missing scripts"

</details>

## 🔧 How It Works

Unity MCP uses HTTP/IPC to communicate with Unity Editor in real-time:

1. **Setup**: Install Unity MCP scripts into your project (`Assets/Editor/UnityMCP`)
2. **Auto-start**: HTTP server starts automatically when Unity Editor opens
3. **Control**: Use Claude Desktop to send commands via natural language
4. **Execute**: Unity Editor performs operations with full undo support

All operations integrate with Unity's native undo system, so you can always revert changes.

## 🐛 Troubleshooting

### MCP Server Not Showing in Claude Desktop

1. Verify Node.js is installed: `node --version`
2. Check configuration file path is correct
3. Ensure JSON syntax is valid
4. Restart Claude Desktop completely

### Unity Editor Not Responding

1. Ensure Unity Editor is open
2. Check `Assets/Editor/UnityMCP/` scripts are installed
3. Verify no console errors in Unity
4. Server runs on `localhost:8080` by default

### Need Help?

- 📖 [Documentation](https://github.com/muammar-yacoob/unity-mcp)
- 🐛 [Report Bug](https://github.com/muammar-yacoob/unity-mcp/issues)
- 💬 [Discussions](https://github.com/muammar-yacoob/unity-mcp/discussions)

## 📝 License

MIT © [Muammar Yacoob](https://github.com/muammar-yacoob)

## 🌟 Support

If you find this MCP server helpful:

- ⭐ Star the repository
- 💖 [Sponsor the project](https://github.com/sponsors/muammar-yacoob)
- 🐛 Report bugs and suggest features

---

**Built with ❤️ for the Unity and AI automation community**
