using UnityEngine;
using UnityEditor;
using System;

namespace UnityMCP
{
    /// <summary>
    /// Unity MCP Control Panel
    /// Clean UI for managing MCP server and viewing status
    /// </summary>
    public class MCPEditorWindow : EditorWindow
    {
        private MCPConfig config;
        private Vector2 scrollPosition;
        private bool showServerSettings = true;
        private bool showFeatures = false;
        private bool showAdvanced = false;
        private bool showTools = false;

        private DateTime lastStatusCheck;
        private ConnectionStatus connectionStatus = ConnectionStatus.Unknown;
        private string lastError = "";

        private enum ConnectionStatus
        {
            Unknown,
            Connected,
            Connecting,
            Disconnected,
            Error
        }

        [MenuItem("Tools/Unity MCP/Control Panel", false, 0)]
        public static void ShowWindow()
        {
            var window = GetWindow<MCPEditorWindow>("MCP Control Panel");
            window.minSize = new Vector2(400, 500);
            window.Show();
        }

        private void OnEnable()
        {
            config = MCPConfig.GetOrCreate();
            EditorApplication.update += CheckConnectionStatus;
        }

        private void OnDisable()
        {
            EditorApplication.update -= CheckConnectionStatus;
        }

        private void CheckConnectionStatus()
        {
            // Check every 2 seconds
            if ((DateTime.Now - lastStatusCheck).TotalSeconds < 2) return;
            lastStatusCheck = DateTime.Now;

            try
            {
                if (MCPWebSocketServer.IsRunning())
                {
                    connectionStatus = ConnectionStatus.Connected;
                    lastError = "";
                }
                else if (MCPWebSocketServer.IsStarting())
                {
                    connectionStatus = ConnectionStatus.Connecting;
                }
                else
                {
                    connectionStatus = ConnectionStatus.Disconnected;
                }
            }
            catch (Exception e)
            {
                connectionStatus = ConnectionStatus.Error;
                lastError = e.Message;
            }

            Repaint();
        }

        private void OnGUI()
        {
            scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);

            // Header
            DrawHeader();

            EditorGUILayout.Space(10);

            // Connection Status
            DrawConnectionStatus();

            EditorGUILayout.Space(10);

            // Server Controls
            DrawServerControls();

            EditorGUILayout.Space(10);

            // Collapsible Sections
            DrawServerSettings();
            DrawFeatures();
            DrawToolsOverview();
            DrawAdvancedSettings();

            EditorGUILayout.Space(20);

            // Footer
            DrawFooter();

            EditorGUILayout.EndScrollView();
        }

