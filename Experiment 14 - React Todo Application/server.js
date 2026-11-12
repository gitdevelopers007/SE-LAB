// Experiment 14 - Local Preview Server for React Todo Application
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3014;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };

    const contentType = mimeTypes[ext] || 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
    console.log(`Experiment 14 React Todo Application running at http://localhost:${PORT}/`);
    console.log(`- Fully functional with LocalStorage persistence & GitHub deployment guide`);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 14 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Copy and paste:

   cd "Experiment 14 - React Todo Application"
   node server.js

3. Open your browser at:
   http://localhost:3014
================================================================================
*/
