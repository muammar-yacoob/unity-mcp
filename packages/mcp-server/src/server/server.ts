import { FastMCP } from "fastmcp";
import { registerResources } from "../core/resources.js";
import { registerTools } from "../core/tools.js";
import { registerPrompts } from "../core/prompts.js";

// Create and start the MCP server
async function startServer() {
  try {
    // Create a new FastMCP server instance
    const server = new FastMCP({
      name: "Unity MCP Server",
      version: "0.1.0"
    });

    // Register all resources, tools, and prompts
    registerResources(server);
    registerTools(server);
    registerPrompts(server);
    
    // Log server information
    console.error(`Unity MCP Server initialized`);
    console.error("Server is ready to automate Unity game development");
    console.error("");
    console.error("⚠️  IMPORTANT: Unity Editor must be running with MCP WebSocket server started");
    console.error("   Check Unity Console for: '[Unity MCP] WebSocket server started on port 8090'");
    console.error("   Or open: Unity > Tools > Unity MCP > Control Panel");
    console.error("");
    
    return server;
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

// Export the server creation function
export default startServer; 