        private void DrawHeader()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            GUILayout.Label("Unity MCP Control Panel", EditorStyles.boldLabel);
            GUILayout.Label("AI-Powered Unity Editor Automation", EditorStyles.miniLabel);
            EditorGUILayout.EndVertical();
        }

        private void DrawConnectionStatus()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            string statusEmoji = GetStatusEmoji();
            string statusText = GetStatusText();
            Color statusColor = GetStatusColor();

            GUIStyle statusStyle = new GUIStyle(EditorStyles.label);
            statusStyle.fontSize = 14;
            statusStyle.normal.textColor = statusColor;

            GUILayout.Label($"{statusEmoji} Status: {statusText}", statusStyle);

            if (connectionStatus == ConnectionStatus.Connected)
            {
                GUILayout.Label($"Server running on ws://localhost:{config.websocketPort}", EditorStyles.miniLabel);
            }
            else if (connectionStatus == ConnectionStatus.Error)
            {
                EditorGUILayout.HelpBox($"Error: {lastError}", MessageType.Error);
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawServerControls()
        {
            EditorGUILayout.BeginHorizontal();

            GUI.enabled = connectionStatus != ConnectionStatus.Connected;
            if (GUILayout.Button("▶ Start Server", GUILayout.Height(30)))
            {
                MCPWebSocketServer.StartServer();
                connectionStatus = ConnectionStatus.Connecting;
            }

            GUI.enabled = connectionStatus == ConnectionStatus.Connected;
            if (GUILayout.Button("■ Stop Server", GUILayout.Height(30)))
            {
                MCPWebSocketServer.StopServer();
                connectionStatus = ConnectionStatus.Disconnected;
            }

            GUI.enabled = true;
            if (GUILayout.Button("↻ Restart", GUILayout.Height(30)))
            {
                MCPWebSocketServer.StopServer();
                System.Threading.Thread.Sleep(500);
                MCPWebSocketServer.StartServer();
            }

            EditorGUILayout.EndHorizontal();
        }

        private void DrawServerSettings()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            showServerSettings = EditorGUILayout.Foldout(showServerSettings, "⚙️ Server Settings", true);

            if (showServerSettings)
            {
                EditorGUI.BeginChangeCheck();

                config.websocketPort = EditorGUILayout.IntSlider("Port", config.websocketPort, 1024, 65535);
                config.autoStart = EditorGUILayout.Toggle("Auto-start on Load", config.autoStart);
                config.requestTimeout = EditorGUILayout.IntSlider("Request Timeout (s)", config.requestTimeout, 1, 60);
                config.allowRemoteConnections = EditorGUILayout.Toggle("Allow Remote Connections", config.allowRemoteConnections);

                if (config.allowRemoteConnections)
                {
                    EditorGUILayout.HelpBox("⚠️ Remote connections are not recommended for security reasons!", MessageType.Warning);
                }

                if (EditorGUI.EndChangeCheck())
                {
                    EditorUtility.SetDirty(config);
                    AssetDatabase.SaveAssets();
                }
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawFeatures()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            showFeatures = EditorGUILayout.Foldout(showFeatures, "✨ Features", true);

            if (showFeatures)
            {
                EditorGUI.BeginChangeCheck();

                config.enableConsoleMonitoring = EditorGUILayout.Toggle("Console Monitoring", config.enableConsoleMonitoring);
                if (config.enableConsoleMonitoring)
                {
                    EditorGUI.indentLevel++;
                    config.maxConsoleLogs = EditorGUILayout.IntSlider("Max Logs", config.maxConsoleLogs, 100, 5000);
                    EditorGUI.indentLevel--;
                }

                config.autoRefreshAssets = EditorGUILayout.Toggle("Auto Refresh Assets", config.autoRefreshAssets);
                config.verboseLogging = EditorGUILayout.Toggle("Verbose Logging", config.verboseLogging);

                if (EditorGUI.EndChangeCheck())
                {
                    EditorUtility.SetDirty(config);
                    AssetDatabase.SaveAssets();
                }
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawToolsOverview()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            showTools = EditorGUILayout.Foldout(showTools, "🔧 Available Tools (30 tools)", true);

            if (showTools)
            {
                EditorGUILayout.LabelField("Editor Control", EditorStyles.boldLabel);
                EditorGUILayout.LabelField("• Select, Transform, Align, Distribute Objects", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Duplicate, Delete, Find Objects", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Execute Menu Items", EditorStyles.wordWrappedMiniLabel);

                EditorGUILayout.Space(5);
                EditorGUILayout.LabelField("Scene Management", EditorStyles.boldLabel);
                EditorGUILayout.LabelField("• Load, Save, Create Scenes", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Get Hierarchy, Find in Scene", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Cleanup Scene", EditorStyles.wordWrappedMiniLabel);

                EditorGUILayout.Space(5);
                EditorGUILayout.LabelField("Testing & Play Mode", EditorStyles.boldLabel);
                EditorGUILayout.LabelField("• Enter/Exit Play Mode", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Run Automated Tests", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Time Scale Control", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Unity Test Runner Integration", EditorStyles.wordWrappedMiniLabel);

                EditorGUILayout.Space(5);
                EditorGUILayout.LabelField("Assets & Console", EditorStyles.boldLabel);
                EditorGUILayout.LabelField("• Console Logs (Get/Clear)", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Create Prefabs, Get Assets", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Refresh Asset Database", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Add Assets to Scene", EditorStyles.wordWrappedMiniLabel);

                EditorGUILayout.Space(5);
                EditorGUILayout.LabelField("Packages & Scripts", EditorStyles.boldLabel);
                EditorGUILayout.LabelField("• Install Unity Packages", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Manage Scripts (CRUD)", EditorStyles.wordWrappedMiniLabel);
                EditorGUILayout.LabelField("• Validate C# Scripts", EditorStyles.wordWrappedMiniLabel);
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawAdvancedSettings()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            showAdvanced = EditorGUILayout.Foldout(showAdvanced, "⚡ Advanced Settings", true);

            if (showAdvanced)
            {
                EditorGUI.BeginChangeCheck();

                config.enableUndo = EditorGUILayout.Toggle("Enable Undo/Redo", config.enableUndo);
                config.autoBackupScenes = EditorGUILayout.Toggle("Auto-backup Scenes", config.autoBackupScenes);

                if (EditorGUI.EndChangeCheck())
                {
                    EditorUtility.SetDirty(config);
                    AssetDatabase.SaveAssets();
                }

                EditorGUILayout.Space(5);

                if (GUILayout.Button("Reset to Defaults"))
                {
                    if (EditorUtility.DisplayDialog("Reset Settings",
                        "Are you sure you want to reset all settings to defaults?",
                        "Reset", "Cancel"))
                    {
                        config.websocketPort = 8090;
                        config.autoStart = true;
                        config.requestTimeout = 30;
                        config.allowRemoteConnections = false;
                        config.verboseLogging = false;
                        config.enableConsoleMonitoring = true;
                        config.autoRefreshAssets = true;
                        config.maxConsoleLogs = 1000;
                        config.enableUndo = true;
                        config.autoBackupScenes = false;

                        EditorUtility.SetDirty(config);
                        AssetDatabase.SaveAssets();
                    }
                }
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawFooter()
        {
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            GUILayout.Label("Unity MCP v0.3.0 | Made with ❤️ for Game Devs", EditorStyles.centeredGreyMiniLabel);
            EditorGUILayout.EndVertical();
        }

        private string GetStatusEmoji()
        {
            return connectionStatus switch
            {
                ConnectionStatus.Connected => "🟢",
                ConnectionStatus.Connecting => "🟠",
                ConnectionStatus.Disconnected => "⚪",
                ConnectionStatus.Error => "🔴",
                _ => "⚫"
            };
        }

        private string GetStatusText()
        {
            return connectionStatus switch
            {
                ConnectionStatus.Connected => "Connected",
                ConnectionStatus.Connecting => "Starting...",
                ConnectionStatus.Disconnected => "Disconnected",
                ConnectionStatus.Error => "Error",
                _ => "Unknown"
            };
        }

        private Color GetStatusColor()
        {
            return connectionStatus switch
            {
                ConnectionStatus.Connected => Color.green,
                ConnectionStatus.Connecting => new Color(1f, 0.6f, 0f), // Orange
                ConnectionStatus.Disconnected => Color.gray,
                ConnectionStatus.Error => Color.red,
                _ => Color.white
            };
        }
    }
}
