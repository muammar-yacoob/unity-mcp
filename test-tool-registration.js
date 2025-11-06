#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { z } from "zod";

// Test server to debug tool registration
const server = new FastMCP({
  name: "Test Server",
  version: "1.0.0",
});

console.error("Creating server...");

// Add a test tool
server.addTool({
  name: "test_tool",
  description: "A test tool",
  parameters: z.object({
    message: z.string().optional(),
  }),
  execute: async (args) => {
    return `Test executed: ${args.message || 'no message'}`;
  },
});

console.error("Added test tool");

// Start the server
server.start({
  transportType: "stdio",
});

console.error("Server started");