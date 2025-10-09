import { FastMCP } from "fastmcp";

/**
 * Register all resources with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerResources(server: FastMCP) {
  // Unity project info resource
  server.addResourceTemplate({
    uriTemplate: "unity://project/info",
    name: "Unity Project Information",
    mimeType: "application/json",
    description: "Information about the Unity MCP server and its capabilities",
    arguments: [],
    async load() {
      return {
        text: JSON.stringify({
          name: "Unity MCP Server",
          version: "0.2.0",
          description: "Model Context Protocol server for Unity Editor automation",
          features: [
            "Real-time Unity Editor control via HTTP",
            "GameObject selection and manipulation",
            "Transform operations (move, rotate, scale)",
            "Batch operations and alignment tools",
            "Automated play mode testing",
            "Scene operations and management"
          ],
          editorIntegration: {
            components: [
              "MCPEditorServer - HTTP server for receiving commands",
              "EditorCommandHandler - Command processing and execution",
              "PlayModeHandler - Play mode testing automation",
              "SceneHandler - Scene manipulation operations"
            ],
            defaultPort: 8080,
            autoStart: true
          },
          usage: "Combine with context7 MCP for Unity documentation and code generation"
        }, null, 2)
      };
    }
  });
}
