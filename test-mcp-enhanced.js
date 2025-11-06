#!/usr/bin/env node
import { spawn } from 'child_process';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

// Enhanced MCP server protocol communication test
async function testMCPServer() {
  console.log('Starting Enhanced MCP server test...\n');

  const serverProcess = spawn('node', ['packages/mcp-server/dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let stdoutBuffer = '';
  let stderrBuffer = '';
  let responseCount = 0;

  // Capture stdout (where JSON-RPC responses should be)
  serverProcess.stdout.on('data', (data) => {
    const text = data.toString();
    stdoutBuffer += text;
    console.log('[STDOUT]:', text);

    // Try to parse JSON-RPC messages
    const lines = stdoutBuffer.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        try {
          const msg = JSON.parse(line);
          responseCount++;
          console.log(`\n[RESPONSE ${responseCount}]:`, JSON.stringify(msg, null, 2));

          // Check if it's an initialize response
          if (msg.id === 1 && msg.result) {
            console.log('✅ Server initialized successfully!');
            console.log('Capabilities:', msg.result.capabilities);
          }

          // Check if it's a tools list response
          if (msg.id === 2 && msg.result) {
            console.log(`✅ Found ${msg.result.tools?.length || 0} tools`);
            if (msg.result.tools?.length > 0) {
              console.log('First 5 tools:', msg.result.tools.slice(0, 5).map(t => t.name));
            }
          }
        } catch (e) {
          // Not valid JSON, continue
        }
      }
    }
    // Keep the last incomplete line
    stdoutBuffer = lines[lines.length - 1];
  });

  // Capture stderr (debug messages)
  serverProcess.stderr.on('data', (data) => {
    const text = data.toString();
    stderrBuffer += text;
    console.log('[STDERR]:', text.trim());
  });

  serverProcess.on('error', (error) => {
    console.error('[PROCESS ERROR]:', error);
  });

  serverProcess.on('close', (code) => {
    console.log(`[PROCESS CLOSED] with code ${code}`);
  });

  // Wait for server to initialize
  await new Promise(resolve => setTimeout(resolve, 500));

  // Send initialization request
  const initRequest = {
    jsonrpc: "2.0",
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      },
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    },
    id: 1
  };

  console.log('\n📤 Sending initialize request...');
  const initMsg = JSON.stringify(initRequest) + '\n';
  console.log('Request:', initMsg.trim());
  serverProcess.stdin.write(initMsg);

  // Wait for initialization response
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Only send tools/list if we got a response to init
  if (responseCount > 0) {
    // Send tools/list request
    const toolsRequest = {
      jsonrpc: "2.0",
      method: "tools/list",
      params: {},
      id: 2
    };

    console.log('\n📤 Sending tools/list request...');
    const toolsMsg = JSON.stringify(toolsRequest) + '\n';
    console.log('Request:', toolsMsg.trim());
    serverProcess.stdin.write(toolsMsg);

    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 2000));
  } else {
    console.log('\n❌ No response to initialization - server may not be responding to JSON-RPC');
  }

  console.log(`\n📊 Summary: Received ${responseCount} responses from server`);

  serverProcess.kill();
  process.exit(responseCount > 0 ? 0 : 1);
}

testMCPServer().catch(console.error);