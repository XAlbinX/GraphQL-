const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/graphql', createProxyMiddleware({
    target: 'https://barcelona-urban-mobility-graphql-api.netlify.app',
    changeOrigin: true
  }));

app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));

// API routes and other server code here...

// Serve the React app for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});