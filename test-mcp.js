#!/usr/bin/env node
import { spawn } from 'child_process';

// Test MCP server protocol communication
async function testMCPServer() {
  console.log('Starting MCP server test...\n');

  const serverProcess = spawn('node', ['packages/mcp-server/dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let responseBuffer = '';

  serverProcess.stdout.on('data', (data) => {
    responseBuffer += data.toString();

    // Try to parse complete JSON-RPC responses
    const lines = responseBuffer.split('\n');
    for (const line of lines) {
      if (line.trim() && line.includes('{')) {
        try {
          const response = JSON.parse(line);
          console.log('Response:', JSON.stringify(response, null, 2));
        } catch (e) {
          // Not a complete JSON yet
        }
      }
    }
  });

  serverProcess.stderr.on('data', (data) => {
    console.error('Server error:', data.toString());
  });

  // Send initialization request
  const initRequest = {
    jsonrpc: "2.0",
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    },
    id: 1
  };

  console.log('Sending initialize request...');
  serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');

  // Wait for initialization response
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send tools/list request
  const toolsRequest = {
    jsonrpc: "2.0",
    method: "tools/list",
    params: {},
    id: 2
  };

  console.log('\nSending tools/list request...');
  serverProcess.stdin.write(JSON.stringify(toolsRequest) + '\n');

  // Wait for response
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send resources/list request
  const resourcesRequest = {
    jsonrpc: "2.0",
    method: "resources/list",
    params: {},
    id: 3
  };

  console.log('\nSending resources/list request...');
  serverProcess.stdin.write(JSON.stringify(resourcesRequest) + '\n');

  // Wait for response
  await new Promise(resolve => setTimeout(resolve, 1000));

  serverProcess.kill();
  process.exit(0);
}

testMCPServer().catch(console.error);