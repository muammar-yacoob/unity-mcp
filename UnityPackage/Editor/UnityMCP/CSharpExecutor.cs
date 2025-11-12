using System;
using System.CodeDom.Compiler;
using System.Linq;
using Microsoft.CSharp;
using UnityEditor;
using UnityEngine;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;

namespace UnityMCP
{
    /// <summary>
    /// Executes arbitrary C# code in Unity Editor context
    /// This enables AI assistants to perform ANY Unity operation without predefined tools
    /// Threading pattern from CoplayDev/unity-mcp - uses EditorApplication.update for main thread dispatch
    /// </summary>
    public static class CSharpExecutor
    {
        private static readonly System.Collections.Concurrent.ConcurrentQueue<PendingExecution> executionQueue
            = new System.Collections.Concurrent.ConcurrentQueue<PendingExecution>();
        private static bool isProcessorRegistered = false;
        private static readonly object registrationLock = new object();
        private static int mainThreadId;

        private class PendingExecution
        {
            public string Code;
            public TaskCompletionSource<ExecutionResult> Tcs;
        }

        static CSharpExecutor()
        {
            // Capture main thread ID
            mainThreadId = System.Threading.Thread.CurrentThread.ManagedThreadId;
            UnityEngine.Debug.Log($"[CSharpExecutor] Static constructor - Main thread ID: {mainThreadId}");
            RegisterUpdateProcessor();
        }

        private static void RegisterUpdateProcessor()
        {
            lock (registrationLock)
            {
                if (!isProcessorRegistered)
                {
                    UnityEditor.EditorApplication.update += ProcessExecutionQueue;
                    isProcessorRegistered = true;
                    UnityEngine.Debug.Log("[CSharpExecutor] Registered EditorApplication.update callback");
                }
            }
        }

        private static void ProcessExecutionQueue()
        {
            // Process all pending executions on Unity's main thread
            int processedCount = 0;
            while (executionQueue.TryDequeue(out var pending))
            {
                processedCount++;
                UnityEngine.Debug.Log($"[CSharpExecutor] Processing execution #{processedCount}");
                try
                {
                    var result = ExecuteOnMainThread(pending.Code);
                    pending.Tcs.TrySetResult(result);
                    UnityEngine.Debug.Log($"[CSharpExecutor] Execution #{processedCount} completed successfully");
                }
                catch (Exception ex)
                {
                    UnityEngine.Debug.LogError($"[CSharpExecutor] Execution #{processedCount} failed: {ex.Message}");
                    var errorResult = new ExecutionResult
                    {
                        Success = false,
                        Error = $"Execution failed: {ex.Message}",
                        Logs = new System.Collections.Generic.List<string>(),
                        Warnings = new System.Collections.Generic.List<string>(),
                        Errors = new System.Collections.Generic.List<string> { ex.Message }
                    };
                    pending.Tcs.TrySetResult(errorResult);
                }
            }
        }
        /// <summary>
        /// Execute C# code with full access to UnityEngine and UnityEditor APIs
        /// </summary>
        /// <param name="code">The C# code to execute</param>
        /// <returns>Execution result or "Success" if void</returns>
        public static object ExecuteCode(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentException("Code cannot be empty");
            }

            // Wrap code in a static method
            string wrappedCode = $@"
                using UnityEngine;
                using UnityEditor;
                using System;
                using System.Linq;
                using System.Collections;
                using System.Collections.Generic;
                using UnityEngine.SceneManagement;
                using UnityEditor.SceneManagement;

                public class CodeExecutor
                {{
                    public static object Execute()
                    {{
                        {code}
                        return ""Success"";
                    }}
                }}
            ";

            var options = new CompilerParameters
            {
                GenerateInMemory = true,
                GenerateExecutable = false,
                IncludeDebugInformation = false
            };

            // Add necessary assembly references
            options.ReferencedAssemblies.Add(typeof(UnityEngine.Object).Assembly.Location); // UnityEngine
            options.ReferencedAssemblies.Add(typeof(UnityEditor.Editor).Assembly.Location); // UnityEditor
            options.ReferencedAssemblies.Add(typeof(System.Linq.Enumerable).Assembly.Location); // System.Core
            options.ReferencedAssemblies.Add(typeof(object).Assembly.Location); // mscorlib

            // Add netstandard reference (required for Unity 2022+)
            var netstandardAssembly = AppDomain.CurrentDomain.GetAssemblies()
                .FirstOrDefault(a => a.GetName().Name == "netstandard");
            if (netstandardAssembly != null)
            {
                options.ReferencedAssemblies.Add(netstandardAssembly.Location);
            }

            // Compile and execute
            using (var provider = new CSharpCodeProvider())
            {
                var results = provider.CompileAssemblyFromSource(options, wrappedCode);

                // Check for compilation errors
                if (results.Errors.HasErrors)
                {
                    var errors = string.Join("\n", results.Errors.Cast<CompilerError>()
                        .Select(e => $"Line {e.Line}: {e.ErrorText}"));
                    throw new Exception($"Compilation failed:\n{errors}");
                }

                // Execute the compiled code
                var assembly = results.CompiledAssembly;
                var type = assembly.GetType("CodeExecutor");
                var method = type.GetMethod("Execute");

                try
                {
                    return method.Invoke(null, null);
                }
                catch (Exception e)
                {
                    // Unwrap TargetInvocationException to get the real error
                    var innerException = e.InnerException ?? e;
                    throw new Exception($"Runtime error: {innerException.Message}\n{innerException.StackTrace}");
                }
            }
        }

