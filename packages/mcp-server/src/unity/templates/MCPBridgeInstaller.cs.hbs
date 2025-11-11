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
            window.minSize = new Vector2(500, 400);
            window.maxSize = new Vector2(500, 600);
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
            EditorGUILayout.Space(10);

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
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            var titleStyle = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 18,
                alignment = TextAnchor.MiddleCenter,
                normal = { textColor = new Color(0.2f, 0.6f, 1f) }
            };

            GUILayout.Label("🚀 Unity MCP Bridge", titleStyle);
            DrawProgressBar();

            EditorGUILayout.EndVertical();
        }

        private void DrawProgressBar()
        {
            var rect = GUILayoutUtility.GetRect(0, 4, GUILayout.ExpandWidth(true));
            var progress = (int)currentStep / 3f;
            EditorGUI.ProgressBar(rect, progress, "");
        }

        private void DrawWelcome()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 14 };

            EditorGUILayout.HelpBox(
                "Connect Unity Editor to AI agents like Claude Desktop and Claude Code.\n\n" +
                "✓ WebSocket real-time communication\n" +
                "✓ Auto-configuration for AI clients\n" +
                "✓ 30+ Unity automation tools",
                MessageType.Info
            );

            EditorGUILayout.Space(10);

            GUILayout.Label("Requirements:", headerStyle);
            EditorGUILayout.Space(3);

            DrawRequirement("Unity 2022.3+", true);
            DrawRequirement("Node.js 18.0+", nodeInstalled);
            DrawRequirement("AI Client", true);

            EditorGUILayout.Space(15);

            if (GUILayout.Button("Get Started", GUILayout.Height(35)))
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
            if (nodeInstalled)
            {
                EditorGUILayout.HelpBox(
                    $"✅ Node.js detected: {nodeVersion}",
                    MessageType.Info
                );

                EditorGUILayout.Space(10);

                if (GUILayout.Button("Continue →", GUILayout.Height(35)))
                {
                    currentStep = InstallStep.ConfigureClient;
                }
            }
            else
            {
                EditorGUILayout.HelpBox(
                    "❌ Node.js 18.0+ required for Unity MCP bridge server.",
                    MessageType.Error
                );

                EditorGUILayout.Space(10);

                if (GUILayout.Button("Download Node.js", GUILayout.Height(35)))
                {
                    Application.OpenURL("https://nodejs.org/en/download/");
                }

                EditorGUILayout.Space(5);

                if (GUILayout.Button("Recheck"))
                {
                    CheckNodeJSInstallation();
                }
            }

            EditorGUILayout.Space(10);
            if (GUILayout.Button("← Back"))
            {
                currentStep = InstallStep.Welcome;
            }
        }

        private void DrawClientConfiguration()
        {
            EditorGUILayout.HelpBox(
                "Choose your AI client for auto-configuration:",
                MessageType.Info
            );

            EditorGUILayout.Space(8);

            DrawClientOption(
                "Claude Desktop",
                "Official desktop app",
                "Configure",
                () => ConfigureClaudeDesktop()
            );

            EditorGUILayout.Space(5);

            DrawClientOption(
                "Manual Setup",
                "Claude Code, VSCode, or other clients",
                "View Config",
                () => ShowManualConfiguration()
            );

            EditorGUILayout.Space(15);
            if (GUILayout.Button("← Back"))
            {
                currentStep = InstallStep.CheckNodeJS;
            }
        }

        private void DrawClientOption(string title, string subtitle, string buttonText, Action onClick)
        {
            EditorGUILayout.BeginHorizontal(EditorStyles.helpBox);

            EditorGUILayout.BeginVertical();
            var titleStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 13 };
            GUILayout.Label(title, titleStyle);
            var subtitleStyle = new GUIStyle(EditorStyles.label)
            {
                fontSize = 10,
                normal = { textColor = Color.gray }
            };
            GUILayout.Label(subtitle, subtitleStyle);
            EditorGUILayout.EndVertical();

            if (GUILayout.Button(buttonText, GUILayout.Width(90), GUILayout.Height(32)))
            {
                onClick();
            }

            EditorGUILayout.EndHorizontal();
        }

        private void DrawComplete()
        {
            var headerStyle = new GUIStyle(EditorStyles.boldLabel) { fontSize = 14 };

            EditorGUILayout.HelpBox(
                "🎉 Unity MCP Bridge configured successfully!",
                MessageType.Info
            );

            EditorGUILayout.Space(10);

            GUILayout.Label("Next Steps:", headerStyle);
            EditorGUILayout.Space(3);

            DrawNextStep("1", "Open Control Panel", "Tools → Unity MCP → Control Panel");
            DrawNextStep("2", "Open your AI client", "Claude Desktop, Claude Code, etc.");
            DrawNextStep("3", "Start using tools!", "Try: 'Select the Main Camera'");

            EditorGUILayout.Space(12);

            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("Open Control Panel", GUILayout.Height(35)))
            {
                MCPEditorWindow.ShowWindow();
                Close();
            }
            if (GUILayout.Button("Docs", GUILayout.Height(35)))
            {
                Application.OpenURL("https://github.com/muammar-yacoob/unity-mcp");
            }
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.Space(10);
            if (GUILayout.Button("Close"))
            {
                Close();
            }
        }

        private void DrawNextStep(string number, string title, string description)
        {
            EditorGUILayout.BeginHorizontal();

            var numberStyle = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 13,
                normal = { textColor = new Color(0.2f, 0.6f, 1f) }
            };
            GUILayout.Label(number, numberStyle, GUILayout.Width(20));

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

            // Claude Code CLI
            EditorGUILayout.HelpBox(
                "For Claude Code: Use the CLI command below (recommended)",
                MessageType.Info
            );

            EditorGUILayout.Space(5);
            GUILayout.Label("Claude Code CLI Command:", EditorStyles.boldLabel);

            string cliCommand = $"claude mcp add \"{serverPath}\"";

            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            EditorGUILayout.SelectableLabel(cliCommand, GUILayout.Height(20));
            EditorGUILayout.EndVertical();

            if (GUILayout.Button("Copy CLI Command", GUILayout.Height(30)))
            {
                EditorGUIUtility.systemCopyBuffer = cliCommand;
                ShowNotification(new GUIContent("✅ CLI command copied!"));
            }

            EditorGUILayout.Space(15);

            // Manual JSON for other clients
            GUILayout.Label("Or manually add to config.json:", EditorStyles.boldLabel);
            EditorGUILayout.Space(5);

            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            EditorGUILayout.TextArea(configJson, GUILayout.Height(120));
            EditorGUILayout.EndVertical();

            if (GUILayout.Button("Copy JSON", GUILayout.Height(30)))
            {
                EditorGUIUtility.systemCopyBuffer = configJson;
                ShowNotification(new GUIContent("✅ JSON copied!"));
            }

            EditorGUILayout.Space(15);

            GUILayout.Label("Config Locations:", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Claude Desktop:\n" +
                "  Windows: %APPDATA%\\Claude\\claude_desktop_config.json\n" +
                "  macOS: ~/Library/Application Support/Claude/claude_desktop_config.json\n\n" +
                "Claude Code:\n" +
                "  Project: .claude/config.json (created by CLI)",
                MessageType.None
            );

            EditorGUILayout.EndScrollView();
        }
    }
}
