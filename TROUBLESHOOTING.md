# Unity Client SynchronizationContext Fix

## Problem
The Unity client shows this error when calling `ListToolsAsync`:
```
[GameSmith MCP] ListTools error: The current SynchronizationContext may not be used as a TaskScheduler.
[GameSmith MCP] Server initialized with 0 tools
```

**Root Cause**: The error occurs at `MCPClientAsync.cs:285` because the code is mixing `System.Threading.Tasks.Task` with Unity's `SynchronizationContext` incorrectly.

## Verified Working
The MCP server itself is **working correctly** - it has **33 tools** registered and responds properly to `tools/list` requests. The issue is purely in the Unity C# client threading code.

## Solution

The `ListToolsAsync` method in `MCPClientAsync.cs` needs to be updated to properly handle async operations in Unity.

### Current Problem Pattern (causes the error)
```csharp
// ❌ This causes SynchronizationContext errors in Unity
var task = _process.StandardOutput.ReadLineAsync();
await task.ConfigureAwait(false); // or await Task.Run(...)
```

### Correct Pattern for Unity
```csharp
// ✅ Option 1: Use UniTask extension
var line = await _process.StandardOutput.ReadLineAsync().AsUniTask();

// ✅ Option 2: Stay on Unity's main thread
var line = await _process.StandardOutput.ReadLineAsync();
// (without ConfigureAwait(false) or Task.Run)

// ✅ Option 3: If using Task.Run, use proper scheduling
await UniTask.SwitchToThreadPool();
var result = await DoWorkAsync();
await UniTask.SwitchToMainThread();
```

## Specific Fix for MCPClientAsync.cs

Find the `ListToolsAsync` method around line 285 and ensure:

1. **Remove `Task.Run()` or `.ConfigureAwait(false)`** from async IO operations
2. **Use `.AsUniTask()`** extension when awaiting `Task<T>` from .NET libraries
3. **Stay on the main thread** for Unity API calls

### Example Fix
```csharp
public async UniTask ListToolsAsync()
{
    try
    {
        var request = new
        {
            jsonrpc = "2.0",
            id = NextId++,
            method = "tools/list"
        };

        var json = JsonConvert.SerializeObject(request);
        await _process.StandardInput.WriteLineAsync(json); // Keep on main thread
        await _process.StandardInput.FlushAsync();

        // Use AsUniTask() to convert Task to UniTask
        var response = await _process.StandardOutput.ReadLineAsync().AsUniTask();

        // Parse and handle response
        var result = JsonConvert.DeserializeObject<ToolsListResponse>(response);

        Debug.Log($"[GameSmith MCP] Server initialized with {result.Result.Tools.Count} tools");
    }
    catch (Exception ex)
    {
        Debug.LogError($"[GameSmith MCP] ListTools error: {ex.Message}");
    }
}
```

## Key Points

1. **Unity's SynchronizationContext is not a TaskScheduler** - You cannot use it with `Task.Run()` or certain `.ContinueWith()` patterns
2. **UniTask is designed for Unity** - Use `.AsUniTask()` when converting from `System.Threading.Tasks.Task`
3. **Avoid thread pool operations** - Unless explicitly needed, stay on Unity's main thread
4. **Never use `.ConfigureAwait(false)`** in Unity - This can cause cross-thread Unity API calls which will fail

## Testing After Fix

After applying the fix, you should see:
```
[GameSmith MCP] Server initialized with 33 tools
[GameSmith] MCP server connected with 33 tools
```

Instead of:
```
[GameSmith MCP] Server initialized with 0 tools
[GameSmith] MCP server connected with 0 tools
```

## Available Tools (33 total)

Once fixed, the client will correctly detect all 33 tools:
- setup_unity_mcp
- unity_select_objects
- unity_transform_objects
- unity_align_objects
- unity_distribute_objects
- unity_duplicate_objects
- unity_delete_objects
- unity_find_objects
- unity_enter_play_mode
- unity_exit_play_mode
- unity_run_test
- unity_playmode_status
- unity_set_timescale
- unity_list_scenes
- unity_load_scene
- unity_save_scene
- unity_get_hierarchy
- unity_find_in_scene
- unity_cleanup_scene
- unity_get_console_logs
- unity_clear_console
- unity_create_prefab
- unity_get_assets
- unity_refresh_assets
- unity_execute_menu_item
- unity_add_package
- unity_run_tests
- unity_add_asset_to_scene
- unity_create_script
- unity_read_script
- unity_update_script
- unity_delete_script
- unity_validate_script

## References

- [UniTask Documentation](https://github.com/Cysharp/UniTask)
- [Unity Threading and TaskScheduler](https://docs.unity3d.com/Manual/JobSystemTroubleshooting.html)
- [Async/Await in Unity](https://blog.unity.com/technology/custom-coroutines-in-unity)
