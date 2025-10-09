using UnityEngine;
using UnityEditor;
using UnityEngine.SceneManagement;
using UnityEditor.SceneManagement;
using System;
using System.Linq;
using System.Collections.Generic;

namespace unity-mcp
{
    /// <summary>
    /// Handles Unity scene operations and hierarchy management
    /// Provides scene navigation, object finding, and batch operations
    /// </summary>
    public static class SceneHandler
    {
        public static string HandleCommand(string path, string requestBody)
        {
            try
            {
                var data = JsonUtility.FromJson<CommandData>(requestBody);

                switch (path)
                {
                    case "/scene/list":
                        return ListScenes();
                    case "/scene/load":
                        return LoadScene(data);
                    case "/scene/save":
                        return SaveScene(data);
                    case "/scene/new":
                        return CreateNewScene(data);
                    case "/scene/hierarchy":
                        return GetHierarchy();
                    case "/scene/find":
                        return FindInScene(data);
                    case "/scene/cleanup":
                        return CleanupScene(data);
                    default:
                        return Error("Unknown scene command");
                }
            }
            catch (Exception e)
            {
                return Error(e.Message);
            }
        }

        private static string ListScenes()
        {
            var scenes = new List<object>();

            // List all scenes in build settings
            for (int i = 0; i < SceneManager.sceneCountInBuildSettings; i++)
            {
                string scenePath = SceneUtility.GetScenePathByBuildIndex(i);
                scenes.Add(new
                {
                    index = i,
                    path = scenePath,
                    name = System.IO.Path.GetFileNameWithoutExtension(scenePath)
                });
            }

            // Add currently loaded scenes
            var loadedScenes = new List<object>();
            for (int i = 0; i < SceneManager.sceneCount; i++)
            {
                var scene = SceneManager.GetSceneAt(i);
                loadedScenes.Add(new
                {
                    name = scene.name,
                    path = scene.path,
                    isLoaded = scene.isLoaded,
                    rootCount = scene.rootCount
                });
            }

            return $"{{\"success\":true,\"buildScenes\":{JsonUtility.ToJson(scenes)},\"loadedScenes\":{JsonUtility.ToJson(loadedScenes)}}}";
        }

        private static string LoadScene(CommandData data)
        {
            try
            {
                Scene scene;

                if (data.index >= 0)
                {
                    string scenePath = SceneUtility.GetScenePathByBuildIndex(data.index);
                    scene = EditorSceneManager.OpenScene(scenePath, OpenSceneMode.Single);
                }
                else if (!string.IsNullOrEmpty(data.sceneName))
                {
                    // Find scene by name in build settings
                    string scenePath = "";
                    for (int i = 0; i < SceneManager.sceneCountInBuildSettings; i++)
                    {
                        string path = SceneUtility.GetScenePathByBuildIndex(i);
                        if (System.IO.Path.GetFileNameWithoutExtension(path) == data.sceneName)
                        {
                            scenePath = path;
                            break;
                        }
                    }

                    if (string.IsNullOrEmpty(scenePath))
                    {
                        return Error($"Scene not found: {data.sceneName}");
                    }

                    scene = EditorSceneManager.OpenScene(scenePath, OpenSceneMode.Single);
                }
                else
                {
                    return Error("No scene specified");
                }

                return Success($"Loaded scene: {scene.name}");
            }
            catch (Exception e)
            {
                return Error($"Failed to load scene: {e.Message}");
            }
        }

        private static string SaveScene(CommandData data)
        {
            try
            {
                if (data.saveAll)
                {
                    EditorSceneManager.SaveOpenScenes();
                    return Success("Saved all open scenes");
                }
                else
                {
                    var scene = SceneManager.GetActiveScene();
                    EditorSceneManager.SaveScene(scene);
                    return Success($"Saved scene: {scene.name}");
                }
            }
            catch (Exception e)
            {
                return Error($"Failed to save scene: {e.Message}");
            }
        }

        private static string CreateNewScene(CommandData data)
        {
            try
            {
                var newScene = EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);

                if (!string.IsNullOrEmpty(data.sceneName))
                {
                    EditorSceneManager.SaveScene(newScene, $"Assets/Scenes/{data.sceneName}.unity");
                }

                return Success($"Created new scene: {newScene.name}");
            }
            catch (Exception e)
            {
                return Error($"Failed to create scene: {e.Message}");
            }
        }

