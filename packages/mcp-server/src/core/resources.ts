import { FastMCP } from "fastmcp";
import axios from "axios";

const UNITY_BASE_URL = "http://localhost:8080";

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
            "Scene operations and management",
            "Console log monitoring",
            "Asset management",
            "Prefab creation"
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

  // Console logs resource
  server.addResourceTemplate({
    uriTemplate: "unity://console/logs",
    name: "Unity Console Logs",
    mimeType: "application/json",
    description: "Real-time console logs from Unity Editor for debugging",
    arguments: [],
    async load() {
      try {
        const response = await axios.get(`${UNITY_BASE_URL}/console/logs`, {
          timeout: 3000
        });
        return {
          text: JSON.stringify(response.data, null, 2)
        };
      } catch (error) {
        return {
          text: JSON.stringify({
            error: "Unity Editor not responding",
            message: "Ensure Unity Editor is running with MCP server installed"
          }, null, 2)
        };
      }
    }
  });

  // Scene hierarchy resource
  server.addResourceTemplate({
    uriTemplate: "unity://scene/hierarchy",
    name: "Scene Hierarchy",
    mimeType: "application/json",
    description: "Current Unity scene hierarchy with all GameObjects",
    arguments: [],
    async load() {
      try {
        const response = await axios.post(`${UNITY_BASE_URL}/scene/hierarchy`, {}, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        return {
          text: JSON.stringify(response.data, null, 2)
        };
      } catch (error) {
        return {
          text: JSON.stringify({
            error: "Unity Editor not responding",
            message: "Ensure Unity Editor is running with MCP server installed"
          }, null, 2)
        };
      }
    }
  });

  // Project assets resource
  server.addResourceTemplate({
    uriTemplate: "unity://project/assets",
    name: "Project Assets",
    mimeType: "application/json",
    description: "List of assets in the Unity project",
    arguments: [],
    async load() {
      try {
        const response = await axios.get(`${UNITY_BASE_URL}/project/assets`, {
          timeout: 5000
        });
        return {
          text: JSON.stringify(response.data, null, 2)
        };
      } catch (error) {
        return {
          text: JSON.stringify({
            error: "Unity Editor not responding",
            message: "Ensure Unity Editor is running with MCP server installed"
          }, null, 2)
        };
      }
    }
  });
}
