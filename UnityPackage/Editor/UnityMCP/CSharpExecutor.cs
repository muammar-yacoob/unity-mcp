using System;
using System.CodeDom.Compiler;
using System.Linq;
using Microsoft.CSharp;
using UnityEditor;
using UnityEngine;
using Cysharp.Threading.Tasks;

namespace UnityMCP
{
    /// <summary>
    /// Executes arbitrary C# code in Unity Editor context
    /// This enables AI assistants to perform ANY Unity operation without predefined tools
    /// Based on Arodoid's UnityMCP implementation
    /// </summary>
    public static class CSharpExecutor
    {
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
        /// Automatically marshals to Unity's main thread using UniTask
        /// </summary>
        public static async UniTask<ExecutionResult> ExecuteWithResultAsync(string code)
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

            // Switch to Unity's main thread
            await UniTask.SwitchToMainThread();

            // Execute on main thread with logging capture
            var result = new ExecutionResult
            {
                Success = false,
                Logs = new System.Collections.Generic.List<string>(),
                Warnings = new System.Collections.Generic.List<string>(),
                Errors = new System.Collections.Generic.List<string>()
            };

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

        /// <summary>
        /// Synchronous wrapper - only use from Unity's main thread
        /// For background threads, use ExecuteWithResultAsync
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

            // For main thread, execute directly
            if (System.Threading.Thread.CurrentThread.ManagedThreadId == 1)
            {
                return ExecuteWithResultInternal(code);
            }

            // For background threads: Use simple synchronization with AutoResetEvent
            // UniTask is designed for main-thread async, not cross-thread blocking
            ExecutionResult result = null;
            var completionEvent = new System.Threading.AutoResetEvent(false);

            // Queue work on Unity's main thread
            UnityEditor.EditorApplication.delayCall += () =>
            {
                try
                {
                    result = ExecuteWithResultInternal(code);
                }
                catch (System.Exception ex)
                {
                    result = new ExecutionResult
                    {
                        Success = false,
                        Error = $"Execution failed: {ex.Message}",
                        Logs = new System.Collections.Generic.List<string>(),
                        Warnings = new System.Collections.Generic.List<string>(),
                        Errors = new System.Collections.Generic.List<string> { ex.Message }
                    };
                }
                finally
                {
                    completionEvent.Set();
                }
            };

            // Wait for completion with timeout
            bool completed = completionEvent.WaitOne(System.TimeSpan.FromSeconds(30));

            if (!completed)
            {
                return new ExecutionResult
                {
                    Success = false,
                    Error = "Execution timed out after 30 seconds",
                    Logs = new System.Collections.Generic.List<string>(),
                    Warnings = new System.Collections.Generic.List<string>(),
                    Errors = new System.Collections.Generic.List<string> { "Timeout" }
                };
            }

            return result;
        }

        /// <summary>
        /// Internal synchronous execution - guaranteed to run on main thread
        /// </summary>
        private static ExecutionResult ExecuteWithResultInternal(string code)
        {
            var result = new ExecutionResult
            {
                Success = false,
                Logs = new System.Collections.Generic.List<string>(),
                Warnings = new System.Collections.Generic.List<string>(),
                Errors = new System.Collections.Generic.List<string>()
            };

            // Capture logs during execution (safe on main thread)
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