        private static string GetHierarchy()
        {
            var scene = SceneManager.GetActiveScene();
            var rootObjects = scene.GetRootGameObjects();

            var hierarchy = rootObjects.Select(obj => BuildHierarchyNode(obj)).ToList();

            return $"{{\"success\":true,\"scene\":\"{scene.name}\",\"hierarchy\":{JsonUtility.ToJson(hierarchy)}}}";
        }

        private static object BuildHierarchyNode(GameObject obj)
        {
            var children = new List<object>();
            for (int i = 0; i < obj.transform.childCount; i++)
            {
                children.Add(BuildHierarchyNode(obj.transform.GetChild(i).gameObject));
            }

            return new
            {
                name = obj.name,
                tag = obj.tag,
                layer = LayerMask.LayerToName(obj.layer),
                active = obj.activeSelf,
                components = obj.GetComponents<Component>().Select(c => c.GetType().Name).ToArray(),
                children = children.ToArray()
            };
        }

        private static string FindInScene(CommandData data)
        {
            var results = new List<string>();

            if (!string.IsNullOrEmpty(data.tag))
            {
                var objects = GameObject.FindGameObjectsWithTag(data.tag);
                results = objects.Select(o => o.name).ToList();
            }
            else if (!string.IsNullOrEmpty(data.pattern))
            {
                var scene = SceneManager.GetActiveScene();
                var allObjects = scene.GetRootGameObjects();

                foreach (var root in allObjects)
                {
                    FindByPattern(root, data.pattern, results);
                }
            }
            else if (!string.IsNullOrEmpty(data.componentType))
            {
                var type = Type.GetType(data.componentType);
                if (type != null)
                {
                    var components = GameObject.FindObjectsOfType(type);
                    results = components.Select(c => (c as Component)?.gameObject.name).Where(n => n != null).ToList();
                }
            }

            return $"{{\"success\":true,\"count\":{results.Count},\"objects\":[{string.Join(",", results.Select(n => $"\"{n}\""))}]}}";
        }

        private static void FindByPattern(GameObject obj, string pattern, List<string> results)
        {
            if (obj.name.Contains(pattern))
            {
                results.Add(obj.name);
            }

            for (int i = 0; i < obj.transform.childCount; i++)
            {
                FindByPattern(obj.transform.GetChild(i).gameObject, pattern, results);
            }
        }

        private static string CleanupScene(CommandData data)
        {
            int cleaned = 0;

            // Remove missing script references
            if (data.removeMissingScripts)
            {
                var allObjects = GameObject.FindObjectsOfType<GameObject>();
                foreach (var obj in allObjects)
                {
                    int count = GameObjectUtility.GetMonoBehavioursWithMissingScriptCount(obj);
                    if (count > 0)
                    {
                        Undo.RegisterCompleteObjectUndo(obj, "Remove Missing Scripts");
                        GameObjectUtility.RemoveMonoBehavioursWithMissingScript(obj);
                        cleaned += count;
                    }
                }
            }

            // Remove empty game objects
            if (data.removeEmpty)
            {
                var allObjects = GameObject.FindObjectsOfType<GameObject>();
                foreach (var obj in allObjects)
                {
                    if (obj.transform.childCount == 0 && obj.GetComponents<Component>().Length == 1) // Only Transform
                    {
                        Undo.DestroyObjectImmediate(obj);
                        cleaned++;
                    }
                }
            }

            return Success($"Cleaned {cleaned} items from scene");
        }

        private static string Success(string message)
        {
            return $"{{\"success\":true,\"message\":\"{message}\"}}";
        }

        private static string Error(string message)
        {
            return $"{{\"success\":false,\"error\":\"{message}\"}}";
        }

        [Serializable]
        public class CommandData
        {
            public int index = -1;
            public string sceneName;
            public bool saveAll;
            public string tag;
            public string pattern;
            public string componentType;
            public bool removeMissingScripts;
            public bool removeEmpty;
        }
    }
}
