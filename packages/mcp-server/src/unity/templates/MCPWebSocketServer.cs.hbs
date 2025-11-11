using UnityEngine;
using UnityEditor;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using Newtonsoft.Json.Linq;

namespace UnityMCP
{
    /// <summary>
    /// WebSocket server running in Unity Editor to receive MCP commands via WebSocket
    /// Enables AI assistants to control Unity Editor using JSON-RPC 2.0 protocol
    /// </summary>
    [InitializeOnLoad]
    public class MCPWebSocketServer
    {
        private static TcpListener server;
        private static Thread serverThread;
        private static bool isRunning = false;
        private static bool isStarting = false;
        private static MCPConfig config;
        private static List<WebSocketClient> clients = new List<WebSocketClient>();
        private static Dictionary<string, Func<JObject, JObject>> toolRegistry;

        static MCPWebSocketServer()
        {
            config = MCPConfig.GetOrCreate();
            EditorApplication.update += Initialize;
        }

        private static void Initialize()
        {
            EditorApplication.update -= Initialize;

            // Only auto-start if transport is WebSocket
            if (!isRunning && config.autoStart && config.transportType == "websocket")
            {
                StartServer();
            }
        }

        [MenuItem("Tools/Unity MCP/Start WebSocket Server")]
        public static void StartServer()
        {
            if (isRunning || isStarting) return;

            isStarting = true;

            try
            {
                if (config == null)
                {
                    config = MCPConfig.GetOrCreate();
                }

                int port = config.websocketPort;
                server = new TcpListener(IPAddress.Any, port);
                server.Start();
                isRunning = true;
                isStarting = false;

                RegisterTools();

                serverThread = new Thread(AcceptConnections);
                serverThread.IsBackground = true;
                serverThread.Start();

                Debug.Log($"[Unity MCP] WebSocket server started on port {port}");
                if (config.verboseLogging)
                {
                    Debug.Log($"[Unity MCP] WebSocket transport enabled");
                    Debug.Log($"[Unity MCP] Request timeout: {config.requestTimeout}s");
                }
            }
            catch (Exception e)
            {
                isStarting = false;
                Debug.LogError($"[Unity MCP] Failed to start WebSocket server: {e.Message}");
            }
        }

        [MenuItem("Tools/Unity MCP/Stop WebSocket Server")]
        public static void StopServer()
        {
            if (!isRunning) return;

            isRunning = false;

            // Close all client connections
            lock (clients)
            {
                foreach (var client in clients)
                {
                    try
                    {
                        client.Close();
                    }
                    catch { }
                }
                clients.Clear();
            }

            server?.Stop();
            serverThread?.Abort();

            Debug.Log("[Unity MCP] WebSocket server stopped");
        }

        public static bool IsRunning()
        {
            return isRunning;
        }

        public static bool IsStarting()
        {
            return isStarting;
        }

        public static TcpListener GetListener()
        {
            return server;
        }

        private static JObject WrapHandler<T>(Func<T, string> handler, JObject data) where T : new()
        {
            var commandData = JsonUtility.FromJson<T>(data.ToString());
            if (commandData == null) commandData = new T();
            var result = handler(commandData);
            return JObject.Parse(result);
        }

        private static JObject WrapStringHandler(Func<string, string> handler, JObject data)
        {
            var result = handler(data.ToString());
            return JObject.Parse(result);
        }

        private static JObject WrapHandlerNoArgs(Func<string> handler, JObject data)
        {
            var result = handler();
            return JObject.Parse(result);
        }

