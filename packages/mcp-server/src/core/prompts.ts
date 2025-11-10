import { FastMCP } from "fastmcp";

/**
 * Register all prompts with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerPrompts(server: FastMCP) {
  // Unity editor automation prompt
  server.addPrompt({
    name: "editor_automation",
    description: "Get help with Unity Editor automation tasks",
    arguments: [
      {
        name: "task",
        description: "The Unity Editor automation task you need help with",
        required: true
      }
    ],
    load: async (args: Record<string, unknown>) => {
      const task = args.task as string;
      return `I'll help you automate Unity Editor for: ${task}

Available Unity MCP capabilities:
- GameObject selection and manipulation
- Transform operations (position, rotation, scale)
- Batch operations and alignment tools
- Play mode testing automation
- Scene operations and hierarchy management

The Unity MCP server provides real-time editor control via HTTP on localhost:8080.

For Unity code generation and documentation, use the context7 MCP server.

What specific editor automation do you need?`;
    }
  });
}
