let express;
let useExpress = true;
try {
    express = require("express");
} catch (e) {
    useExpress = false;
}

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 4000;

let students = [
    { id: 1, name: "Aarav Sharma", branch: "CSE", cgpa: 8.9 },
    { id: 2, name: "Diya Reddy", branch: "ECE", cgpa: 9.2 }
];

if (useExpress) {
    const app = express();
    app.use(express.json());

    // CORS headers so Postman / Browser never block
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        if (req.method === "OPTIONS") return res.sendStatus(200);
        next();
    });

    // Serve public UI on root `/`
    app.use(express.static(path.join(__dirname, "public")));

    // GET: return every student.
    app.get("/students", (req, res) => {
        res.status(200).json(students);
    });

    // GET: return one student by ID.
    app.get("/students/:id", (req, res) => {
        const id = Number(req.params.id);
        const student = students.find(item => item.id === id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    });

    // POST: create a new student.
    app.post("/students", (req, res) => {
        const { name, branch, cgpa } = req.body;
        if (!name || !branch || typeof cgpa !== "number" || cgpa < 0 || cgpa > 10) {
            return res.status(400).json({
                message: "Provide name, branch and CGPA between 0 and 10."
            });
        }
        const nextId = students.length
            ? Math.max(...students.map(item => item.id)) + 1 : 1;
        const newStudent = { id: nextId, name, branch, cgpa };
        students.push(newStudent);
        res.status(201).json(newStudent);
    });

    // PUT: update an existing student.
    app.put("/students/:id", (req, res) => {
        const student = students.find(item => item.id === Number(req.params.id));
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const { name, branch, cgpa } = req.body;
        if (name !== undefined) student.name = name;
        if (branch !== undefined) student.branch = branch;
        if (cgpa !== undefined) {
            if (typeof cgpa !== "number" || cgpa < 0 || cgpa > 10) {
                return res.status(400).json({ message: "Invalid CGPA" });
            }
            student.cgpa = cgpa;
        }
        res.status(200).json(student);
    });

    // DELETE: remove a student.
    app.delete("/students/:id", (req, res) => {
        const index = students.findIndex(item => item.id === Number(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: "Student not found" });
        }
        const deleted = students.splice(index, 1)[0];
        res.status(200).json({ message: "Student deleted", student: deleted });
    });

    app.listen(PORT, () => {
        console.log(`Student REST API running at http://localhost:${PORT}`);
        console.log(`- Browser UI: http://localhost:${PORT}/`);
        console.log(`- API URL:    http://localhost:${PORT}/students`);
    });
} else {
    // Built-in HTTP server fallback when express is not installed
    const server = http.createServer((req, res) => {
        const parsed = url.parse(req.url, true);
        const pathname = parsed.pathname;

        // CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
            res.writeHead(200);
            res.end();
            return;
        }

        // Serve HTML UI on root `/` or `/index.html`
        if (pathname === "/" || pathname === "/index.html") {
            const htmlPath = path.join(__dirname, "public", "index.html");
            if (fs.existsSync(htmlPath)) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                fs.createReadStream(htmlPath).pipe(res);
                return;
            }
        }

        res.setHeader("Content-Type", "application/json; charset=utf-8");

        const matchId = pathname.match(/^\/students\/(\d+)$/);
        const id = matchId ? Number(matchId[1]) : null;

        // 1. GET ALL
        if (pathname === "/students" && req.method === "GET") {
            res.writeHead(200);
            res.end(JSON.stringify(students));
            return;
        }

        // 2. GET BY ID
        if (id !== null && req.method === "GET") {
            const student = students.find(s => s.id === id);
            if (!student) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "Student not found" }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(student));
            return;
        }

        // 3. POST (Create)
        if (pathname === "/students" && req.method === "POST") {
            let body = "";
            req.on("data", c => body += c);
            req.on("end", () => {
                try {
                    const { name, branch, cgpa } = JSON.parse(body || "{}");
                    if (!name || !branch || typeof cgpa !== "number" || cgpa < 0 || cgpa > 10) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ message: "Provide name, branch and CGPA between 0 and 10." }));
                        return;
                    }
                    const nextId = students.length ? Math.max(...students.map(i => i.id)) + 1 : 1;
                    const newStudent = { id: nextId, name, branch, cgpa: Number(cgpa) };
                    students.push(newStudent);
                    res.writeHead(201);
                    res.end(JSON.stringify(newStudent));
                } catch(e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: "Invalid JSON body" }));
                }
            });
            return;
        }

        // 4. PUT (Update)
        if (id !== null && req.method === "PUT") {
            let body = "";
            req.on("data", c => body += c);
            req.on("end", () => {
                try {
                    const student = students.find(s => s.id === id);
                    if (!student) {
                        res.writeHead(404);
                        res.end(JSON.stringify({ message: "Student not found" }));
                        return;
                    }
                    const data = JSON.parse(body || "{}");
                    if (data.name !== undefined) student.name = data.name;
                    if (data.branch !== undefined) student.branch = data.branch;
                    if (data.cgpa !== undefined) {
                        if (typeof data.cgpa !== "number" || data.cgpa < 0 || data.cgpa > 10) {
                            res.writeHead(400);
                            res.end(JSON.stringify({ message: "Invalid CGPA" }));
                            return;
                        }
                        student.cgpa = Number(data.cgpa);
                    }
                    res.writeHead(200);
                    res.end(JSON.stringify(student));
                } catch(e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: "Invalid JSON body" }));
                }
            });
            return;
        }

        // 5. DELETE
        if (id !== null && req.method === "DELETE") {
            const index = students.findIndex(s => s.id === id);
            if (index === -1) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "Student not found" }));
                return;
            }
            const deleted = students.splice(index, 1)[0];
            res.writeHead(200);
            res.end(JSON.stringify({ message: "Student deleted", student: deleted }));
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ message: "Not found", hint: "API endpoints are at /students" }));
    });

    server.listen(PORT, () => {
        console.log(`Student REST API running at http://localhost:${PORT}`);
        console.log(`- Browser UI: http://localhost:${PORT}/`);
        console.log(`- API URL:    http://localhost:${PORT}/students`);
    });
}
