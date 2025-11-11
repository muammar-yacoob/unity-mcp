using UnityEngine;
using UnityEditor;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace UnityMCP
{
    /// <summary>
    /// Handler for console logs, assets, and project operations
    /// Provides access to Unity's console, asset database, and project structure
    /// </summary>
    public static class AssetHandler
    {
        private static List<LogEntry> consoleLogs = new List<LogEntry>();
        private const int MAX_LOGS = 5000;

        [InitializeOnLoadMethod]
        private static void Initialize()
        {
            Application.logMessageReceived += OnLogMessageReceived;
        }

        private static void OnLogMessageReceived(string condition, string stackTrace, LogType type)
        {
            consoleLogs.Add(new LogEntry
            {
                message = condition,
                stackTrace = stackTrace,
                type = type.ToString(),
                timestamp = DateTime.Now.ToString("HH:mm:ss")
            });

            // Keep only recent logs
            if (consoleLogs.Count > MAX_LOGS)
            {
                consoleLogs.RemoveAt(0);
            }
        }

        public static string HandleCommand(string path, string body, string query)
        {
            try
            {
                switch (path)
                {
                    case "/console/get_logs":
                        return GetConsoleLogs(body);
                    case "/console/clear":
                        return ClearConsole();
                    case "/asset/create_prefab":
                        return CreatePrefab(body);
                    case "/project/get_assets":
                        return GetAssets(body);
                    case "/asset/refresh":
                        return RefreshAssets();
                    default:
                        return JsonResponse(false, $"Unknown endpoint: {path}");
                }
            }
            catch (Exception e)
            {
                return JsonResponse(false, e.Message);
            }
        }

        // ===== CONSOLE OPERATIONS =====
        private static string GetConsoleLogs(string body)
        {
            var data = ParseJson(body);
            string logType = data.ContainsKey("logType") ? data["logType"] : "all";
            int limit = data.ContainsKey("limit") ? int.Parse(data["limit"]) : 50;

            var filtered = consoleLogs.AsEnumerable();

            if (logType != "all")
            {
                filtered = filtered.Where(log => log.type.ToLower() == logType.ToLower());
            }

            var logs = filtered.TakeLast(limit).Select(log => new
            {
                message = log.message,
                type = log.type,
                timestamp = log.timestamp,
                stackTrace = log.stackTrace
            }).ToArray();

            return JsonResponse(true, $"Retrieved {logs.Length} console logs", new { logs, total = consoleLogs.Count });
        }

        private static string ClearConsole()
        {
            consoleLogs.Clear();

            // Also clear Unity's internal console
            var logEntries = System.Type.GetType("UnityEditor.LogEntries, UnityEditor.dll");
            var clearMethod = logEntries?.GetMethod("Clear", System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public);
            clearMethod?.Invoke(null, null);

            return JsonResponse(true, "Console cleared");
        }

        // ===== ASSET OPERATIONS =====
        private static string CreatePrefab(string body)
        {
            var data = ParseJson(body);
            string prefabName = data.ContainsKey("prefabName") ? data["prefabName"] : "";
            string folderPath = data.ContainsKey("folderPath") ? data["folderPath"] : "Assets/Prefabs";

            if (string.IsNullOrEmpty(prefabName))
            {
                return JsonResponse(false, "prefabName is required");
            }

            if (Selection.activeGameObject == null)
            {
                return JsonResponse(false, "No GameObject selected. Please select a GameObject to create a prefab from.");
            }

            // Ensure folder exists
            if (!AssetDatabase.IsValidFolder(folderPath))
            {
                string[] folders = folderPath.Split('/');
                string currentPath = folders[0];
                for (int i = 1; i < folders.Length; i++)
                {
                    string newPath = currentPath + "/" + folders[i];
                    if (!AssetDatabase.IsValidFolder(newPath))
                    {
                        AssetDatabase.CreateFolder(currentPath, folders[i]);
                    }
                    currentPath = newPath;
                }
            }

            string prefabPath = $"{folderPath}/{prefabName}.prefab";

            if (File.Exists(prefabPath))
            {
                return JsonResponse(false, $"Prefab already exists: {prefabPath}");
            }

            GameObject selectedObject = Selection.activeGameObject;
            PrefabUtility.SaveAsPrefabAsset(selectedObject, prefabPath);
            AssetDatabase.Refresh();

            return JsonResponse(true, $"Prefab created: {prefabPath}", new { path = prefabPath, name = prefabName });
        }

        private static string GetAssets(string body)
        {
            var data = ParseJson(body);
            string type = data.ContainsKey("type") ? data["type"] : "";
            string folder = data.ContainsKey("folder") ? data["folder"] : "Assets";

            string[] guids;
            if (!string.IsNullOrEmpty(type))
            {
                guids = AssetDatabase.FindAssets($"t:{type}", new[] { folder });
            }
            else
            {
                guids = AssetDatabase.FindAssets("", new[] { folder });
            }

            var assets = guids.Select(guid =>
            {
                string path = AssetDatabase.GUIDToAssetPath(guid);
                return new
                {
                    path,
                    name = Path.GetFileName(path),
                    type = AssetDatabase.GetMainAssetTypeAtPath(path)?.Name
                };
            }).ToArray();

            return JsonResponse(true, $"Found {assets.Length} assets", new { assets, folder, filterType = type });
        }

        private static string RefreshAssets()
        {
            AssetDatabase.Refresh();
            return JsonResponse(true, "Asset database refreshed");
        }

        // ===== HELPER METHODS =====
        private static Dictionary<string, string> ParseJson(string json)
        {
            var result = new Dictionary<string, string>();
            if (string.IsNullOrEmpty(json)) return result;

            json = json.Trim();
            if (!json.StartsWith("{")) return result;

            json = json.Trim('{', '}');

            var parts = new List<string>();
            int braceLevel = 0;
            int quoteCount = 0;
            string current = "";

            foreach (char c in json)
            {
                if (c == '"') quoteCount++;
                if (c == '{') braceLevel++;
                if (c == '}') braceLevel--;

                if (c == ',' && braceLevel == 0 && quoteCount % 2 == 0)
                {
                    parts.Add(current);
                    current = "";
                }
                else
                {
                    current += c;
                }
            }
            if (!string.IsNullOrEmpty(current))
            {
                parts.Add(current);
            }

            foreach (var part in parts)
            {
                var colonIndex = part.IndexOf(':');
                if (colonIndex > 0)
                {
                    string key = part.Substring(0, colonIndex).Trim().Trim('"', ' ');
                    string value = part.Substring(colonIndex + 1).Trim().Trim('"', ' ');
                    result[key] = value;
                }
            }

            return result;
        }

        private static string JsonResponse(bool success, string message, object data = null)
        {
            string dataJson = data != null ? $",\"data\":{SimpleJsonSerialize(data)}" : "";
            return $"{{\"success\":{success.ToString().ToLower()},\"message\":\"{message}\"{dataJson}}}";
        }

        private static string SimpleJsonSerialize(object obj)
        {
            if (obj == null) return "null";
            if (obj is string str) return $"\"{str}\"";
            if (obj is bool b) return b.ToString().ToLower();
            if (obj is int || obj is float || obj is double) return obj.ToString();

            var type = obj.GetType();
            if (type.IsArray || (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(List<>)))
            {
                var items = new List<string>();
                foreach (var item in (System.Collections.IEnumerable)obj)
                {
                    items.Add(SimpleJsonSerialize(item));
                }
                return $"[{string.Join(",", items)}]";
            }

            var fields = type.GetFields();
            var items2 = new List<string>();
            foreach (var field in fields)
            {
                var value = field.GetValue(obj);
                items2.Add($"\"{field.Name}\":{SimpleJsonSerialize(value)}");
            }
            return $"{{{string.Join(",", items2)}}}";
        }

        private class LogEntry
        {
            public string message;
            public string stackTrace;
            public string type;
            public string timestamp;
        }
    }
}
