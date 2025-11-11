using UnityEngine;
using UnityEditor;
using UnityEditor.PackageManager;
using UnityEditor.TestTools.TestRunner.Api;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace UnityMCP
{
    /// <summary>
    /// Advanced tools for Unity: menu execution, package management, testing, and script operations
    /// Provides powerful automation capabilities for Unity Editor
    /// </summary>
    public static class AdvancedToolsHandler
    {
        public static string HandleCommand(string path, string body)
        {
            try
            {
                switch (path)
                {
                    case "/advanced/execute_menu":
                        return ExecuteMenuItem(body);
                    case "/advanced/add_package":
                        return AddPackage(body);
                    case "/advanced/run_tests":
                        return RunUnityTests(body);
                    case "/advanced/add_asset_to_scene":
                        return AddAssetToScene(body);
                    case "/advanced/create_script":
                        return CreateScript(body);
                    case "/advanced/read_script":
                        return ReadScript(body);
                    case "/advanced/update_script":
                        return UpdateScript(body);
                    case "/advanced/delete_script":
                        return DeleteScript(body);
                    case "/advanced/validate_script":
                        return ValidateScript(body);
                    default:
                        return JsonResponse(false, $"Unknown endpoint: {path}");
                }
            }
            catch (Exception e)
            {
                return JsonResponse(false, e.Message);
            }
        }

        // ===== MENU EXECUTION =====
        public static string ExecuteMenuItem(string body)
        {
            var data = ParseJson(body);
            string menuPath = data.ContainsKey("menuPath") ? data["menuPath"] : "";

            if (string.IsNullOrEmpty(menuPath))
            {
                return JsonResponse(false, "menuPath is required");
            }

            try
            {
                bool executed = EditorApplication.ExecuteMenuItem(menuPath);
                if (!executed)
                {
                    return JsonResponse(false, $"Menu item not found or failed to execute: {menuPath}");
                }
                return JsonResponse(true, $"Executed menu item: {menuPath}");
            }
            catch (Exception e)
            {
                return JsonResponse(false, $"Failed to execute menu item: {e.Message}");
            }
        }

        // ===== PACKAGE MANAGEMENT =====
        public static string AddPackage(string body)
        {
            var data = ParseJson(body);
            string packageName = data.ContainsKey("packageName") ? data["packageName"] : "";

            if (string.IsNullOrEmpty(packageName))
            {
                return JsonResponse(false, "packageName is required");
            }

            var request = Client.Add(packageName);
            while (!request.IsCompleted)
            {
                System.Threading.Thread.Sleep(100);
            }

            if (request.Status == StatusCode.Success)
            {
                return JsonResponse(true, $"Package installed: {packageName}", new { package = request.Result.packageId });
            }
            else
            {
                return JsonResponse(false, $"Failed to install package: {request.Error.message}");
            }
        }

        // ===== UNITY TEST RUNNER =====
        public static string RunUnityTests(string body)
        {
            var data = ParseJson(body);
            string testMode = data.ContainsKey("testMode") ? data["testMode"] : "EditMode";
            string filter = data.ContainsKey("filter") ? data["filter"] : "";

            var testRunnerApi = ScriptableObject.CreateInstance<TestRunnerApi>();
            var testResults = new List<string>();

            try
            {
                TestMode mode = testMode == "PlayMode" ? TestMode.PlayMode : TestMode.EditMode;

                var filterOptions = new Filter
                {
                    testMode = mode
                };

                if (!string.IsNullOrEmpty(filter))
                {
                    filterOptions.testNames = new[] { filter };
                }

                testRunnerApi.Execute(new ExecutionSettings(filterOptions));

                return JsonResponse(true, $"Test execution started in {testMode}", new { mode = testMode, filter });
            }
            catch (Exception e)
            {
                return JsonResponse(false, $"Failed to run tests: {e.Message}");
            }
        }

        // ===== ASSET TO SCENE =====
        public static string AddAssetToScene(string body)
        {
            var data = ParseJson(body);
            string assetPath = data.ContainsKey("assetPath") ? data["assetPath"] : "";
            string parentPath = data.ContainsKey("parentPath") ? data["parentPath"] : "";

            if (string.IsNullOrEmpty(assetPath))
            {
                return JsonResponse(false, "assetPath is required");
            }

            var asset = AssetDatabase.LoadAssetAtPath<GameObject>(assetPath);
            if (asset == null)
            {
                return JsonResponse(false, $"Asset not found: {assetPath}");
            }

            GameObject instance = (GameObject)PrefabUtility.InstantiatePrefab(asset);

            if (!string.IsNullOrEmpty(parentPath))
            {
                GameObject parent = GameObject.Find(parentPath);
                if (parent != null)
                {
                    instance.transform.SetParent(parent.transform);
                }
            }

            Undo.RegisterCreatedObjectUndo(instance, "Add Asset to Scene");

            return JsonResponse(true, $"Added asset to scene: {instance.name}", new { name = instance.name, path = assetPath });
        }

        // ===== SCRIPT MANAGEMENT =====
        public static string CreateScript(string body)
        {
            var data = ParseJson(body);
            string scriptName = data.ContainsKey("scriptName") ? data["scriptName"] : "";
            string content = data.ContainsKey("content") ? data["content"] : "";
            string folderPath = data.ContainsKey("folderPath") ? data["folderPath"] : "Assets/Scripts";

            if (string.IsNullOrEmpty(scriptName))
            {
                return JsonResponse(false, "scriptName is required");
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

            string scriptPath = $"{folderPath}/{scriptName}.cs";

            if (File.Exists(scriptPath))
            {
                return JsonResponse(false, $"Script already exists: {scriptPath}");
            }

            // Default C# template if no content provided
            if (string.IsNullOrEmpty(content))
            {
                content = $@"using UnityEngine;

public class {scriptName} : MonoBehaviour
{{
    void Start()
    {{

    }}

    void Update()
    {{

    }}
}}";
            }

            File.WriteAllText(scriptPath, content);
            AssetDatabase.Refresh();

            return JsonResponse(true, $"Script created: {scriptPath}", new { path = scriptPath });
        }

        public static string ReadScript(string body)
        {
            var data = ParseJson(body);
            string scriptPath = data.ContainsKey("scriptPath") ? data["scriptPath"] : "";

            if (string.IsNullOrEmpty(scriptPath))
            {
                return JsonResponse(false, "scriptPath is required");
            }

            if (!File.Exists(scriptPath))
            {
                return JsonResponse(false, $"Script not found: {scriptPath}");
            }

            string content = File.ReadAllText(scriptPath);
            return JsonResponse(true, "Script read successfully", new { path = scriptPath, content });
        }

        public static string UpdateScript(string body)
        {
            var data = ParseJson(body);
            string scriptPath = data.ContainsKey("scriptPath") ? data["scriptPath"] : "";
            string content = data.ContainsKey("content") ? data["content"] : "";

            if (string.IsNullOrEmpty(scriptPath))
            {
                return JsonResponse(false, "scriptPath is required");
            }

            if (!File.Exists(scriptPath))
            {
                return JsonResponse(false, $"Script not found: {scriptPath}");
            }

            File.WriteAllText(scriptPath, content);
            AssetDatabase.Refresh();

            return JsonResponse(true, $"Script updated: {scriptPath}", new { path = scriptPath });
        }

        public static string DeleteScript(string body)
        {
            var data = ParseJson(body);
            string scriptPath = data.ContainsKey("scriptPath") ? data["scriptPath"] : "";

            if (string.IsNullOrEmpty(scriptPath))
            {
                return JsonResponse(false, "scriptPath is required");
            }

            if (!File.Exists(scriptPath))
            {
                return JsonResponse(false, $"Script not found: {scriptPath}");
            }

            AssetDatabase.DeleteAsset(scriptPath);
            AssetDatabase.Refresh();

            return JsonResponse(true, $"Script deleted: {scriptPath}", new { path = scriptPath });
        }

        public static string ValidateScript(string body)
        {
            var data = ParseJson(body);
            string scriptPath = data.ContainsKey("scriptPath") ? data["scriptPath"] : "";
            string content = data.ContainsKey("content") ? data["content"] : null;

            if (string.IsNullOrEmpty(scriptPath) && string.IsNullOrEmpty(content))
            {
                return JsonResponse(false, "scriptPath or content is required");
            }

            string scriptContent = content;
            if (string.IsNullOrEmpty(scriptContent) && !string.IsNullOrEmpty(scriptPath))
            {
                if (!File.Exists(scriptPath))
                {
                    return JsonResponse(false, $"Script not found: {scriptPath}");
                }
                scriptContent = File.ReadAllText(scriptPath);
            }

            // Basic syntax validation
            var errors = new List<string>();

            // Check for basic C# syntax
            if (!scriptContent.Contains("using") && !scriptContent.Contains("namespace"))
            {
                errors.Add("Script may be missing using statements");
            }

            int openBraces = scriptContent.Count(c => c == '{');
            int closeBraces = scriptContent.Count(c => c == '}');
            if (openBraces != closeBraces)
            {
                errors.Add($"Mismatched braces: {openBraces} open, {closeBraces} close");
            }

            bool isValid = errors.Count == 0;
            string message = isValid ? "Script validation passed" : "Script has potential issues";

            return JsonResponse(isValid, message, new { errors = errors.ToArray(), isValid });
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

        public static string JsonResponse(bool success, string message, object data = null)
        {
            string dataJson = data != null ? $",\"data\":{SimpleJsonSerialize(data)}" : "";
            return $"{{\"success\":{success.ToString().ToLower()},\"message\":\"{message}\"{dataJson}}}";
        }

        public static string SimpleJsonSerialize(object obj)
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
    }
}
