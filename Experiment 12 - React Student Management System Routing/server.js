// Experiment 12 - Lightweight Static Web Server for React Student Management System
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3012;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, 'index.html'); // SPA fallback
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.jsx': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };

    const contentType = mimeTypes[ext] || 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
    console.log(`Experiment 12 React Application running at http://localhost:${PORT}/`);
    console.log(`- Features: Registration, Login, Contact, About, Students pages + Client Routing`);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 12 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Copy and paste:

   cd "Experiment 12 - React Student Management System Routing"
   node server.js

3. Open your browser at:
   http://localhost:3012
================================================================================
*/
