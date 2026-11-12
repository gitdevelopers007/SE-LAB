# Experiment 9 - Custom HTTP Server & Core Node.js Modules

## Objective
Create a custom server using Node.js built-in `http` module and explore the other essential modules of Node.js:
1. `http` - Custom server creation, handling HTTP requests, routing, status codes, headers.
2. `os` - Retrieving operating system architecture, memory, CPUs, uptime, hostname.
3. `path` - Cross-platform path handling, joining, resolving, parsing directory & file extensions.
4. `events` - Event-driven architecture using `EventEmitter`, listener registration, and emitting events.

---

## Files Included
1. `server.js` - Custom HTTP server providing web UI & REST endpoints.
2. `modulesDemo.js` - Standalone CLI console demonstration script.
3. `package.json` - Project metadata and npm scripts.

---

## How to Run in VS Code

### 1. Run the Console Demo Script
```bash
cd "Experiment 9 - Node JS Core Modules and Custom HTTP Server"
node modulesDemo.js
```
*Output prints all OS specs, Path operations, and Event outputs directly in your terminal.*

### 2. Run the Custom HTTP Web Server
```bash
node server.js
```
Open your browser and navigate to:
```
http://localhost:3009
```
- View real-time system stats via `os`
- Inspect path resolutions via `path`
- Interactively trigger events via `events` (`EventEmitter`) and see listener outputs live!

### Endpoints Available:
- `GET /` - Visual Interactive Dashboard
- `GET /api/os` - Returns OS details in JSON format
- `GET /api/path` - Returns path operations in JSON format
- `POST /api/events/trigger` - Emits custom event (`{ "type": "studentLogin", "payload": "Sai" }`)
- `GET /api/events/logs` - Retrieves history of emitted events
