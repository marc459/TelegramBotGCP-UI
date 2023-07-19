const http = require('http');
const httpProxy = require('http-proxy');
const WebSocket = require('ws');

// Replace 'YOUR_BACKEND_URL' with the actual WebSocket backend URL (e.g., wss://bot-service-36gz5wrlea-ue.a.run.app)
const BACKEND_URL = 'http://localhost:3000';

// Create a new WebSocket server to handle WebSocket connections from the frontend
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Establish a new WebSocket connection with the backend
  const backendSocket = new WebSocket(BACKEND_URL);

  // Forward messages from frontend to backend
  ws.on('message', (message) => {
    backendSocket.send(message);
  });

  // Forward messages from backend to frontend
  backendSocket.on('message', (message) => {
    ws.send(message);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    backendSocket.close();
  });
});

// Create a regular HTTP server to handle non-WebSocket requests (optional, if needed)
const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  // Use the 'upgrade' event to handle WebSocket handshake requests
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws, req);
    });
  } else {
    // Proxy non-WebSocket requests to the backend server
    proxy.web(req, res, { target: BACKEND_URL });
  }
});

// Start the HTTP server on the desired port
const PORT = 4000; // Replace with your desired port
server.listen(PORT, () => {
  console.log(`WebSocket proxy server listening on port ${PORT}`);
});