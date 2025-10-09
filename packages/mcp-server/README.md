[//]: # (Constants)
[license-link]: https://github.com/muammar-yacoob/unity-mcp/blob/main/LICENSE
[stars-link]: https://github.com/muammar-yacoob/unity-mcp/stargazers
[issues-link]: https://github.com/muammar-yacoob/unity-mcp/issues
[discord-link]: https://discord.gg/1424501956759523442
[npm-link]: https://www.npmjs.com/package/@spark-apps/unity-mcp
[mcp-link]: https://smithery.ai/server/@muammar-yacoob/unity-mcp
[sponsor-link]: https://github.com/sponsors/muammar-yacoob

# Unity MCP

<div align="center">

**🎮 Control Unity Editor • ⚡ Real-time automation • 🚀 AI-powered workflows**


[![npm](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=flat-square&logo=npm&logoColor=white&color=crimson)][npm-link]
[![MCP Server](https://badge.mcpx.dev?type=server&color=blue&labelColor=gray)][mcp-link]
[![MIT](https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square)][license-link]
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?label=Sponsor&logo=github-sponsors&logoColor=white&color=hotpink)][sponsor-link]
[![Discord](https://img.shields.io/badge/Discord-Join-blue?logo=discord&logoColor=white)][discord-link]
[![Report Bug](https://img.shields.io/badge/Report-Bug-orangered?logo=github&logoColor=white)][issues-link]
[![GitHub Stars](https://img.shields.io/github/stars/muammar-yacoob/unity-mcp?style=social)][stars-link]

<img src="https://raw.githubusercontent.com/muammar-yacoob/unity-mcp/main/res/MCP.png" alt="Unity MCP">

</div>

## ✨ What It Does

Unity MCP provides **real-time control** of Unity Editor through the Model Context Protocol, allowing you to:

| <div align="left">Feature</div> | <div align="left">Description</div> |
|:---------|:-------------|
| ![](https://img.shields.io/badge/🎯%20-1a365d?style=for-the-badge)![Editor Control](https://img.shields.io/badge/Editor%20Control%20-007bff?style=for-the-badge) | Select, move, rotate, and scale objects with natural language |
| ![](https://img.shields.io/badge/📐%20-1a5e3a?style=for-the-badge)![Batch Operations](https://img.shields.io/badge/Batch%20Operations%20-28a745?style=for-the-badge) | Align, distribute, duplicate objects with undo support |
| ![](https://img.shields.io/badge/🧪%20-cc6600?style=for-the-badge)![Automated Testing](https://img.shields.io/badge/Automated%20Testing%20-ff9500?style=for-the-badge) | Enter play mode and run test scenarios programmatically |
| ![](https://img.shields.io/badge/🗺️%20-c41e3a?style=for-the-badge)![Scene Management](https://img.shields.io/badge/Scene%20Management%20-ff073a?style=for-the-badge) | Load, save, inspect scene hierarchy in real-time |



## 🚀 Quick Setup

### 📋 Prerequisites

<details>
<summary><strong>🔑 Requirements</strong></summary>

- **Node.js** >= 18.0.0 - [Download](https://nodejs.org/)
- **Unity** 2022.3 LTS or later - [Download](https://unity.com/)
- **Claude Desktop** or any MCP client - [Download](https://claude.ai/download)

</details>

---

## 📥 Installation

<details>
<summary><strong>📦 Choose your installation method</strong></summary>

**Option 1: Claude Code (Recommended)**
```bash
claude mcp add @spark-apps/unity-mcp
```

**Option 2: Manual Installation**
```bash
npm i -g @spark-apps/unity-mcp
```

Then add to your MCP client config:
- <span style="background: #1e90ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">Windows</span> `%APPDATA%\\Claude\\claude_desktop_config.json`
- <span style="background: #c0c0c0; color: black; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">macOS</span> `~/Library/Application Support/Claude/claude_desktop_config.json`
- <span style="background: #ffd700; color: black; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">Linux</span> `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "unity-mcp": {"command": "npx", "args": ["-y", "@spark-apps/unity-mcp"]}
  }
}
```

**Restart your MCP client after installation.**

</details>

---

## 🎮 Unity Editor Integration

<details>
<summary><strong>⚡ Required one-time setup per Unity project</strong></summary>

**Why is this needed?**
Unity MCP installs C# editor scripts into your Unity project that create an HTTP server on port 8080. The MCP tools communicate with Unity through this server.

**Setup Steps:**
1. Open your MCP client (e.g., Claude Desktop or Claude Code)
2. Tell Claude:
   ```
   Setup Unity MCP in my project at /path/to/unity/project
   ```
3. This installs 4 C# scripts to `Assets/Editor/UnityMCP/`:
   - `MCPEditorServer.cs` - HTTP server
   - `EditorCommandHandler.cs` - Command processor with undo support
   - `PlayModeHandler.cs` - Play mode automation
   - `SceneHandler.cs` - Scene operations
4. Restart Unity Editor
5. Verify in Console: `[Unity MCP] Server started on port 8080`

**Done!** The MCP tools can now control Unity Editor via HTTP.

</details>

---

## 🛠️ Available Tools

<details>
<summary><strong>🔧 View All Available Tools (19 tools)</strong></summary>

**Safe Operations (Read-only)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/⚙️%20-1a365d?style=for-the-badge)![Setup Unity MCP](https://img.shields.io/badge/Setup%20Unity%20MCP%20-007bff?style=for-the-badge) | Install editor integration into Unity project |
| ![](https://img.shields.io/badge/🎯%20-1a365d?style=for-the-badge)![Select Objects](https://img.shields.io/badge/Select%20Objects%20-007bff?style=for-the-badge) | Select by name, tag, or pattern with framing |
| ![](https://img.shields.io/badge/🔍%20-1a365d?style=for-the-badge)![Find Objects](https://img.shields.io/badge/Find%20Objects%20-007bff?style=for-the-badge) | Find by component type or pattern |
| ![](https://img.shields.io/badge/🎬%20-1a365d?style=for-the-badge)![List Scenes](https://img.shields.io/badge/List%20Scenes%20-007bff?style=for-the-badge) | List all scenes in build settings |
| ![](https://img.shields.io/badge/🌳%20-1a365d?style=for-the-badge)![Get Hierarchy](https://img.shields.io/badge/Get%20Hierarchy%20-007bff?style=for-the-badge) | Get complete scene hierarchy |
| ![](https://img.shields.io/badge/🔎%20-1a365d?style=for-the-badge)![Find In Scene](https://img.shields.io/badge/Find%20In%20Scene%20-007bff?style=for-the-badge) | Find objects in current scene |
| ![](https://img.shields.io/badge/📊%20-1a365d?style=for-the-badge)![Play Mode Status](https://img.shields.io/badge/Play%20Mode%20Status%20-007bff?style=for-the-badge) | Get play mode status and logs |

**Modifications (With Undo Support)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/🔄%20-1a5e3a?style=for-the-badge)![Transform Objects](https://img.shields.io/badge/Transform%20Objects%20-28a745?style=for-the-badge) | Move, rotate, scale objects |
| ![](https://img.shields.io/badge/📐%20-1a5e3a?style=for-the-badge)![Align Objects](https://img.shields.io/badge/Align%20Objects%20-28a745?style=for-the-badge) | Align left/right/top/bottom/center |
| ![](https://img.shields.io/badge/📏%20-1a5e3a?style=for-the-badge)![Distribute Objects](https://img.shields.io/badge/Distribute%20Objects%20-28a745?style=for-the-badge) | Distribute evenly along axis |
| ![](https://img.shields.io/badge/📦%20-1a5e3a?style=for-the-badge)![Duplicate Objects](https://img.shields.io/badge/Duplicate%20Objects%20-28a745?style=for-the-badge) | Clone objects with undo support |
| ![](https://img.shields.io/badge/▶️%20-cc6600?style=for-the-badge)![Enter Play Mode](https://img.shields.io/badge/Enter%20Play%20Mode%20-ff9500?style=for-the-badge) | Start play mode programmatically |
| ![](https://img.shields.io/badge/⏸️%20-cc6600?style=for-the-badge)![Exit Play Mode](https://img.shields.io/badge/Exit%20Play%20Mode%20-ff9500?style=for-the-badge) | Exit play mode programmatically |
| ![](https://img.shields.io/badge/🤖%20-cc6600?style=for-the-badge)![Run Test](https://img.shields.io/badge/Run%20Test%20-ff9500?style=for-the-badge) | Execute automated test scenarios |
| ![](https://img.shields.io/badge/⏱️%20-cc6600?style=for-the-badge)![Set Time Scale](https://img.shields.io/badge/Set%20Time%20Scale%20-ff9500?style=for-the-badge) | Slow motion or fast forward |
| ![](https://img.shields.io/badge/📂%20-cc6600?style=for-the-badge)![Load Scene](https://img.shields.io/badge/Load%20Scene%20-ff9500?style=for-the-badge) | Load scene by name or index |
| ![](https://img.shields.io/badge/💾%20-cc6600?style=for-the-badge)![Save Scene](https://img.shields.io/badge/Save%20Scene%20-ff9500?style=for-the-badge) | Save current or all scenes |

**Destructive Operations (Use with Caution)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/❌%20-c41e3a?style=for-the-badge)![Delete Objects](https://img.shields.io/badge/Delete%20Objects%20-ff073a?style=for-the-badge) | Delete objects with undo support |
| ![](https://img.shields.io/badge/🧹%20-c41e3a?style=for-the-badge)![Cleanup Scene](https://img.shields.io/badge/Cleanup%20Scene%20-ff073a?style=for-the-badge) | Remove missing scripts and empty objects |

</details>

---

## 💬 Example Commands

<details>
<summary><strong>🎯 Object Manipulation</strong></summary>

- *"Select all objects with tag 'Enemy' and align them horizontally"*
- *"Move the Player object to position (0, 5, 10)"*
- *"Distribute selected objects evenly along the x axis"*
- *"Find all objects with Camera component"*
- *"Duplicate selected object 5 times"*

</details>

<details>
<summary><strong>🧪 Automated Testing</strong></summary>

- *"Enter play mode and move Player to (10, 0, 0) for 5 seconds"*
- *"Set time scale to 0.5 for slow motion"*
- *"Run a test that destroys the Boss after 2 seconds"*
- *"Check play mode status and show test logs"*

</details>

<details>
<summary><strong>🗺️ Scene Operations</strong></summary>

- *"List all scenes in the project"*
- *"Load the MainMenu scene"*
- *"Show me the complete hierarchy of the current scene"*
- *"Find all objects with Rigidbody component"*
- *"Clean up scene by removing missing scripts"*

</details>

---

## 🐛 Troubleshooting

<details>
<summary><strong>❌ Common Issues</strong></summary>

**MCP Server Not Showing:**
1. Verify Node.js is installed: `node --version`
2. Check config file path is correct
3. Ensure JSON syntax is valid
4. Restart MCP client completely

**Unity Editor Not Responding:**
1. Ensure Unity Editor is open
2. Check `Assets/Editor/UnityMCP/` scripts are installed
3. Verify Console for `[Unity MCP] Server started on port 8080`
4. Check no errors in Unity Console

**Port Already in Use:**
1. Default port is `8080`
2. Check what's using it: `lsof -i :8080` (Mac/Linux) or `netstat -ano | findstr :8080` (Windows)
3. Stop conflicting process or change port in Unity scripts

</details>

---

## 📖 Documentation

- [Unity Editor Scripting API](https://docs.unity3d.com/ScriptReference/UnityEditor.html)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Report Issues](https://github.com/muammar-yacoob/unity-mcp/issues)

---

## 🤝 Contributing

Contributions welcome! Focus areas:
- ✅ Editor manipulation and automation
- ✅ Testing workflows
- ✅ Scene management
- ✅ Bug fixes and improvements

**Not in scope:** Code generation (use [context7 MCP](https://github.com/context7/mcp-server) instead)

---

## 📝 License

MIT © [Muammar Yacoob](https://github.com/muammar-yacoob)

---

<div align="center">

**🌟 If Unity MCP saves you time, show some love!**

[![Star on GitHub](https://img.shields.io/github/stars/muammar-yacoob/unity-mcp?style=social)][stars-link]
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-pink?style=for-the-badge)][sponsor-link]

**Built with ❤️ for game developers who want to automate repetitive tasks**

</div>
