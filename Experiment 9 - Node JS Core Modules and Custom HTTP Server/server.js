const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

class ServerLogger extends EventEmitter {}
const logger = new ServerLogger();

// Event listener: runs whenever a request is received.
logger.on("requestReceived", requestUrl => {
    console.log(`[EVENT] Request received for ${requestUrl}`);
});

const server = http.createServer((request, response) => {
    logger.emit("requestReceived", request.url);

    const systemInformation = {
        platform: os.platform(),
        architecture: os.arch(),
        freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
        totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
        uptimeSeconds: Math.floor(os.uptime()),
        currentFilePath: path.resolve(__filename),
        fileName: path.basename(__filename),
        fileExtension: path.extname(__filename)
    };

    response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    });
    response.end(JSON.stringify(systemInformation, null, 2));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Custom Node.js server running at http://localhost:${PORT}`);
});

// Display a clear message if the port is already in use.
server.on("error", error => {
    console.error("Server error:", error.message);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 9 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Copy and paste:

   cd "Experiment 9 - Node JS Core Modules and Custom HTTP Server"
   node server.js

3. Open your browser at:
   http://localhost:3000
================================================================================
*/
