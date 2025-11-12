#!/usr/bin/env node

import WebSocket from 'ws';

console.log('Testing Unity MCP WebSocket connection...');
console.log('Attempting to connect to ws://localhost:8090');

const ws = new WebSocket('ws://localhost:8090');

ws.on('open', () => {
  console.log('✅ Connected to Unity WebSocket server!');
  
  // Send a test request - Log and create blue cube
  const code = `
UnityEngine.Debug.Log("Creating blue cube from MCP!");
var cube = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
cube.name = "MCP_BlueCube";
cube.transform.position = UnityEngine.Vector3.zero;
var renderer = cube.GetComponent<UnityEngine.Renderer>();
if (renderer != null) {
    renderer.material.color = UnityEngine.Color.blue;
}
UnityEngine.Debug.Log("Blue cube created successfully!");
  `.trim();
  
  const request = {
    jsonrpc: '2.0',
    id: 'test-' + Date.now(),
    method: 'execute_csharp',
    params: {
      code: code
    }
  };
  
  console.log('Sending test request:', JSON.stringify(request, null, 2));
  ws.send(JSON.stringify(request));
});

ws.on('message', (data) => {
  console.log('✅ Received response from Unity:');
  try {
    const response = JSON.parse(data.toString());
    console.log(JSON.stringify(response, null, 2));
  } catch (e) {
    console.log('Raw response:', data.toString());
  }
  ws.close();
  process.exit(0);
});

ws.on('error', (error) => {
  console.error('❌ WebSocket error:', error.message);
  console.error('\nTroubleshooting:');
  console.error('1. Is Unity Editor running?');
  console.error('2. Check Unity Console for: "[Unity MCP] WebSocket server started on port 8090"');
  console.error('3. If not, open Unity > Tools > Unity MCP > Control Panel');
  console.error('4. Make sure "Transport Type" is set to "websocket"');
  console.error('5. Click "Start Server" if it\'s not running');
  process.exit(1);
});

ws.on('close', () => {
  console.log('Connection closed');
});

setTimeout(() => {
  console.error('❌ Timeout: No response after 10 seconds');
  ws.close();
  process.exit(1);
}, 10000);
