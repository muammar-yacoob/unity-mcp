using UnityEngine;
using UnityEditor;
using System;
using System.Linq;
using System.Collections.Generic;

namespace UnityMCP
{
    /// <summary>
    /// Handles Unity Editor manipulation commands from MCP
    /// Provides selection, transform, alignment, and batch operations
    /// </summary>
    public static class EditorCommandHandler
    {
        public static string HandleCommand(string path, string requestBody)
        {
            try
            {
                var data = JsonUtility.FromJson<CommandData>(requestBody);

                switch (path)
                {
                    case "/editor/select":
                        return SelectObjects(data);
                    case "/editor/transform":
                        return TransformObjects(data);
                    case "/editor/align":
                        return AlignObjects(data);
                    case "/editor/distribute":
                        return DistributeObjects(data);
                    case "/editor/duplicate":
                        return DuplicateObjects(data);
                    case "/editor/delete":
                        return DeleteObjects(data);
                    case "/editor/parent":
                        return ParentObjects(data);
                    case "/editor/component":
                        return ComponentOperation(data);
                    case "/editor/find":
                        return FindObjects(data);
                    default:
                        return Error("Unknown editor command");
                }
            }
            catch (Exception e)
            {
                return Error(e.Message);
            }
        }

        public static string SelectObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                GameObject[] objects = null;

                if (data.names != null && data.names.Length > 0)
                {
                    objects = data.names
                        .Select(name => GameObject.Find(name))
                        .Where(obj => obj != null)
                        .ToArray();
                }
                else if (!string.IsNullOrEmpty(data.tag))
                {
                    objects = GameObject.FindGameObjectsWithTag(data.tag);
                }
                else if (!string.IsNullOrEmpty(data.pattern))
                {
                    objects = Resources.FindObjectsOfTypeAll<GameObject>()
                        .Where(obj => obj.name.Contains(data.pattern))
                        .ToArray();
                }

                if (objects != null && objects.Length > 0)
                {
                    Selection.objects = objects;
                    if (data.frame) SceneView.FrameLastActiveSceneView();
                }
            };

