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

**🎮 Control Unity Editor • ⚡ Execute ANY Unity API • 🚀 Simplified & Powerful**


[![npm](https://img.shields.io/npm/v/@spark-apps/unity-mcp?style=flat-square&logo=npm&logoColor=white&color=crimson)](https://www.npmjs.com/package/@spark-apps/unity-mcp)
[![MCP Server](https://badge.mcpx.dev?type=server&color=blue&labelColor=gray)](https://www.npmjs.com/settings/spark-apps/packages)
[![MIT](https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square)][license-link]
[![GitHub Sponsors](https://img.shields.io/github/sponsors/muammar-yacoob?label=Sponsor&logo=github-sponsors&logoColor=white&color=hotpink)](https://github.com/sponsors/muammar-yacoob)
[![Discord](https://img.shields.io/badge/Discord-Join-blue?logo=discord&logoColor=white)][discord-link]
[![GitHub Stars](https://img.shields.io/github/stars/muammar-yacoob/unity-mcp?style=social)][stars-link]

<img src="res/MCP.png" alt="Unity MCP">

</div>

## ✨ What It Does

Unity MCP provides **real-time control** of Unity Editor via the Model Context Protocol. Use it from **Claude Desktop**, **Cursor**, or any MCP client to create and modify games with natural language prompts.

| <div align="left">Feature</div> | <div align="left">Description</div> |
|:---------|:-------------|
| ![](https://img.shields.io/badge/⭐%20-ff6b00?style=for-the-badge)![Execute C#](https://img.shields.io/badge/Execute%20C%23%20-ff6b00?style=for-the-badge) | Execute any Unity API code with full UnityEngine/Editor access |
| ![](https://img.shields.io/badge/🗺️%20-c41e3a?style=for-the-badge)![Scene Operations](https://img.shields.io/badge/Scene%20Operations%20-ff073a?style=for-the-badge) | Load, save, inspect scene hierarchy in real-time |
| ![](https://img.shields.io/badge/🧪%20-cc6600?style=for-the-badge)![Play Mode Testing](https://img.shields.io/badge/Play%20Mode%20Testing%20-ff9500?style=for-the-badge) | Enter/exit play mode and monitor status programmatically |
| ![](https://img.shields.io/badge/📋%20-1a365d?style=for-the-badge)![Console Logging](https://img.shields.io/badge/Console%20Logging%20-007bff?style=for-the-badge) | Retrieve and filter Unity console logs for debugging |

---

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
<summary><strong>⚡ Install via Unity Package Manager</strong></summary>

### Step 1: Add Package via Git URL

In Unity Editor:
1. Open **Window → Package Manager**
2. Click the **+** button (top-left)
3. Select **Add package from git URL...**
4. Paste this URL:
   ```
   https://github.com/muammar-yacoob/unity-mcp.git?path=/UnityPackage
   ```
5. Click **Add**

Unity will install the package with all editor scripts:
- **🚀 Bridge Installer** - Beautiful wizard for AI client setup
- ⚡ **WebSocket server** - Fast, real-time communication (port 8090)
- 🎨 **Control Panel UI** - Status monitoring with 🟢🟠🔴⚪ indicators
- ⚙️ **ScriptableObject config** - Persistent settings across sessions
- ⭐ **8 Essential Tools** - Simplified architecture with execute_csharp for unlimited flexibility

### Step 2: Configure AI Client

**After installation:**
1. Open **Tools → Unity MCP → Bridge Installer** 🎯 **Start here!**
2. Follow the setup wizard to configure your AI client

The Bridge Installer will:
- ✅ Check Node.js installation
- 🎯 Auto-configure Claude Desktop or Claude Code
- 📝 Provide manual config for other MCP clients
- 🎉 Guide you to completion

Done! Use the Control Panel (**Tools → Unity MCP → Control Panel**) to manage settings and monitor your connection.

</details>

---

## 🚀 Bridge Installer Guide

<details>
<summary><strong>🎯 Step-by-step wizard for AI client setup</strong></summary>

The Bridge Installer provides a beautiful wizard to configure your AI client in just a few clicks.

### Opening the Installer

After installing the Unity package, open Unity and navigate to:
```
Tools → Unity MCP → Bridge Installer
```

### Wizard Steps

**Step 1: Welcome & Requirements**
- View what you'll get
- Check prerequisites
- ✅ Unity 2022.3+
- ✅ Node.js 18.0+
- ✅ AI client (Claude Desktop, etc.)

**Step 2: Node.js Verification**
- Automatic detection of Node.js version
- Download link if not installed
- Recheck button after installation

**Step 3: Configure AI Client**

Choose your setup method:

#### Option A: Claude Desktop (One-Click)
- Automatically creates configuration at:
  - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
  - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - **Linux**: `~/.config/Claude/claude_desktop_config.json`
- Restart reminder included

#### Option B: Claude Code / VSCode
- Creates `.claude/config.json` in your project
- Works with Claude Code CLI and VSCode MCP extension

#### Option C: Manual Configuration
- Copy-paste ready JSON config
- Platform-specific paths provided
- For other MCP clients

**Step 4: Complete!**
- Success confirmation
- Next steps guide
- Quick launch to Control Panel

### Troubleshooting

**Node.js not detected?**
1. Download from [nodejs.org](https://nodejs.org/)
2. Restart Unity Editor
3. Click "Recheck Installation"

**Can't connect?**
1. Verify server is running (Control Panel)
2. Restart AI client after configuration
3. Check firewall isn't blocking ports

</details>

---

## ⚡ WebSocket Transport (Default)

<details>
<summary><strong>⚡ Fast, real-time bidirectional communication</strong></summary>

Unity MCP uses **WebSocket by default** for maximum speed and real-time control.

### Default Configuration

The WebSocket server in Unity auto-starts on port `8090` when you install the package.

### Advanced Configuration

You can customize ports and timeouts via environment variables:

| Variable | Description | Default |
|:---------|:------------|:--------|
| `UNITY_MCP_TRANSPORT` | Transport type: `websocket` or `http` | `websocket` |
| `UNITY_MCP_WS_PORT` | WebSocket port | `8090` |
| `UNITY_MCP_TIMEOUT` | Request timeout (ms) | `30000` |

**Example with custom port:**
```json
{
  "mcpServers": {
    "unity-mcp": {
      "command": "npx",
      "args": ["-y", "@spark-apps/unity-mcp"],
      "env": {
        "UNITY_MCP_WS_PORT": "9090"
      }
    }
  }
}
```

### Unity Editor Configuration

WebSocket server auto-starts when Unity loads. You can also:
1. Open **Tools → Unity MCP → Control Panel** to view status
2. Configure port in **MCPConfig** ScriptableObject
3. Manually restart via **Tools → Unity MCP → Start WebSocket Server**

### Why WebSocket?

- ⚡ **Lower latency** - Real-time bidirectional communication
- 🚀 **Faster execution** - Persistent connection, no handshake overhead
- 🔄 **Better for automation** - Ideal for rapid command sequences
- 📡 **Modern protocol** - JSON-RPC 2.0 over WebSocket

> HTTP transport is still available as a fallback by setting `UNITY_MCP_TRANSPORT=http`

</details>

---

## 🛠️ Available Tools

<details>
<summary><strong>🔧 View all 8 tools</strong></summary>

### **⭐ execute_csharp**

| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/⭐%20-ff6b00?style=for-the-badge)![execute_csharp](https://img.shields.io/badge/execute__csharp%20-ff6b00?style=for-the-badge) | Execute ANY Unity operation with full UnityEngine and UnityEditor API access |

**Example Usage:**
```typescript
// Select all enemies and move them up
execute_csharp({
  code: `
    var enemies = GameObject.FindGameObjectsWithTag("Enemy");
    foreach (var enemy in enemies) {
      enemy.transform.position += Vector3.up * 2;
    }
    return $"Moved {enemies.Length} enemies";
  `
})

// Create a cube with custom material
execute_csharp({
  code: `
    var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
    cube.name = "AICube";
    var renderer = cube.GetComponent<Renderer>();
    renderer.material.color = Color.cyan;
    return "Created glowing cyan cube";
  `
})
```

**Real-World Example - Build a Complete Game:**
```
"Build a 3D Flappy Bird using execute_csharp: sky blue ortho camera, 
yellow sphere bird with Rigidbody physics (zero velocity before jump), 
8 green cube pipes that move left and reset when off-screen, 
TextMeshPro score UI, and game over panel on collision."
```
This single prompt creates an entire playable game by streaming C# code to Unity via MCP!

---

### **🗺️ Scene Operations (3 tools)**

| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/🌳%20-10B981?style=for-the-badge)![get_scene_hierarchy](https://img.shields.io/badge/get__scene__hierarchy%20-10B981?style=for-the-badge) | Get complete scene hierarchy with GameObjects, components, and transforms |
| ![](https://img.shields.io/badge/📂%20-10B981?style=for-the-badge)![load_scene](https://img.shields.io/badge/load__scene%20-10B981?style=for-the-badge) | Load scene by name or build index |
| ![](https://img.shields.io/badge/💾%20-10B981?style=for-the-badge)![save_scene](https://img.shields.io/badge/save__scene%20-10B981?style=for-the-badge) | Save current scene or all open scenes |

---

### **📋 Console & Logging (1 tool)**

| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/📋%20-F59E0B?style=for-the-badge)![get_console_logs](https://img.shields.io/badge/get__console__logs%20-F59E0B?style=for-the-badge) | Retrieve Unity console logs with filtering by type (log/warning/error) |

---

### **🧪 Play Mode Testing (3 tools)**

| <div align="left">Tool</div> | <div align="left">Description</div> |
|:------|:-------------|
| ![](https://img.shields.io/badge/▶️%20-8B5CF6?style=for-the-badge)![enter_playmode](https://img.shields.io/badge/enter__playmode%20-8B5CF6?style=for-the-badge) | Enter play mode programmatically with optional pause |
| ![](https://img.shields.io/badge/⏸️%20-8B5CF6?style=for-the-badge)![exit_playmode](https://img.shields.io/badge/exit__playmode%20-8B5CF6?style=for-the-badge) | Exit play mode and return to edit mode |
| ![](https://img.shields.io/badge/📊%20-8B5CF6?style=for-the-badge)![get_playmode_status](https://img.shields.io/badge/get__playmode__status%20-8B5CF6?style=for-the-badge) | Check if Unity is in play mode, edit mode, or paused |

</details>

---

## 💬 Example Commands

<details>
<summary><strong>⭐ execute_csharp: The Swiss Army Knife</strong></summary>

**Object Selection & Manipulation:**
- *"Use execute_csharp to select all enemies and move them 5 units up"*
- *"Execute C# code to align all UI buttons horizontally"*
- *"Use execute_csharp to duplicate the Player object 10 times in a circle"*
- *"Find all cameras and set their field of view to 60"*

**Component Management:**
- *"Add a Rigidbody component to all objects tagged 'Box'"*
- *"Remove all AudioSource components from inactive objects"*
- *"Set the color of all materials with 'Enemy' in their name to red"*
- *"Enable collision on all objects in the 'Props' layer"*

**Scene Automation:**
- *"Create 100 cubes in a 10x10 grid at y=0"*
- *"Delete all objects with missing scripts"*
- *"Parent all 'Weapon' tagged objects under the Player"*
- *"Bake all lights and generate lightmap UVs"*

**Advanced Operations:**
- *"Run the Build Player menu command"*
- *"Install the TextMeshPro package"*
- *"Create a new C# script called 'EnemyAI' in Assets/Scripts/"*
- *"Execute a custom editor window that you define"*

</details>

<details>
<summary><strong>🗺️ Scene Operations</strong></summary>

- *"Load the MainMenu scene"*
- *"Show me the complete hierarchy of the current scene"*
- *"Save all open scenes"*
- *"Get the hierarchy and find all disabled objects"*

</details>

<details>
<summary><strong>🧪 Play Mode Testing</strong></summary>

- *"Enter play mode"*
- *"Check if we're in play mode and show the console logs"*
- *"Exit play mode and save the scene"*
- *"Enter play mode, then use execute_csharp to simulate player input"*

</details>

<details>
<summary><strong>📋 Console & Debugging</strong></summary>

- *"Get all error logs from the console"*
- *"Show me the last 10 warnings"*
- *"Clear console, then use execute_csharp to log custom debug info"*

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
  - Port configuration (default: 8090)
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
  - View all 8 essential tools categorized by type
  - Highlights execute_csharp as the killer tool
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