        private static void RegisterTools()
        {
            toolRegistry = new Dictionary<string, Func<JObject, JObject>>
            {
                // Editor manipulation
                ["editor_select"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.SelectObjects, data),
                ["editor_transform"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.TransformObjects, data),
                ["editor_align"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.AlignObjects, data),
                ["editor_distribute"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.DistributeObjects, data),
                ["editor_duplicate"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.DuplicateObjects, data),
                ["editor_delete"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.DeleteObjects, data),
                ["editor_parent"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.ParentObjects, data),
                ["editor_component"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.ComponentOperation, data),
                ["editor_find"] = (data) => WrapHandler<EditorCommandHandler.CommandData>(EditorCommandHandler.FindObjects, data),

                // Scene operations
                ["scene_list"] = (data) => WrapHandlerNoArgs(SceneHandler.ListScenes, data),
                ["scene_load"] = (data) => WrapHandler<SceneHandler.CommandData>(SceneHandler.LoadScene, data),
                ["scene_save"] = (data) => WrapHandler<SceneHandler.CommandData>(SceneHandler.SaveScene, data),
                ["scene_new"] = (data) => WrapHandler<SceneHandler.CommandData>(SceneHandler.CreateNewScene, data),
                ["scene_hierarchy"] = (data) => WrapHandlerNoArgs(SceneHandler.GetHierarchy, data),
                ["scene_find"] = (data) => WrapHandler<SceneHandler.CommandData>(SceneHandler.FindInScene, data),
                ["scene_cleanup"] = (data) => WrapHandler<SceneHandler.CommandData>(SceneHandler.CleanupScene, data),

                // Asset operations
                ["console_get_logs"] = (data) => WrapStringHandler(AssetHandler.GetConsoleLogs, data),
                ["console_clear"] = (data) => WrapHandlerNoArgs(AssetHandler.ClearConsole, data),
                ["asset_create_prefab"] = (data) => WrapStringHandler(AssetHandler.CreatePrefab, data),
                ["project_get_assets"] = (data) => WrapStringHandler(AssetHandler.GetAssets, data),
                ["asset_refresh"] = (data) => WrapHandlerNoArgs(AssetHandler.RefreshAssets, data),

                // Play mode testing
                ["playmode_enter"] = (data) => WrapHandler<PlayModeHandler.CommandData>(PlayModeHandler.EnterPlayMode, data),
                ["playmode_exit"] = (data) => WrapHandler<PlayModeHandler.CommandData>(PlayModeHandler.ExitPlayMode, data),
                ["playmode_status"] = (data) => WrapHandlerNoArgs(PlayModeHandler.GetPlayModeStatus, data),
                ["playmode_test"] = (data) => WrapHandler<PlayModeHandler.CommandData>(PlayModeHandler.RunTest, data),
                ["playmode_pause"] = (data) => WrapHandlerNoArgs(PlayModeHandler.PausePlayMode, data),
                ["playmode_step"] = (data) => WrapHandlerNoArgs(PlayModeHandler.StepFrame, data),
                ["playmode_timescale"] = (data) => WrapHandler<PlayModeHandler.CommandData>(PlayModeHandler.SetTimeScale, data),
                ["playmode_screenshot"] = (data) => WrapHandler<PlayModeHandler.CommandData>(PlayModeHandler.CaptureScreenshot, data),

                // Advanced tools
                ["advanced_execute_menu"] = (data) => WrapStringHandler(AdvancedToolsHandler.ExecuteMenuItem, data),
                ["advanced_add_package"] = (data) => WrapStringHandler(AdvancedToolsHandler.AddPackage, data),
                ["advanced_run_tests"] = (data) => WrapStringHandler(AdvancedToolsHandler.RunUnityTests, data),
                ["advanced_add_asset_to_scene"] = (data) => WrapStringHandler(AdvancedToolsHandler.AddAssetToScene, data),
                ["advanced_create_script"] = (data) => WrapStringHandler(AdvancedToolsHandler.CreateScript, data),
                ["advanced_read_script"] = (data) => WrapStringHandler(AdvancedToolsHandler.ReadScript, data),
                ["advanced_update_script"] = (data) => WrapStringHandler(AdvancedToolsHandler.UpdateScript, data),
                ["advanced_delete_script"] = (data) => WrapStringHandler(AdvancedToolsHandler.DeleteScript, data),
                ["advanced_validate_script"] = (data) => WrapStringHandler(AdvancedToolsHandler.ValidateScript, data),
            };
        }

        private static void AcceptConnections()
        {
            while (isRunning)
            {
                try
                {
                    TcpClient tcpClient = server.AcceptTcpClient();
                    WebSocketClient client = new WebSocketClient(tcpClient, toolRegistry);

                    lock (clients)
                    {
                        clients.Add(client);
                    }

                    Thread clientThread = new Thread(client.HandleConnection);
                    clientThread.IsBackground = true;
                    clientThread.Start();
                }
                catch (Exception e)
                {
                    if (isRunning)
                    {
                        Debug.LogError($"[Unity MCP] Error accepting connection: {e.Message}");
                    }
                }
            }
        }
    }

    /// <summary>
    /// Handles individual WebSocket client connections
    /// </summary>
    public class WebSocketClient
    {
        private TcpClient tcpClient;
        private NetworkStream stream;
        private Dictionary<string, Func<JObject, JObject>> toolRegistry;
        private bool isWebSocketHandshake = false;

        public WebSocketClient(TcpClient client, Dictionary<string, Func<JObject, JObject>> registry)
        {
            tcpClient = client;
            stream = client.GetStream();
            toolRegistry = registry;
        }