            return Success($"Selected {data.names?.Length ?? 0} objects");
        }

        public static string TransformObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;
                if (objects.Length == 0) return;

                Undo.RecordObjects(objects.Select(o => o.transform).ToArray(), "Transform Objects");

                foreach (var obj in objects)
                {
                    if (data.position != null) obj.transform.position = new Vector3(data.position[0], data.position[1], data.position[2]);
                    if (data.rotation != null) obj.transform.eulerAngles = new Vector3(data.rotation[0], data.rotation[1], data.rotation[2]);
                    if (data.scale != null) obj.transform.localScale = new Vector3(data.scale[0], data.scale[1], data.scale[2]);

                    // Relative transforms
                    if (data.moveBy != null) obj.transform.position += new Vector3(data.moveBy[0], data.moveBy[1], data.moveBy[2]);
                    if (data.rotateBy != null) obj.transform.Rotate(data.rotateBy[0], data.rotateBy[1], data.rotateBy[2]);
                    if (data.scaleBy != null) obj.transform.localScale = Vector3.Scale(obj.transform.localScale, new Vector3(data.scaleBy[0], data.scaleBy[1], data.scaleBy[2]));
                }
            };

            return Success($"Transformed {Selection.gameObjects.Length} objects");
        }

        public static string AlignObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;
                if (objects.Length < 2) return;

                Undo.RecordObjects(objects.Select(o => o.transform).ToArray(), "Align Objects");

                var bounds = objects.Select(o => o.GetComponent<Renderer>()?.bounds ?? new Bounds(o.transform.position, Vector3.zero)).ToArray();

                switch (data.alignment)
                {
                    case "left":
                        float minX = bounds.Min(b => b.min.x);
                        for (int i = 0; i < objects.Length; i++)
                            objects[i].transform.position = new Vector3(minX + bounds[i].extents.x, objects[i].transform.position.y, objects[i].transform.position.z);
                        break;

                    case "right":
                        float maxX = bounds.Max(b => b.max.x);
                        for (int i = 0; i < objects.Length; i++)
                            objects[i].transform.position = new Vector3(maxX - bounds[i].extents.x, objects[i].transform.position.y, objects[i].transform.position.z);
                        break;

                    case "top":
                        float maxY = bounds.Max(b => b.max.y);
                        for (int i = 0; i < objects.Length; i++)
                            objects[i].transform.position = new Vector3(objects[i].transform.position.x, maxY - bounds[i].extents.y, objects[i].transform.position.z);
                        break;

                    case "bottom":
                        float minY = bounds.Min(b => b.min.y);
                        for (int i = 0; i < objects.Length; i++)
                            objects[i].transform.position = new Vector3(objects[i].transform.position.x, minY + bounds[i].extents.y, objects[i].transform.position.z);
                        break;

                    case "center-horizontal":
                        float avgX = bounds.Average(b => b.center.x);
                        foreach (var obj in objects)
                            obj.transform.position = new Vector3(avgX, obj.transform.position.y, obj.transform.position.z);
                        break;

                    case "center-vertical":
                        float avgY = bounds.Average(b => b.center.y);
                        foreach (var obj in objects)
                            obj.transform.position = new Vector3(obj.transform.position.x, avgY, obj.transform.position.z);
                        break;
                }
            };

            return Success($"Aligned {Selection.gameObjects.Length} objects to {data.alignment}");
        }

        public static string DistributeObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects.OrderBy(o => o.transform.position.x).ToArray();
                if (objects.Length < 3) return;

                Undo.RecordObjects(objects.Select(o => o.transform).ToArray(), "Distribute Objects");

                if (data.axis == "horizontal" || data.axis == "x")
                {
                    float minX = objects[0].transform.position.x;
                    float maxX = objects[objects.Length - 1].transform.position.x;
                    float spacing = (maxX - minX) / (objects.Length - 1);

                    for (int i = 1; i < objects.Length - 1; i++)
                    {
                        objects[i].transform.position = new Vector3(minX + spacing * i, objects[i].transform.position.y, objects[i].transform.position.z);
                    }
                }
                else if (data.axis == "vertical" || data.axis == "y")
                {
                    objects = objects.OrderBy(o => o.transform.position.y).ToArray();
                    float minY = objects[0].transform.position.y;
                    float maxY = objects[objects.Length - 1].transform.position.y;
                    float spacing = (maxY - minY) / (objects.Length - 1);

                    for (int i = 1; i < objects.Length - 1; i++)
                    {
                        objects[i].transform.position = new Vector3(objects[i].transform.position.x, minY + spacing * i, objects[i].transform.position.z);
                    }
                }
            };

            return Success($"Distributed {Selection.gameObjects.Length} objects along {data.axis}");
        }

        public static string DuplicateObjects(CommandData data)
        {
            GameObject[] duplicates = null;

            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;
                duplicates = new GameObject[objects.Length];

                for (int i = 0; i < objects.Length; i++)
                {
                    duplicates[i] = GameObject.Instantiate(objects[i]);
                    duplicates[i].name = objects[i].name + " (Copy)";
                    Undo.RegisterCreatedObjectUndo(duplicates[i], "Duplicate Objects");
                }

                Selection.objects = duplicates;
            };

            return Success($"Duplicated {Selection.gameObjects.Length} objects");
        }

        public static string DeleteObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;
                foreach (var obj in objects)
                {
                    Undo.DestroyObjectImmediate(obj);
                }
            };

            return Success($"Deleted {Selection.gameObjects.Length} objects");
        }

        public static string ParentObjects(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;
                GameObject parent = null;

                if (!string.IsNullOrEmpty(data.parentName))
                {
                    parent = GameObject.Find(data.parentName);
                    if (parent == null)
                    {
                        parent = new GameObject(data.parentName);
                        Undo.RegisterCreatedObjectUndo(parent, "Create Parent");
                    }
                }

                foreach (var obj in objects)
                {
                    Undo.SetTransformParent(obj.transform, parent?.transform, "Parent Objects");
                }
            };

            return Success($"Parented {Selection.gameObjects.Length} objects to {data.parentName ?? "root"}");
        }

        public static string ComponentOperation(CommandData data)
        {
            EditorApplication.delayCall += () =>
            {
                var objects = Selection.gameObjects;

                foreach (var obj in objects)
                {
                    if (data.operation == "add")
                    {
                        var componentType = Type.GetType(data.componentType);
                        if (componentType != null)
                        {
                            Undo.AddComponent(obj, componentType);
                        }
                    }
                    else if (data.operation == "remove")
                    {
                        var component = obj.GetComponent(data.componentType);
                        if (component != null)
                        {
                            Undo.DestroyObjectImmediate(component);
                        }
                    }
                }
            };

            return Success($"{data.operation} component {data.componentType} on {Selection.gameObjects.Length} objects");
        }

        public static string FindObjects(CommandData data)
        {
            GameObject[] found = null;

            if (!string.IsNullOrEmpty(data.type))
            {
                var componentType = Type.GetType(data.type);
                if (componentType != null)
                {
                    found = GameObject.FindObjectsOfType(componentType)
                        .Select(c => (c as Component)?.gameObject)
                        .Where(go => go != null)
                        .ToArray();
                }
            }
            else if (!string.IsNullOrEmpty(data.pattern))
            {
                found = Resources.FindObjectsOfTypeAll<GameObject>()
                    .Where(obj => obj.name.Contains(data.pattern) && obj.scene.IsValid())
                    .ToArray();
            }

            var names = found?.Select(o => o.name).ToArray() ?? new string[0];
            return $"{{\"success\":true,\"count\":{names.Length},\"objects\":[{string.Join(",", names.Select(n => $"\"{n}\""))}]}}";
        }

        public static string Success(string message)
        {
            return $"{{\"success\":true,\"message\":\"{message}\"}}";
        }

        public static string Error(string message)
        {
            return $"{{\"success\":false,\"error\":\"{message}\"}}";
        }

        [Serializable]
        public class CommandData
        {
            public string[] names;
            public string tag;
            public string pattern;
            public bool frame;
            public float[] position;
            public float[] rotation;
            public float[] scale;
            public float[] moveBy;
            public float[] rotateBy;
            public float[] scaleBy;
            public string alignment;
            public string axis;
            public string parentName;
            public string operation;
            public string componentType;
            public string type;
        }
    }
}
