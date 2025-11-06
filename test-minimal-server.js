#!/usr/bin/env node
import { FastMCP } from "fastmcp";

// Minimal test server
const server = new FastMCP({
  name: "Test Server",
  version: "1.0.0",
});

// Add a simple tool
server.addTool({
  name: "test_tool",
  description: "A simple test tool",
  parameters: {},
  execute: async () => {
    return "Test tool executed!";
  },
});

console.error("Starting minimal test server...");

// Start the server
server.start({
  transportType: "stdio",
});

console.error("Server started with stdio transport");