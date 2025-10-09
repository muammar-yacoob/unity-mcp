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

Unity MCP provides **real-time control** of Unity Editor via the Model Context Protocol allowing you to:

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
<summary><strong>⚡ One-time setup per Unity project</strong></summary>

Tell Claude to set up the integration:
```
Setup Unity MCP in my project at /path/to/unity/project
```

This installs 8 editor scripts to `Assets/Editor/UnityMCP/` including:
- HTTP server with auto-start (port 8080)
- Control Panel UI with 🟢🟠🔴⚪ status monitoring
- ScriptableObject configuration for persistent settings
- Handlers for all 30 tools

**After installation:**
1. Restart Unity Editor
2. Open **Tools → Unity MCP → Control Panel**
3. Verify 🟢 **Connected** status

Done! Use the Control Panel to manage settings and monitor your connection.

</details>

---

## 🛠️ Available Tools

<details>
<summary><strong>🔧 View All 30 Available Tools</strong></summary>

### **🎯 Editor Control (7 tools)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/⚙️%20-0EA5E9?style=for-the-badge)![Setup Unity MCP](https://img.shields.io/badge/Setup%20Unity%20MCP%20-0EA5E9?style=for-the-badge) | Install editor integration into Unity project |
| ![](https://img.shields.io/badge/🎯%20-0EA5E9?style=for-the-badge)![Select Objects](https://img.shields.io/badge/Select%20Objects%20-0EA5E9?style=for-the-badge) | Select by name, tag, or pattern with framing |
| ![](https://img.shields.io/badge/🔄%20-0EA5E9?style=for-the-badge)![Transform Objects](https://img.shields.io/badge/Transform%20Objects%20-0EA5E9?style=for-the-badge) | Move, rotate, scale objects |
| ![](https://img.shields.io/badge/📐%20-0EA5E9?style=for-the-badge)![Align Objects](https://img.shields.io/badge/Align%20Objects%20-0EA5E9?style=for-the-badge) | Align left/right/top/bottom/center |
| ![](https://img.shields.io/badge/📏%20-0EA5E9?style=for-the-badge)![Distribute Objects](https://img.shields.io/badge/Distribute%20Objects%20-0EA5E9?style=for-the-badge) | Distribute evenly along axis |
| ![](https://img.shields.io/badge/📦%20-0EA5E9?style=for-the-badge)![Duplicate Objects](https://img.shields.io/badge/Duplicate%20Objects%20-0EA5E9?style=for-the-badge) | Clone objects with undo support |
| ![](https://img.shields.io/badge/🔍%20-0EA5E9?style=for-the-badge)![Find Objects](https://img.shields.io/badge/Find%20Objects%20-0EA5E9?style=for-the-badge) | Find by component type or pattern |

### **🗺️ Scene Management (6 tools)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/🎬%20-10B981?style=for-the-badge)![List Scenes](https://img.shields.io/badge/List%20Scenes%20-10B981?style=for-the-badge) | List all scenes in build settings |
| ![](https://img.shields.io/badge/📂%20-10B981?style=for-the-badge)![Load Scene](https://img.shields.io/badge/Load%20Scene%20-10B981?style=for-the-badge) | Load scene by name or index |
| ![](https://img.shields.io/badge/💾%20-10B981?style=for-the-badge)![Save Scene](https://img.shields.io/badge/Save%20Scene%20-10B981?style=for-the-badge) | Save current or all scenes |
| ![](https://img.shields.io/badge/🌳%20-10B981?style=for-the-badge)![Get Hierarchy](https://img.shields.io/badge/Get%20Hierarchy%20-10B981?style=for-the-badge) | Get complete scene hierarchy |
| ![](https://img.shields.io/badge/🔎%20-10B981?style=for-the-badge)![Find In Scene](https://img.shields.io/badge/Find%20In%20Scene%20-10B981?style=for-the-badge) | Find objects in current scene |
| ![](https://img.shields.io/badge/🧹%20-10B981?style=for-the-badge)![Cleanup Scene](https://img.shields.io/badge/Cleanup%20Scene%20-10B981?style=for-the-badge) | Remove missing scripts and empty objects |

### **🧪 Testing & Play Mode (5 tools)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/▶️%20-8B5CF6?style=for-the-badge)![Enter Play Mode](https://img.shields.io/badge/Enter%20Play%20Mode%20-8B5CF6?style=for-the-badge) | Start play mode programmatically |
| ![](https://img.shields.io/badge/⏸️%20-8B5CF6?style=for-the-badge)![Exit Play Mode](https://img.shields.io/badge/Exit%20Play%20Mode%20-8B5CF6?style=for-the-badge) | Exit play mode programmatically |
| ![](https://img.shields.io/badge/🤖%20-8B5CF6?style=for-the-badge)![Run Test](https://img.shields.io/badge/Run%20Test%20-8B5CF6?style=for-the-badge) | Execute automated test scenarios |
| ![](https://img.shields.io/badge/📊%20-8B5CF6?style=for-the-badge)![Play Mode Status](https://img.shields.io/badge/Play%20Mode%20Status%20-8B5CF6?style=for-the-badge) | Get play mode status and logs |
| ![](https://img.shields.io/badge/⏱️%20-8B5CF6?style=for-the-badge)![Set Time Scale](https://img.shields.io/badge/Set%20Time%20Scale%20-8B5CF6?style=for-the-badge) | Slow motion or fast forward |

### **📦 Assets & Console (5 tools)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/📋%20-F59E0B?style=for-the-badge)![Get Console Logs](https://img.shields.io/badge/Get%20Console%20Logs%20-F59E0B?style=for-the-badge) | Retrieve Unity console logs for debugging |
| ![](https://img.shields.io/badge/🧹%20-F59E0B?style=for-the-badge)![Clear Console](https://img.shields.io/badge/Clear%20Console%20-F59E0B?style=for-the-badge) | Clear all console logs |
| ![](https://img.shields.io/badge/🎁%20-F59E0B?style=for-the-badge)![Create Prefab](https://img.shields.io/badge/Create%20Prefab%20-F59E0B?style=for-the-badge) | Create prefab from selected GameObject |
| ![](https://img.shields.io/badge/📂%20-F59E0B?style=for-the-badge)![Get Assets](https://img.shields.io/badge/Get%20Assets%20-F59E0B?style=for-the-badge) | List project assets with filtering |
| ![](https://img.shields.io/badge/🔄%20-F59E0B?style=for-the-badge)![Refresh Assets](https://img.shields.io/badge/Refresh%20Assets%20-F59E0B?style=for-the-badge) | Refresh Unity asset database |

### **⚡ Advanced Tools (7 tools)**
| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/🎬%20-EC4899?style=for-the-badge)![Execute Menu Item](https://img.shields.io/badge/Execute%20Menu%20Item%20-EC4899?style=for-the-badge) | Execute any Unity Editor menu command |
| ![](https://img.shields.io/badge/📦%20-EC4899?style=for-the-badge)![Add Package](https://img.shields.io/badge/Add%20Package%20-EC4899?style=for-the-badge) | Install Unity packages via Package Manager |
| ![](https://img.shields.io/badge/🧪%20-EC4899?style=for-the-badge)![Run Unity Tests](https://img.shields.io/badge/Run%20Unity%20Tests%20-EC4899?style=for-the-badge) | Execute Test Runner tests (EditMode/PlayMode) |
| ![](https://img.shields.io/badge/📥%20-EC4899?style=for-the-badge)![Add Asset to Scene](https://img.shields.io/badge/Add%20Asset%20to%20Scene%20-EC4899?style=for-the-badge) | Add prefab or asset to current scene |
| ![](https://img.shields.io/badge/📝%20-EC4899?style=for-the-badge)![Script Operations](https://img.shields.io/badge/Script%20Operations%20-EC4899?style=for-the-badge) | Create, read, update, delete C# scripts |
| ![](https://img.shields.io/badge/✅%20-EC4899?style=for-the-badge)![Validate Script](https://img.shields.io/badge/Validate%20Script%20-EC4899?style=for-the-badge) | Validate C# script syntax |
| ![](https://img.shields.io/badge/❌%20-EC4899?style=for-the-badge)![Delete Objects](https://img.shields.io/badge/Delete%20Objects%20-EC4899?style=for-the-badge) | Delete objects with undo support |

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

## 🎛️ Unity Control Panel

<details>
<summary><strong>⚙️ Manage settings and monitor status</strong></summary>

Once installed, access the Control Panel via **Tools → Unity MCP → Control Panel**.

**Features:**
- **🟢 Real-time Status Monitoring**
  - 🟢 **Connected** - Server running normally
  - 🟠 **Starting** - Server is initializing
  - 🔴 **Error** - Connection failed
  - ⚪ **Disconnected** - Server stopped

- **⚙️ Server Settings** (Collapsable)
  - Port configuration (default: 8080)
  - Auto-start on Unity load
  - Request timeout settings
  - Remote connections (⚠️ use with caution)

- **✨ Features** (Collapsable)
  - Console monitoring (max logs configurable)
  - Auto-refresh assets on changes
  - Verbose logging for debugging

- **⚡ Quick Actions** (Collapsable)
  - 📋 View Console Logs
  - 🔄 Refresh Assets
  - 💾 Save Scene
  - 🧹 Clear Console
  - 📁 Open Config
  - 📖 Documentation

- **🔧 Tools Overview** (Collapsable)
  - View all 30 available tools categorized by type
  - Quick reference without leaving Unity

- **⚡ Advanced Settings** (Collapsable)
  - Undo/Redo support
  - Auto-backup scenes
  - Reset to defaults

**Configuration is stored as a ScriptableObject:**
`Assets/Editor/UnityMCP/Resources/MCPConfig.asset`

All settings persist across Unity sessions!

</details>

---

## 🐛 Troubleshooting

<details>
<summary><strong>🐞 Common Issues</strong></summary>

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
