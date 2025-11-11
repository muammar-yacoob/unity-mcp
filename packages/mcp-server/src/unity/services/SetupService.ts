import * as fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface SetupParams {
  projectPath: string;
}

/**
 * Service for setting up Unity Editor MCP integration
 * Installs the C# editor scripts into the Unity project
 */
export class SetupService {
  private templatesDir = path.join(__dirname, '../templates');

  async setupUnityMCP(params: SetupParams) {
    const { projectPath } = params;

    // Validate project path
    const assetsPath = path.join(projectPath, 'Assets');
    if (!await fs.pathExists(assetsPath)) {
      throw new Error(`Unity project not found at: ${projectPath}. Please provide a valid Unity project path.`);
    }

    // Create Editor folder
    const editorPath = path.join(assetsPath, 'Editor', 'UnityMCP');
    await fs.ensureDir(editorPath);

    // Copy C# editor scripts
    const scripts = [
      'MCPConfig.cs.hbs',
      'MCPEditorServer.cs.hbs',
      'MCPWebSocketServer.cs.hbs',
      'MCPEditorWindow.cs.hbs',
      'MCPBridgeInstaller.cs.hbs',
      'EditorCommandHandler.cs.hbs',
      'PlayModeHandler.cs.hbs',
      'SceneHandler.cs.hbs',
      'AssetHandler.cs.hbs',
      'AdvancedToolsHandler.cs.hbs'
    ];

    const installedScripts: string[] = [];

    for (const script of scripts) {
      const templatePath = path.join(this.templatesDir, script);
      const scriptName = script.replace('.hbs', '');
      const targetPath = path.join(editorPath, scriptName);

      // Read template and write as-is (no handlebars compilation needed for these)
      const content = await fs.readFile(templatePath, 'utf-8');
      await fs.writeFile(targetPath, content);

      // Create .meta file
      await this.createMetaFile(targetPath);

      installedScripts.push(scriptName);
    }

    // Create README
    const readme = `# Unity MCP Editor Integration

This folder contains the Unity Editor scripts for MCP (Model Context Protocol) integration.

## 🚀 Quick Start

### First Time Setup
1. **Open Bridge Installer**: \`Tools → Unity MCP → Bridge Installer\`
2. **Follow the wizard**: It will guide you through:
   - Node.js installation check
   - AI client configuration (Claude Desktop/Code)
   - Automatic setup completion
3. **Done!** Your Unity Editor is now connected to AI agents

### Daily Usage
- **Open Control Panel**: \`Tools → Unity MCP → Control Panel\`
- **Monitor Status**: See real-time connection status
- **Start/Stop Server**: Control the MCP bridge

## What it does
- Enables AI assistants to control Unity Editor in real-time via HTTP REST API or WebSocket
- 30+ powerful tools for editor automation, testing, and asset management
- Beautiful wizard-based installation for easy setup
- Auto-configuration for Claude Desktop and Claude Code
- Clean UI with collapsable sections and real-time status monitoring
- ScriptableObject configuration with persistent settings
- Console monitoring, package management, test runner integration
- Dual transport support: HTTP (default) or WebSocket for real-time communication

## Features
### Editor Control (12 tools)
- Select, Transform, Align, Distribute objects
- Duplicate, Delete, Find objects
- Execute menu items

### Scene Management (6 tools)
- Load, Save, Create scenes
- Get hierarchy, Find in scene
- Cleanup operations

### Testing & Play Mode (4 tools)
- Enter/Exit Play Mode
- Run Unity Test Runner tests
- Time scale control

### Assets & Console (5 tools)
- Console logs (Get/Clear)
- Create prefabs, Get assets
- Refresh Asset Database
- Add assets to scene

### Advanced Tools (9 tools)
- Execute any Unity menu item
- Install Unity packages
- Script management (CRUD operations)
- Validate C# scripts
- Advanced asset operations

## Menu Items
- **Tools/Unity MCP/Bridge Installer** - 🎯 Start here! One-click setup wizard
- **Tools/Unity MCP/Control Panel** - Main control panel for managing MCP
- **Tools/Unity MCP/Start Server** - Manually start the server
- **Tools/Unity MCP/Stop Server** - Stop the server
- **Tools/Unity MCP/Start WebSocket Server** - Start WebSocket transport

## Control Panel Features
- 🟢 Real-time connection status (🟢 Connected | 🟠 Starting | 🔴 Error | ⚪ Disconnected)
- Server Settings: Port, Auto-start, Remote connections, Timeouts
- Features: Console monitoring, Auto-refresh, Verbose logging
- Quick Actions: View console, Refresh assets, Save scene, Clear console
- Tools Overview: All 30 available tools categorized
- Advanced Settings: Undo/Redo, Scene backups, Reset to defaults

## Bridge Installer Features
- ✅ Automatic Node.js detection
- 🎯 One-click configuration for:
  - Claude Desktop
  - Claude Code / VSCode
  - Manual setup with copy-paste config
- 📊 Step-by-step wizard with progress tracking
- 🎨 Beautiful, modern UI

## Configuration
Settings are stored in a ScriptableObject at:
Assets/Editor/UnityMCP/Resources/MCPConfig.asset

You can also access it via: Tools/Unity MCP/Control Panel → Open Config

## Supported AI Clients
- ✅ Claude Desktop
- ✅ Claude Code CLI
- ✅ VSCode with MCP extension
- ✅ Cursor IDE
- ✅ Windsurf IDE
- ✅ Any MCP-compatible client

## Troubleshooting

### Can't connect to Unity?
1. Open Bridge Installer and verify Node.js is installed
2. Check Control Panel for server status
3. Ensure firewall isn't blocking the connection

### Node.js not detected?
1. Download from https://nodejs.org
2. Restart Unity Editor after installation
3. Verify with \`node --version\` in terminal

## Documentation
- Full Docs: https://github.com/muammar-yacoob/unity-mcp
- Issues: https://github.com/muammar-yacoob/unity-mcp/issues
- Discord: https://discord.gg/5skXfKRytR

---

Generated by Unity MCP Setup Service
Installed with 💙 for game developers
`;

    await fs.writeFile(path.join(editorPath, 'README.md'), readme);

    return {
      success: true,
      location: editorPath,
      scriptsInstalled: installedScripts,
      message: 'Unity MCP editor integration installed successfully. Restart Unity Editor to activate the server.',
      instructions: [
        '1. Restart Unity Editor',
        '2. The MCP server will start automatically',
        '3. Check Console for "[Unity MCP] Server started on port 8080"',
        '4. You can now use MCP tools to control the editor'
      ]
    };
  }

  private async createMetaFile(scriptPath: string) {
    const guid = this.generateGUID();
    const metaContent = `fileFormatVersion: 2
guid: ${guid}
MonoImporter:
  externalObjects: {}
  serializedVersion: 2
  defaultReferences: []
  executionOrder: 0
  icon: {instanceID: 0}
  userData:
  assetBundleName:
  assetBundleVariant:
`;
    await fs.writeFile(`${scriptPath}.meta`, metaContent);
  }

  private generateGUID(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
    });
  }
}
