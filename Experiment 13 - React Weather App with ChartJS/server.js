// Experiment 13 - Local Preview Server for React Weather Service
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3013;

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
    console.log(`Experiment 13 React Weather App running at http://localhost:${PORT}/`);
    console.log(`- Service layer fetches live meteorological data and renders with Chart.js`);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 13 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Copy and paste:

   cd "Experiment 13 - React Weather App with ChartJS"
   node server.js

3. Open your browser at:
   http://localhost:3013
================================================================================
*/
