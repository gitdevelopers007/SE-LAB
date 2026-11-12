let express, jwt;
let useModules = true;
try {
    express = require("express");
    jwt = require("jsonwebtoken");
} catch (e) {
    useModules = false;
}

const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || "change_this_lab_secret";

const students = [
    { id: 1, name: "Kiran Kumar", branch: "IT", cgpa: 8.7 }
];

if (useModules) {
    const app = express();
    const path = require("path");
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));

    // Login endpoint: verifies credentials and issues a signed token.
    app.post("/login", (req, res) => {
        const { username, password } = req.body;
        // Demonstration credentials only. Use a hashed-password database in production.
        if (username !== "admin" || password !== "admin123") {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { username, role: "admin" },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token, tokenType: "Bearer", expiresIn: "1h" });
    });

    // Middleware: verifies the Bearer token before protected routes run.
    function authenticateToken(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.startsWith("Bearer ")
            ? authorization.slice(7) : null;
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        jwt.verify(token, SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            req.user = user;
            next();
        });
    }

    // Protected endpoint: list students only for authenticated users.
    app.get("/students", authenticateToken, (req, res) => {
        res.status(200).json({
            accessedBy: req.user.username,
            data: students
        });
    });

    // Protected endpoint: add a student.
    app.post("/students", authenticateToken, (req, res) => {
        const { name, branch, cgpa } = req.body;
        if (!name || !branch || typeof cgpa !== "number") {
            return res.status(400).json({ message: "Invalid student data" });
        }
        const student = { id: Date.now(), name, branch, cgpa };
        students.push(student);
        res.status(201).json(student);
    });

    app.listen(PORT, () => {
        console.log(`JWT protected API running at http://localhost:${PORT}`);
    });
} else {
    // Pure Node.js fallback engine for lab machines without npm install
    const http = require("http");
    const url = require("url");
    const crypto = require("crypto");

    function makeToken(payload) {
        const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
        const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now()/1000) + 3600 })).toString("base64url");
        const sig = crypto.createHmac("sha256", SECRET_KEY).update(`${header}.${body}`).digest("base64url");
        return `${header}.${body}.${sig}`;
    }

    function verifyToken(token) {
        try {
            const [h, b, s] = token.split(".");
            const expectedSig = crypto.createHmac("sha256", SECRET_KEY).update(`${h}.${b}`).digest("base64url");
            if (s !== expectedSig) return null;
            return JSON.parse(Buffer.from(b, "base64url").toString());
        } catch(e) { return null; }
    }

    const server = http.createServer((req, res) => {
        const parsed = url.parse(req.url, true);
        const pathname = parsed.pathname;
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        if (pathname === "/login" && req.method === "POST") {
            let body = "";
            req.on("data", c => body += c);
            req.on("end", () => {
                const { username, password } = JSON.parse(body || "{}");
                if (username !== "admin" || password !== "admin123") {
                    res.writeHead(401);
                    res.end(JSON.stringify({ message: "Invalid credentials" }));
                    return;
                }
                const token = makeToken({ username, role: "admin" });
                res.writeHead(200);
                res.end(JSON.stringify({ token, tokenType: "Bearer", expiresIn: "1h" }));
            });
            return;
        }

        // Authenticate
        const authorization = req.headers.authorization;
        const token = authorization && authorization.startsWith("Bearer ") ? authorization.slice(7) : null;
        if (!token) {
            res.writeHead(401);
            res.end(JSON.stringify({ message: "Access token missing" }));
            return;
        }

        const user = verifyToken(token);
        if (!user) {
            res.writeHead(403);
            res.end(JSON.stringify({ message: "Invalid or expired token" }));
            return;
        }

        if (pathname === "/students" && req.method === "GET") {
            res.writeHead(200);
            res.end(JSON.stringify({ accessedBy: user.username, data: students }));
            return;
        }

        if (pathname === "/students" && req.method === "POST") {
            let body = "";
            req.on("data", c => body += c);
            req.on("end", () => {
                const { name, branch, cgpa } = JSON.parse(body || "{}");
                if (!name || !branch || typeof cgpa !== "number") {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: "Invalid student data" }));
                    return;
                }
                const student = { id: Date.now(), name, branch, cgpa };
                students.push(student);
                res.writeHead(201);
                res.end(JSON.stringify(student));
            });
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ message: "Not found" }));
    });

    server.listen(PORT, () => {
        console.log(`JWT protected API running at http://localhost:${PORT}`);
    });
}

/*
================================================================================
HOW TO RUN EXPERIMENT 11 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 11 - Express JWT Authentication"
   node jwtStudentServer.js

3. In Postman:
   - POST http://localhost:5000/login  (Body: {"username":"admin","password":"admin123"})
   - Copy the returned token
   - GET http://localhost:5000/students (Header: Authorization: Bearer <token>)
   - Try without token -> returns 401 Unauthorized {"message":"Access token missing"}
================================================================================
*/
