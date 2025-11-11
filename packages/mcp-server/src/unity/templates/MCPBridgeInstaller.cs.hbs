using UnityEngine;
using UnityEditor;
using System;
using System.IO;
using System.Diagnostics;

namespace UnityMCP
{
    /// <summary>
    /// Bridge Installer Window - One-click setup for AI agent integration
    /// Provides automatic configuration for Claude Desktop, Claude Code, and other MCP clients
    /// </summary>
    public class MCPBridgeInstaller : EditorWindow
    {
        private enum InstallStep
        {
            Welcome,
            CheckNodeJS,
            ConfigureClient,
            Complete
        }

        private InstallStep currentStep = InstallStep.Welcome;
        private string nodeVersion = "";
        private bool nodeInstalled = false;
        private Vector2 scrollPosition;
        private MCPConfig config;

        // Client configuration paths
        private static readonly string claudeDesktopConfigWin = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "Claude", "claude_desktop_config.json"
        );
        private static readonly string claudeDesktopConfigMac = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Personal),
            "Library", "Application Support", "Claude", "claude_desktop_config.json"
        );
        private static readonly string claudeDesktopConfigLinux = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Personal),
            ".config", "Claude", "claude_desktop_config.json"
        );

        [MenuItem("Tools/Unity MCP/Bridge Installer", false, 1)]
        public static void ShowWindow()
        {
            var window = GetWindow<MCPBridgeInstaller>("Unity MCP Bridge");
            window.minSize = new Vector2(600, 500);
            window.maxSize = new Vector2(600, 500);
            window.Show();
        }

        private void OnEnable()
        {
            config = MCPConfig.GetOrCreate();
            CheckNodeJSInstallation();
        }

        private void OnGUI()
        {
            scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);

            // Header with logo
            DrawHeader();
            EditorGUILayout.Space(20);

            // Draw current step
            switch (currentStep)
            {
                case InstallStep.Welcome:
                    DrawWelcome();
                    break;
                case InstallStep.CheckNodeJS:
                    DrawNodeJSCheck();
                    break;
                case InstallStep.ConfigureClient:
                    DrawClientConfiguration();
                    break;
                case InstallStep.Complete:
                    DrawComplete();
                    break;
            }

            EditorGUILayout.EndScrollView();
        }

        private void DrawHeader()
        {
            var titleStyle = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 24,
                alignment = TextAnchor.MiddleCenter,
                normal = { textColor = new Color(0.2f, 0.6f, 1f) }
            };

            var subtitleStyle = new GUIStyle(EditorStyles.label)
            {
                fontSize = 12,
                alignment = TextAnchor.MiddleCenter,
                fontStyle = FontStyle.Italic
            };

            GUILayout.Label("🚀 Unity MCP Bridge", titleStyle);
            GUILayout.Label("Connect Unity Editor to AI Agents", subtitleStyle);

            EditorGUILayout.Space(5);
            DrawProgressBar();
        }

        private void DrawProgressBar()
        {
            var rect = GUILayoutUtility.GetRect(0, 4, GUILayout.ExpandWidth(true));
            var progress = (int)currentStep / 3f;
            EditorGUI.ProgressBar(rect, progress, "");
        }

        private void DrawWelcome()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 16 };
            var bodyStyle = new GUIStyle(EditorStyles.wordWrappedLabel) { fontSize = 12 };

            GUILayout.Label("Welcome to Unity MCP Bridge Installer!", headerStyle);
            EditorGUILayout.Space(10);

            EditorGUILayout.HelpBox(
                "This wizard will help you set up a bridge between Unity Editor and AI agents like Claude Desktop and Claude Code.\n\n" +
                "What you'll get:\n" +
                "• WebSocket-based real-time communication\n" +
                "• Automatic configuration for popular AI clients\n" +
                "• Beautiful UI with status monitoring\n" +
                "• 30+ tools for Unity automation",
                MessageType.Info
            );

            EditorGUILayout.Space(20);

            GUILayout.Label("Requirements:", headerStyle);
            EditorGUILayout.Space(5);

            DrawRequirement("Unity 2022.3 LTS or later", true);
            DrawRequirement("Node.js 18.0 or later", nodeInstalled);
            DrawRequirement("Claude Desktop or AI-enabled IDE", true);

            EditorGUILayout.Space(30);

            if (GUILayout.Button("Get Started", GUILayout.Height(40)))
            {
                currentStep = InstallStep.CheckNodeJS;
                CheckNodeJSInstallation();
            }
        }

        private void DrawRequirement(string text, bool met)
        {
            EditorGUILayout.BeginHorizontal();
            var icon = met ? "✅" : "⚠️";
            var color = met ? Color.green : Color.yellow;

            var prevColor = GUI.contentColor;
            GUI.contentColor = color;
            GUILayout.Label(icon, GUILayout.Width(30));
            GUI.contentColor = prevColor;

            GUILayout.Label(text);
            EditorGUILayout.EndHorizontal();
        }

        private void DrawNodeJSCheck()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 16 };

            GUILayout.Label("Node.js Installation Check", headerStyle);
            EditorGUILayout.Space(10);

            if (nodeInstalled)
            {
                EditorGUILayout.HelpBox(
                    $"✅ Node.js is installed!\n\nVersion: {nodeVersion}",
                    MessageType.Info
                );

                EditorGUILayout.Space(20);

                if (GUILayout.Button("Continue to Configuration", GUILayout.Height(40)))
                {
                    currentStep = InstallStep.ConfigureClient;
                }
            }
            else
            {
                EditorGUILayout.HelpBox(
                    "❌ Node.js is not installed or not found in PATH.\n\n" +
                    "Unity MCP requires Node.js 18.0 or later to run the bridge server.",
                    MessageType.Error
                );

                EditorGUILayout.Space(10);

                if (GUILayout.Button("Download Node.js", GUILayout.Height(40)))
                {
                    Application.OpenURL("https://nodejs.org/en/download/");
                }

                EditorGUILayout.Space(10);

                if (GUILayout.Button("Recheck Installation", GUILayout.Height(30)))
                {
                    CheckNodeJSInstallation();
                }
            }

            EditorGUILayout.Space(20);
            if (GUILayout.Button("← Back"))
            {
                currentStep = InstallStep.Welcome;
            }
        }

        private void DrawClientConfiguration()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 16 };

            GUILayout.Label("Configure AI Client", headerStyle);
            EditorGUILayout.Space(10);

            EditorGUILayout.HelpBox(
                "Choose your AI client to auto-configure the Unity MCP bridge.\n" +
                "The installer will create the necessary configuration files.",
                MessageType.Info
            );

            EditorGUILayout.Space(15);

            // Claude Desktop
            DrawClientOption(
                "Claude Desktop",
                "Official Claude desktop application",
                "Configure Claude Desktop to connect to Unity Editor",
                () => ConfigureClaudeDesktop()
            );

            EditorGUILayout.Space(10);

            // Claude Code
            DrawClientOption(
                "Claude Code / VSCode",
                "Claude Code CLI or VSCode with MCP extension",
                "Create .claude/config.json in your project",
                () => ConfigureClaudeCode()
            );

            EditorGUILayout.Space(10);

            // Manual Configuration
            DrawClientOption(
                "Manual Configuration",
                "Configure manually or use a different client",
                "Get configuration details to set up manually",
                () => ShowManualConfiguration()
            );

            EditorGUILayout.Space(30);
            if (GUILayout.Button("← Back"))
            {
                currentStep = InstallStep.CheckNodeJS;
            }
        }

        private void DrawClientOption(string title, string subtitle, string buttonText, Action onClick)
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            var titleStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 14 };
            GUILayout.Label(title, titleStyle);

            var subtitleStyle = new GUIStyle(EditorStyles.label)
            {
                fontSize = 11,
                fontStyle = FontStyle.Italic,
                normal = { textColor = Color.gray }
            };
            GUILayout.Label(subtitle, subtitleStyle);

            EditorGUILayout.Space(5);

            if (GUILayout.Button(buttonText, GUILayout.Height(30)))
            {
                onClick();
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawComplete()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 16 };
            var bodyStyle = new GUIStyle(EditorStyles.wordWrappedLabel) { fontSize = 12 };

            GUILayout.Label("🎉 Installation Complete!", headerStyle);
            EditorGUILayout.Space(10);

            EditorGUILayout.HelpBox(
                "Unity MCP Bridge is now configured and ready to use!",
                MessageType.Info
            );

            EditorGUILayout.Space(15);

            GUILayout.Label("Next Steps:", headerStyle);
            EditorGUILayout.Space(5);

            DrawNextStep("1", "Open the MCP Control Panel", "Tools → Unity MCP → Control Panel");
            DrawNextStep("2", "Start the server if not auto-started", "Click 'Start Server' button");
            DrawNextStep("3", "Open your AI client", "Claude Desktop, Claude Code, etc.");
            DrawNextStep("4", "Start using Unity MCP tools!", "Try: 'Select the Main Camera'");

            EditorGUILayout.Space(20);

            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("Open Control Panel", GUILayout.Height(40)))
            {
                MCPEditorWindow.ShowWindow();
                Close();
            }
            if (GUILayout.Button("View Documentation", GUILayout.Height(40)))
            {
                Application.OpenURL("https://github.com/muammar-yacoob/unity-mcp");
            }
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.Space(20);
            if (GUILayout.Button("Close Installer"))
            {
                Close();
            }
        }

        private void DrawNextStep(string number, string title, string description)
        {
            EditorGUILayout.BeginHorizontal();

            var numberStyle = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 14,
                normal = { textColor = new Color(0.2f, 0.6f, 1f) }
            };
            GUILayout.Label(number, numberStyle, GUILayout.Width(30));

            EditorGUILayout.BeginVertical();
            GUILayout.Label(title, EditorStyles.boldLabel);
            var descStyle = new GUIStyle(EditorStyles.label)
            {
                fontSize = 10,
                fontStyle = FontStyle.Italic
            };
            GUILayout.Label(description, descStyle);
            EditorGUILayout.EndVertical();

            EditorGUILayout.EndHorizontal();
            EditorGUILayout.Space(5);
        }

        private void CheckNodeJSInstallation()
        {
            try
            {
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "node",
                        Arguments = "--version",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = true
                    }
                };

                process.Start();
                nodeVersion = process.StandardOutput.ReadToEnd().Trim();
                process.WaitForExit();

                nodeInstalled = process.ExitCode == 0 && !string.IsNullOrEmpty(nodeVersion);
            }
            catch
            {
                nodeInstalled = false;
                nodeVersion = "";
            }
        }

        private void ConfigureClaudeDesktop()
        {
            string configPath = GetClaudeDesktopConfigPath();

            if (string.IsNullOrEmpty(configPath))
            {
                EditorUtility.DisplayDialog(
                    "Configuration Failed",
                    "Could not determine Claude Desktop configuration path for your platform.",
                    "OK"
                );
                return;
            }

            try
            {
                string serverPath = GetMCPServerPath();
                string configContent = CreateClaudeConfig(serverPath);

                Directory.CreateDirectory(Path.GetDirectoryName(configPath));
                File.WriteAllText(configPath, configContent);

                EditorUtility.DisplayDialog(
                    "Success",
                    $"Claude Desktop configured successfully!\n\n" +
                    $"Configuration saved to:\n{configPath}\n\n" +
                    $"Please restart Claude Desktop for changes to take effect.",
                    "OK"
                );

                currentStep = InstallStep.Complete;
            }
            catch (Exception e)
            {
                EditorUtility.DisplayDialog(
                    "Configuration Failed",
                    $"Failed to configure Claude Desktop:\n{e.Message}",
                    "OK"
                );
            }
        }

        private void ConfigureClaudeCode()
        {
            string projectPath = Application.dataPath.Replace("/Assets", "");
            string claudeDir = Path.Combine(projectPath, ".claude");
            string configPath = Path.Combine(claudeDir, "config.json");

            try
            {
                string serverPath = GetMCPServerPath();
                string configContent = CreateClaudeConfig(serverPath);

                Directory.CreateDirectory(claudeDir);
                File.WriteAllText(configPath, configContent);

                EditorUtility.DisplayDialog(
                    "Success",
                    $"Claude Code configured successfully!\n\n" +
                    $"Configuration saved to:\n{configPath}\n\n" +
                    $"Restart Claude Code or reload the project window.",
                    "OK"
                );

                currentStep = InstallStep.Complete;
            }
            catch (Exception e)
            {
                EditorUtility.DisplayDialog(
                    "Configuration Failed",
                    $"Failed to configure Claude Code:\n{e.Message}",
                    "OK"
                );
            }
        }

        private void ShowManualConfiguration()
        {
            string serverPath = GetMCPServerPath();
            string configJson = CreateClaudeConfig(serverPath);

            var window = GetWindow<ManualConfigWindow>("Manual Configuration");
            window.SetConfiguration(configJson, serverPath);
            window.Show();

            currentStep = InstallStep.Complete;
        }

        private string GetClaudeDesktopConfigPath()
        {
            #if UNITY_EDITOR_WIN
            return claudeDesktopConfigWin;
            #elif UNITY_EDITOR_OSX
            return claudeDesktopConfigMac;
            #elif UNITY_EDITOR_LINUX
            return claudeDesktopConfigLinux;
            #else
            return "";
            #endif
        }

        private string GetMCPServerPath()
        {
            // Get the path to the mcp-server dist folder
            string assetsPath = Application.dataPath;
            string projectPath = Directory.GetParent(assetsPath).FullName;

            // Try to find the server in common locations
            string[] possiblePaths = new[]
            {
                Path.Combine(projectPath, "node_modules", "@spark-apps", "unity-mcp", "dist", "index.js"),
                Path.Combine(projectPath, "Packages", "com.spark-apps.unity-mcp", "dist", "index.js"),
            };

            foreach (var path in possiblePaths)
            {
                if (File.Exists(path))
                {
                    return path.Replace("\\", "/");
                }
            }

            // Fallback: return npx command
            return "@spark-apps/unity-mcp";
        }

        private string CreateClaudeConfig(string serverPath)
        {
            bool useNpx = !File.Exists(serverPath);

            string config;
            if (useNpx)
            {
                config = @"{
  ""mcpServers"": {
    ""unity-mcp"": {
      ""command"": ""npx"",
      ""args"": [""-y"", ""@spark-apps/unity-mcp""],
      ""env"": {
        ""UNITY_MCP_TRANSPORT"": ""websocket"",
        ""UNITY_MCP_WS_PORT"": ""8090""
      }
    }
  }
}";
            }
            else
            {
                config = $@"{{
  ""mcpServers"": {{
    ""unity-mcp"": {{
      ""command"": ""node"",
      ""args"": [""{serverPath}""],
      ""env"": {{
        ""UNITY_MCP_TRANSPORT"": ""websocket"",
        ""UNITY_MCP_WS_PORT"": ""8090""
      }}
    }}
  }}
}}";
            }

            return config;
        }
    }

    /// <summary>
    /// Window for showing manual configuration instructions
    /// </summary>
    public class ManualConfigWindow : EditorWindow
    {
        private string configJson;
        private string serverPath;
        private Vector2 scrollPosition;

        public void SetConfiguration(string json, string path)
        {
            configJson = json;
            serverPath = path;
        }

        private void OnGUI()
        {
            scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);

            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 14 };
            GUILayout.Label("Manual Configuration", headerStyle);
            EditorGUILayout.Space(10);

            EditorGUILayout.HelpBox(
                "Copy the configuration below and add it to your MCP client's configuration file.",
                MessageType.Info
            );

            EditorGUILayout.Space(10);

            GUILayout.Label("Configuration JSON:", EditorStyles.boldLabel);
            EditorGUILayout.Space(5);

            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            EditorGUILayout.TextArea(configJson, GUILayout.Height(200));
            EditorGUILayout.EndVertical();

            EditorGUILayout.Space(10);

            if (GUILayout.Button("Copy to Clipboard", GUILayout.Height(30)))
            {
                EditorGUIUtility.systemCopyBuffer = configJson;
                ShowNotification(new GUIContent("✅ Copied to clipboard!"));
            }

            EditorGUILayout.Space(15);

            GUILayout.Label("Server Path:", EditorStyles.boldLabel);
            EditorGUILayout.TextField(serverPath);

            EditorGUILayout.Space(20);

            GUILayout.Label("Configuration File Locations:", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Windows: %APPDATA%\\Claude\\claude_desktop_config.json\n" +
                "macOS: ~/Library/Application Support/Claude/claude_desktop_config.json\n" +
                "Linux: ~/.config/Claude/claude_desktop_config.json",
                MessageType.None
            );

            EditorGUILayout.EndScrollView();
        }
    }
}