        /// <summary>
        /// Execute code with comprehensive error handling and logging
        /// Automatically handles threading - safe to call from any thread
        /// Uses EditorApplication.update queue pattern from CoplayDev/unity-mcp
        /// </summary>
        public static ExecutionResult ExecuteWithResult(string code)
        {
            // Check if Unity is compiling
            if (UnityEditor.EditorApplication.isCompiling)
            {
                return new ExecutionResult
                {
                    Success = false,
                    Error = "Unity is compiling, please wait...",
                    Logs = new System.Collections.Generic.List<string>(),
                    Warnings = new System.Collections.Generic.List<string>(),
                    Errors = new System.Collections.Generic.List<string> { "Compilation in progress" }
                };
            }

            // If already on Unity's main thread, execute directly (avoid deadlock)
            var currentThreadId = System.Threading.Thread.CurrentThread.ManagedThreadId;
            UnityEngine.Debug.Log($"[CSharpExecutor] ExecuteWithResult called from thread {currentThreadId} (main={mainThreadId})");

            if (currentThreadId == mainThreadId)
            {
                UnityEngine.Debug.Log("[CSharpExecutor] Executing directly on main thread");
                return ExecuteOnMainThread(code);
            }

            // From background thread: Queue execution and wait for completion
            // Pattern from CoplayDev/unity-mcp - EditorApplication.update processes queue every frame
            UnityEngine.Debug.Log($"[CSharpExecutor] Background thread detected, queueing execution. Queue size before: {executionQueue.Count}");

            var tcs = new TaskCompletionSource<ExecutionResult>(
                TaskCreationOptions.RunContinuationsAsynchronously); // Prevent deadlocks

            executionQueue.Enqueue(new PendingExecution
            {
                Code = code,
                Tcs = tcs
            });

            UnityEngine.Debug.Log($"[CSharpExecutor] Enqueued execution. Queue size after: {executionQueue.Count}");
            UnityEngine.Debug.Log("[CSharpExecutor] Waiting for completion (30s timeout)...");

            // Block background thread waiting for completion with timeout
            if (tcs.Task.Wait(System.TimeSpan.FromSeconds(30)))
            {
                UnityEngine.Debug.Log("[CSharpExecutor] Execution completed within timeout");
                return tcs.Task.Result;
            }
            else
            {
                UnityEngine.Debug.LogError($"[CSharpExecutor] Execution timed out! Queue still has {executionQueue.Count} items");
                return new ExecutionResult
                {
                    Success = false,
                    Error = "Execution timed out after 30 seconds",
                    Logs = new System.Collections.Generic.List<string>(),
                    Warnings = new System.Collections.Generic.List<string>(),
                    Errors = new System.Collections.Generic.List<string> { "Timeout" }
                };
            }
        }

        /// <summary>
        /// Async version using UniTask for Unity editor operations
        /// Use this when you're already in an async context and want to leverage UniTask
        /// </summary>
        public static async UniTask<ExecutionResult> ExecuteAsync(string code)
        {
            // Check if Unity is compiling
            if (UnityEditor.EditorApplication.isCompiling)
            {
                return new ExecutionResult
                {
                    Success = false,
                    Error = "Unity is compiling, please wait...",
                    Logs = new System.Collections.Generic.List<string>(),
                    Warnings = new System.Collections.Generic.List<string>(),
                    Errors = new System.Collections.Generic.List<string> { "Compilation in progress" }
                };
            }

            // Switch to Unity's main thread using UniTask
            await UniTask.SwitchToMainThread();

            // Execute on main thread
            return ExecuteOnMainThread(code);
        }

        private static ExecutionResult ExecuteOnMainThread(string code)
        {
            var result = new ExecutionResult
            {
                Success = false,
                Logs = new System.Collections.Generic.List<string>(),
                Warnings = new System.Collections.Generic.List<string>(),
                Errors = new System.Collections.Generic.List<string>()
            };

            // Capture logs during execution
            Application.logMessageReceived += LogHandler;

            try
            {
                var startTime = System.DateTime.Now;
                result.Result = ExecuteCode(code);
                result.Success = true;
                result.ExecutionTime = (System.DateTime.Now - startTime).TotalMilliseconds;
            }
            catch (Exception e)
            {
                result.Success = false;
                result.Errors.Add(e.Message);
                result.Error = e.Message;
            }
            finally
            {
                Application.logMessageReceived -= LogHandler;
            }

            return result;

            void LogHandler(string message, string stackTrace, LogType type)
            {
                switch (type)
                {
                    case LogType.Log:
                        result.Logs.Add(message);
                        break;
                    case LogType.Warning:
                        result.Warnings.Add(message);
                        break;
                    case LogType.Error:
                    case LogType.Exception:
                        result.Errors.Add($"{message}\n{stackTrace}");
                        break;
                }
            }
        }
    }

    /// <summary>
    /// Result of C# code execution
    /// </summary>
    [System.Serializable]
    public class ExecutionResult
    {
        public bool Success;
        public object Result;
        public string Error;
        public System.Collections.Generic.List<string> Logs;
        public System.Collections.Generic.List<string> Warnings;
        public System.Collections.Generic.List<string> Errors;
        public double ExecutionTime; // milliseconds
    }
}
