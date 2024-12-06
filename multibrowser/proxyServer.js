// proxyServer.js
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Correct way to import

const app = express();
const port = 5000;  // Proxy server will run on this port

// Serve static files (frontend assets) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Proxy requests to YouTube (use the actual YouTube URL)
app.use('/youtube', createProxyMiddleware({
  target: 'https://www.youtube.com',
  changeOrigin: true,
  pathRewrite: {
    '^/youtube': '', // removes the /youtube prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request for ${req.url}`);
  }
}));

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
