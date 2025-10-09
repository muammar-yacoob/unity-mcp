[//]: # (Constants)
[license-link]: ../../blob/main/LICENSE
[stars-link]: ../../stargazers
[issues-link]: ../../issues
[discord-link]: https://discord.gg/5skXfKRytR
[website-link]: https://spark-games.co.uk
[coffee-link]: https://buymeacoffee.com/spark88
[release-link]: ../../releases
[fork-link]: ../../fork
[privacy-link]: ./PRIVACY.md
[vid-link]: https://www.youtube.com/shorts/CCbY_ETwFss

# Unity MCP

<div align="center">

**🎮 Control Unity Editor • ⚡ Real-time automation • 🚀 AI-powered workflows**


[![npm](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=flat-square&logo=npm&logoColor=white&color=crimson)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![MCP Server](https://badge.mcpx.dev?type=server&color=blue&labelColor=gray)](https://www.npmjs.com/settings/spark-apps/packages)
[![MIT](https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square)][license-link]
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?label=Sponsor&logo=github-sponsors&logoColor=white&color=hotpink)](https://github.com/sponsors/muammar-yacoob)
[![Discord](https://img.shields.io/badge/Discord-Join-blue?logo=discord&logoColor=white)][discord-link]
[![GitHub Stars](https://img.shields.io/github/stars/muammar-yacoob/unity-mcp?style=social)][stars-link]

<img src="res/MCP.png" alt="Unity MCP">

</div>

## ✨ What It Does

Unity MCP provides **real-time control** of Unity Editor through the Model Context Protocol, allowing you to:

| <div align="left">Feature</div> | <div align="left">Description</div> |
|:---------|:-------------|
| ![](https://img.shields.io/badge/🎯%20-1a365d?style=for-the-badge)![Editor Control](https://img.shields.io/badge/Editor%20Control%20-007bff?style=for-the-badge) | Select, move, rotate, and scale objects with natural language |
| ![](https://img.shields.io/badge/📐%20-1a5e3a?style=for-the-badge)![Batch Operations](https://img.shields.io/badge/Batch%20Operations%20-28a745?style=for-the-badge) | Align, distribute, duplicate objects with undo support |
| ![](https://img.shields.io/badge/🧪%20-cc6600?style=for-the-badge)![Automated Testing](https://img.shields.io/badge/Automated%20Testing%20-ff9500?style=for-the-badge) | Enter play mode and run test scenarios programmatically |
| ![](https://img.shields.io/badge/🗺️%20-c41e3a?style=for-the-badge)![Scene Management](https://img.shields.io/badge/Scene%20Management%20-ff073a?style=for-the-badge) | Load, save, inspect scene hierarchy in real-time |
| ![](https://img.shields.io/badge/📋%20-6f42c1?style=for-the-badge)![Console Monitoring](https://img.shields.io/badge/Console%20Monitoring%20-9f7aea?style=for-the-badge) | Real-time console logs and debugging |
| ![](https://img.shields.io/badge/📦%20-6f42c1?style=for-the-badge)![Asset Management](https://img.shields.io/badge/Asset%20Management%20-9f7aea?style=for-the-badge) | Prefab creation and asset database operations |



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

> **⚠️ REQUIRED:** You must install Unity MCP before using any of its tools.

<details>
<summary><strong>📦 Choose your setup method</strong></summary>

### Method 1: Automatic Setup (Recommended) ⚡

**One command does everything:**
```bash
claude mcp add @spark-apps/unity-mcp
```
✅ Installs the package
✅ Configures your MCP client automatically
✅ Ready to use immediately after restart

---

### Method 2: Manual Setup 🛠️

**If you prefer to configure manually or use a different MCP client:**

**Step 1: Install the package globally**
```bash
npm i -g @spark-apps/unity-mcp
```

**Step 2: Add to your MCP client configuration**

Edit your MCP client config file:
- <span style="background: #1e90ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">Windows</span> `%APPDATA%\\Claude\\claude_desktop_config.json`
- <span style="background: #c0c0c0; color: black; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">macOS</span> `~/Library/Application Support/Claude/claude_desktop_config.json`
- <span style="background: #ffd700; color: black; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">Linux</span> `~/.config/Claude/claude_desktop_config.json`

Add this configuration:
```json
{
  "mcpServers": {
    "unity-mcp": {"command": "npx", "args": ["-y", "@spark-apps/unity-mcp"]}
  }
}
```

**Step 3: Restart your MCP client**

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
3. This installs 5 C# scripts to `Assets/Editor/UnityMCP/`:
   - `MCPEditorServer.cs` - HTTP server
   - `EditorCommandHandler.cs` - Command processor with undo support
   - `PlayModeHandler.cs` - Play mode automation
   - `SceneHandler.cs` - Scene operations
   - `AssetHandler.cs` - Console logs and asset management
4. Restart Unity Editor
5. Verify in Console: `[Unity MCP] Server started on port 8080`

**Done!** The MCP tools can now control Unity Editor via HTTP.

</details>

---

## 🛠️ Available Tools

<details>
<summary><strong>🔧 View All Available Tools (24 tools)</strong></summary>

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

**Asset & Console Operations (NEW!)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/📋%20-6f42c1?style=for-the-badge)![Get Console Logs](https://img.shields.io/badge/Get%20Console%20Logs%20-9f7aea?style=for-the-badge) | Real-time console logs for debugging |
| ![](https://img.shields.io/badge/🗑️%20-6f42c1?style=for-the-badge)![Clear Console](https://img.shields.io/badge/Clear%20Console%20-9f7aea?style=for-the-badge) | Clear all console logs |
| ![](https://img.shields.io/badge/📦%20-6f42c1?style=for-the-badge)![Create Prefab](https://img.shields.io/badge/Create%20Prefab%20-9f7aea?style=for-the-badge) | Create prefab from selected objects |
| ![](https://img.shields.io/badge/📁%20-6f42c1?style=for-the-badge)![Get Assets](https://img.shields.io/badge/Get%20Assets%20-9f7aea?style=for-the-badge) | List project assets with filtering |
| ![](https://img.shields.io/badge/🔄%20-6f42c1?style=for-the-badge)![Refresh Assets](https://img.shields.io/badge/Refresh%20Assets%20-9f7aea?style=for-the-badge) | Refresh asset database |

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

<details>
<summary><strong>📋 Console & Debugging (NEW!)</strong></summary>

- *"Show me the last 20 error logs from Unity console"*
- *"Clear the console and run the test again"*
- *"Check console logs for any warnings"*
- *"Monitor console while in play mode"*

</details>

<details>
<summary><strong>📦 Asset Management (NEW!)</strong></summary>

- *"Create a prefab called 'PlayerPrefab' from the selected object"*
- *"List all prefabs in Assets/Prefabs folder"*
- *"Show me all scripts in the project"*
- *"Refresh asset database after adding new files"*

</details>

---

## 🎯 MCP Resources & Prompts (NEW!)

<details>
<summary><strong>📚 Accessible Resources</strong></summary>

Unity MCP now provides **Resources** - live data you can reference in your conversations using the `#` symbol:

| Resource | Description |
|:---------|:------------|
| `#unity://project/info` | Server information and capabilities |
| `#unity://console/logs` | Real-time console logs from Unity |
| `#unity://scene/hierarchy` | Current scene structure with all GameObjects |
| `#unity://project/assets` | List of all assets in your project |

**Usage Example:**
```
"Check #unity://console/logs for any errors while testing"
"Show me #unity://scene/hierarchy and find all cameras"
```

</details>

<details>
<summary><strong>⚡ Workflow Prompts</strong></summary>

Pre-configured **Prompts** for common Unity workflows:

| Prompt | Purpose |
|:-------|:--------|
| `unity_editor_automation` | General editor automation guidance |
| `unity_scene_setup` | Scene setup workflow |
| `unity_testing_workflow` | Automated testing workflow |
| `unity_prefab_workflow` | Prefab creation and management |
| `unity_debug_workflow` | Debugging workflow |
| `unity_alignment_workflow` | Batch alignment operations |

**Usage Example:**
```
Use the unity_testing_workflow prompt to test player movement
Follow the unity_scene_setup prompt to create a new gameplay scene
```

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

## 🌱 Support & Contributions

⭐ **Star the repo** & I power up like Mario 🍄  
☕ **Devs run on coffee** - [Buy me one?][coffee-link]  
💰 **Crypto tips welcome** - [Tip in crypto](https://tip.md/muammar-yacoob)  
🤝 **Contributions are welcome** - [🍴 Fork][fork-link], improve, PR!  
🎥 **Need help?** <img src="https://img.icons8.com/color/20/youtube-play.png" alt="YouTube" width="20" height="20" style="vertical-align: middle;"> [Setup Tutorial][vid-link] • <img src="https://img.icons8.com/color/20/discord--v2.png" alt="Discord" width="20" height="20" style="vertical-align: middle;"> [Join Discord][discord-link]

## 💖 Sponsor
Your support helps maintain and improve the tool. please consider [sponsoring the project][stars-link]. 


---

<div align="center">


**Made with ❤️ for Game Devs** • [Privacy Policy](PRIVACY.md) • [Terms of Service](TERMS.md)