        public void HandleConnection()
        {
            try
            {
                byte[] buffer = new byte[4096];
                int bytesRead;

                // Read WebSocket handshake
                bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead > 0)
                {
                    string request = Encoding.UTF8.GetString(buffer, 0, bytesRead);

                    if (request.Contains("Upgrade: websocket"))
                    {
                        PerformHandshake(request);
                        isWebSocketHandshake = true;

                        // Handle incoming messages
                        while (tcpClient.Connected)
                        {
                            try
                            {
                                string message = ReceiveMessage();
                                if (message != null)
                                {
                                    string response = ProcessMessage(message);
                                    SendMessage(response);
                                }
                            }
                            catch (Exception e)
                            {
                                Debug.LogError($"[Unity MCP] Error processing message: {e.Message}");
                                break;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Debug.LogError($"[Unity MCP] WebSocket connection error: {e.Message}");
            }
            finally
            {
                Close();
            }
        }

        private void PerformHandshake(string request)
        {
            string key = ExtractKey(request);
            string acceptKey = GenerateAcceptKey(key);

            string response = "HTTP/1.1 101 Switching Protocols\r\n" +
                            "Upgrade: websocket\r\n" +
                            "Connection: Upgrade\r\n" +
                            $"Sec-WebSocket-Accept: {acceptKey}\r\n\r\n";

            byte[] responseBytes = Encoding.UTF8.GetBytes(response);
            stream.Write(responseBytes, 0, responseBytes.Length);
        }

        private string ExtractKey(string request)
        {
            string[] lines = request.Split(new[] { "\r\n" }, StringSplitOptions.None);
            foreach (string line in lines)
            {
                if (line.StartsWith("Sec-WebSocket-Key:"))
                {
                    return line.Substring("Sec-WebSocket-Key:".Length).Trim();
                }
            }
            return "";
        }

        private string GenerateAcceptKey(string key)
        {
            string magic = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
            string combined = key + magic;
            byte[] hash = System.Security.Cryptography.SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(combined));
            return Convert.ToBase64String(hash);
        }

        private string ReceiveMessage()
        {
            byte[] buffer = new byte[2];
            int bytesRead = stream.Read(buffer, 0, 2);

            if (bytesRead < 2) return null;

            bool isMasked = (buffer[1] & 0x80) != 0;
            int payloadLength = buffer[1] & 0x7F;

            if (payloadLength == 126)
            {
                byte[] lengthBytes = new byte[2];
                stream.Read(lengthBytes, 0, 2);
                payloadLength = (lengthBytes[0] << 8) | lengthBytes[1];
            }
            else if (payloadLength == 127)
            {
                byte[] lengthBytes = new byte[8];
                stream.Read(lengthBytes, 0, 8);
                // For simplicity, assuming payload won't exceed int.MaxValue
                payloadLength = (int)BitConverter.ToInt64(lengthBytes, 0);
            }

            byte[] masks = new byte[4];
            if (isMasked)
            {
                stream.Read(masks, 0, 4);
            }

            byte[] payload = new byte[payloadLength];
            stream.Read(payload, 0, payloadLength);

            if (isMasked)
            {
                for (int i = 0; i < payload.Length; i++)
                {
                    payload[i] = (byte)(payload[i] ^ masks[i % 4]);
                }
            }

            return Encoding.UTF8.GetString(payload);
        }

        private void SendMessage(string message)
        {
            byte[] payload = Encoding.UTF8.GetBytes(message);
            byte[] frame;

            if (payload.Length < 126)
            {
                frame = new byte[2 + payload.Length];
                frame[0] = 0x81; // FIN + Text frame
                frame[1] = (byte)payload.Length;
                Array.Copy(payload, 0, frame, 2, payload.Length);
            }
            else if (payload.Length < 65536)
            {
                frame = new byte[4 + payload.Length];
                frame[0] = 0x81;
                frame[1] = 126;
                frame[2] = (byte)(payload.Length >> 8);
                frame[3] = (byte)(payload.Length & 0xFF);
                Array.Copy(payload, 0, frame, 4, payload.Length);
            }
            else
            {
                frame = new byte[10 + payload.Length];
                frame[0] = 0x81;
                frame[1] = 127;
                byte[] lengthBytes = BitConverter.GetBytes((long)payload.Length);
                Array.Copy(lengthBytes, 0, frame, 2, 8);
                Array.Copy(payload, 0, frame, 10, payload.Length);
            }

            stream.Write(frame, 0, frame.Length);
        }

        private string ProcessMessage(string message)
        {
            try
            {
                JObject request = JObject.Parse(message);
                string id = request["id"]?.ToString();
                string method = request["method"]?.ToString();
                JObject parameters = request["params"] as JObject;

                if (toolRegistry.TryGetValue(method, out var handler))
                {
                    JObject result = handler(parameters);
                    JObject response = new JObject
                    {
                        ["jsonrpc"] = "2.0",
                        ["id"] = id,
                        ["result"] = result
                    };
                    return response.ToString();
                }
                else
                {
                    JObject error = new JObject
                    {
                        ["jsonrpc"] = "2.0",
                        ["id"] = id,
                        ["error"] = new JObject
                        {
                            ["code"] = -32601,
                            ["message"] = $"Method not found: {method}"
                        }
                    };
                    return error.ToString();
                }
            }
            catch (Exception e)
            {
                JObject error = new JObject
                {
                    ["jsonrpc"] = "2.0",
                    ["id"] = null,
                    ["error"] = new JObject
                    {
                        ["code"] = -32603,
                        ["message"] = $"Internal error: {e.Message}"
                    }
                };
                return error.ToString();
            }
        }

        public void Close()
        {
            try
            {
                stream?.Close();
                tcpClient?.Close();
            }
            catch { }
        }
    }
}
