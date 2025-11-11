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
        /// Automatically switches to Unity's main thread using UniTask if needed
        /// </summary>
        public static ExecutionResult ExecuteWithResult(string code)
        {
            // Use UniTask to safely execute on main thread
            // This is synchronous but ensures main thread execution
            try
            {
                return ExecuteWithResultAsync(code).GetAwaiter().GetResult();
            }
            catch (Exception e)
            {
                return new ExecutionResult
                {
                    Success = false,
                    Error = $"Failed to execute C# code: {e.Message}",
                    Logs = new System.Collections.Generic.List<string>(),
                    Warnings = new System.Collections.Generic.List<string>(),
                    Errors = new System.Collections.Generic.List<string> { e.Message }
                };
            }
        }

        /// <summary>
        /// Async execution with automatic main thread switching via UniTask
        /// </summary>
        private static async UniTask<ExecutionResult> ExecuteWithResultAsync(string code)
        {
            // Switch to Unity's main thread (PlayerLoop timing)
            await UniTask.SwitchToMainThread();

            return ExecuteWithResultInternal(code);
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
