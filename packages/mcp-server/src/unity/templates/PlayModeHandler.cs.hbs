using UnityEngine;
using UnityEditor;
using System;
using System.Collections;
using System.Collections.Generic;

namespace UnityMCP
{
    /// <summary>
    /// Handles Unity Play Mode testing and automation
    /// Enables automated testing workflows for game development
    /// </summary>
    public static class PlayModeHandler
    {
        private static float testStartTime;
        private static bool isTestRunning = false;
        private static List<string> testLog = new List<string>();

        public static string HandleCommand(string path, string requestBody)
        {
            try
            {
                var data = JsonUtility.FromJson<CommandData>(requestBody);

                switch (path)
                {
                    case "/playmode/enter":
                        return EnterPlayMode(data);
                    case "/playmode/exit":
                        return ExitPlayMode(data);
                    case "/playmode/status":
                        return GetPlayModeStatus();
                    case "/playmode/test":
                        return RunTest(data);
                    case "/playmode/pause":
                        return PausePlayMode();
                    case "/playmode/step":
                        return StepFrame();
                    case "/playmode/timescale":
                        return SetTimeScale(data);
                    case "/playmode/screenshot":
                        return CaptureScreenshot(data);
                    default:
                        return Error("Unknown playmode command");
                }
            }
            catch (Exception e)
            {
                return Error(e.Message);
            }
        }

        public static string EnterPlayMode(CommandData data)
        {
            if (EditorApplication.isPlaying)
            {
                return Error("Already in play mode");
            }

            EditorApplication.delayCall += () =>
            {
                testStartTime = Time.realtimeSinceStartup;
                testLog.Clear();
                EditorApplication.isPlaying = true;

                if (data.pauseOnEnter)
                {
                    EditorApplication.playModeStateChanged += PauseOnEnter;
                }

                LogTest("Entered play mode");
            };

            return Success("Entering play mode");
        }

        public static void PauseOnEnter(PlayModeStateChange state)
        {
            if (state == PlayModeStateChange.EnteredPlayMode)
            {
                EditorApplication.isPaused = true;
                EditorApplication.playModeStateChanged -= PauseOnEnter;
                LogTest("Paused on enter");
            }
        }

        public static string ExitPlayMode(CommandData data)
        {
            if (!EditorApplication.isPlaying)
            {
                return Error("Not in play mode");
            }

            EditorApplication.delayCall += () =>
            {
                EditorApplication.isPlaying = false;
                float duration = Time.realtimeSinceStartup - testStartTime;
                LogTest($"Exited play mode after {duration:F2}s");
            };

            return Success("Exiting play mode");
        }

        public static string GetPlayModeStatus()
        {
            var status = new
            {
                isPlaying = EditorApplication.isPlaying,
                isPaused = EditorApplication.isPaused,
                isCompiling = EditorApplication.isCompiling,
                timeSinceStartup = Time.realtimeSinceStartup - testStartTime,
                frameCount = Time.frameCount,
                timeScale = Time.timeScale,
                testLog = testLog.ToArray()
            };

            return JsonUtility.ToJson(status);
        }

        public static string RunTest(CommandData data)
        {
            if (!EditorApplication.isPlaying)
            {
                // Enter play mode first
                EditorApplication.delayCall += () =>
                {
                    testStartTime = Time.realtimeSinceStartup;
                    testLog.Clear();
                    isTestRunning = true;
                    EditorApplication.isPlaying = true;

                    EditorApplication.playModeStateChanged += (state) =>
                    {
                        if (state == PlayModeStateChange.EnteredPlayMode)
                        {
                            ExecuteTest(data);
                        }
                    };
                };

                return Success($"Starting test: {data.testName}");
            }
            else
            {
                EditorApplication.delayCall += () => ExecuteTest(data);
                return Success($"Executing test: {data.testName}");
            }
        }

        public static void ExecuteTest(CommandData data)
        {
            try
            {
                LogTest($"Test started: {data.testName}");

                // Find test GameObject if specified
                if (!string.IsNullOrEmpty(data.targetObject))
                {
                    var target = GameObject.Find(data.targetObject);
                    if (target != null)
                    {
                        LogTest($"Found target: {data.targetObject}");

                        // Perform test action
                        if (data.action == "move")
                        {
                            target.transform.position = new Vector3(data.x ?? 0, data.y ?? 0, data.z ?? 0);
                            LogTest($"Moved to ({data.x}, {data.y}, {data.z})");
                        }
                        else if (data.action == "destroy")
                        {
                            GameObject.Destroy(target);
                            LogTest($"Destroyed {data.targetObject}");
                        }
                        else if (data.action == "activate")
                        {
                            target.SetActive(data.value ?? true);
                            LogTest($"Set active: {data.value}");
                        }
                    }
                    else
                    {
                        LogTest($"ERROR: Target not found: {data.targetObject}");
                    }
                }

                // Wait for duration if specified
                if (data.duration > 0)
                {
                    LogTest($"Waiting for {data.duration}s");
                    EditorApplication.delayCall += () =>
                    {
                        System.Threading.Thread.Sleep((int)(data.duration * 1000));

                        if (data.exitAfter)
                        {
                            EditorApplication.isPlaying = false;
                            LogTest("Test complete, exiting play mode");
                        }
                    };
                }
                else if (data.exitAfter)
                {
                    EditorApplication.delayCall += () =>
                    {
                        EditorApplication.isPlaying = false;
                        LogTest("Test complete, exiting play mode");
                    };
                }
            }
            catch (Exception e)
            {
                LogTest($"ERROR: {e.Message}");
            }
        }

        public static string PausePlayMode()
        {
            EditorApplication.isPaused = !EditorApplication.isPaused;
            LogTest($"Pause: {EditorApplication.isPaused}");
            return Success($"Play mode paused: {EditorApplication.isPaused}");
        }

        public static string StepFrame()
        {
            if (!EditorApplication.isPlaying)
            {
                return Error("Not in play mode");
            }

            EditorApplication.Step();
            LogTest("Stepped one frame");
            return Success("Stepped one frame");
        }

        public static string SetTimeScale(CommandData data)
        {
            Time.timeScale = data.timeScale;
            LogTest($"Time scale set to {data.timeScale}");
            return Success($"Time scale: {data.timeScale}");
        }

        public static string CaptureScreenshot(CommandData data)
        {
            string path = data.screenshotPath ?? "Assets/Screenshots/test_screenshot.png";
            EditorApplication.delayCall += () =>
            {
                ScreenCapture.CaptureScreenshot(path);
                LogTest($"Screenshot saved: {path}");
            };

            return Success($"Capturing screenshot to {path}");
        }

        public static void LogTest(string message)
        {
            testLog.Add($"[{Time.realtimeSinceStartup - testStartTime:F2}s] {message}");
            Debug.Log($"[Unity MCP Test] {message}");
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
            public bool pauseOnEnter;
            public string testName;
            public string targetObject;
            public string action;
            public float? x;
            public float? y;
            public float? z;
            public bool? value;
            public float duration;
            public bool exitAfter;
            public float timeScale;
            public string screenshotPath;
        }
    }
}
