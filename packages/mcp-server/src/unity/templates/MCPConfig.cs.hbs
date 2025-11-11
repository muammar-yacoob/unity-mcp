using UnityEngine;

namespace UnityMCP
{
    /// <summary>
    /// Configuration settings for Unity MCP Server
    /// Stored as ScriptableObject for persistence
    /// </summary>
    [CreateAssetMenu(fileName = "MCPConfig", menuName = "Unity MCP/Configuration", order = 1)]
    public class MCPConfig : ScriptableObject
    {
        [Header("Transport Settings")]
        [Tooltip("Transport type: http or websocket")]
        public string transportType = "http";

        [Header("HTTP Server Settings")]
        [Tooltip("Port for HTTP server")]
        [Range(1024, 65535)]
        public int port = 8080;

        [Header("WebSocket Server Settings")]
        [Tooltip("Port for WebSocket server")]
        [Range(1024, 65535)]
        public int websocketPort = 8090;

        [Header("General Settings")]
        [Tooltip("Auto-start server when Unity Editor loads")]
        public bool autoStart = true;

        [Tooltip("Server request timeout in seconds")]
        [Range(1, 60)]
        public int requestTimeout = 30;

        [Header("Connection Settings")]
        [Tooltip("Allow remote connections (not recommended for security)")]
        public bool allowRemoteConnections = false;

        [Tooltip("Enable detailed logging for debugging")]
        public bool verboseLogging = false;

        [Header("Features")]
        [Tooltip("Enable console log monitoring")]
        public bool enableConsoleMonitoring = true;

        [Tooltip("Enable automatic asset refresh")]
        public bool autoRefreshAssets = true;

        [Tooltip("Maximum console logs to store")]
        [Range(100, 5000)]
        public int maxConsoleLogs = 1000;

        [Header("Advanced")]
        [Tooltip("Enable undo/redo for all operations")]
        public bool enableUndo = true;

        [Tooltip("Backup scenes before destructive operations")]
        public bool autoBackupScenes = false;

        /// <summary>
        /// Get or create the default config instance
        /// </summary>
        public static MCPConfig GetOrCreate()
        {
            var config = Resources.Load<MCPConfig>("MCPConfig");
            if (config == null)
            {
                config = CreateInstance<MCPConfig>();
#if UNITY_EDITOR
                // Create Resources folder if it doesn't exist
                if (!UnityEditor.AssetDatabase.IsValidFolder("Assets/Resources"))
                {
                    UnityEditor.AssetDatabase.CreateFolder("Assets", "Resources");
                }

                // Save as asset
                string path = "Assets/Resources/MCPConfig.asset";
                UnityEditor.AssetDatabase.CreateAsset(config, path);
                UnityEditor.AssetDatabase.SaveAssets();
                Debug.Log($"[Unity MCP] Created config at {path}");
#endif
            }
            return config;
        }
    }
}
