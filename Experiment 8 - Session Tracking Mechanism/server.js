// Experiment 8 - Node.js Server simulating exact Servlet behavior from the Lab Record
const http = require("http");
const url = require("url");

const PORT = 3008;

// In-memory sessions store
const sessions = new Map();

function parseCookies(req) {
    const list = {};
    const rc = req.headers.cookie;
    if (rc) {
        rc.split(";").forEach(cookie => {
            const parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURIComponent(parts.join("="));
        });
    }
    return list;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const cookies = parseCookies(req);

    // 1. Session tracking (HttpSession simulation)
    let sessionId = cookies["JSESSIONID"];
    if (!sessionId || !sessions.has(sessionId)) {
        sessionId = "SESS_" + Math.random().toString(36).substring(2, 10).toUpperCase();
        sessions.set(sessionId, []);
    }
    const history = sessions.get(sessionId);

    // 2. Cookie tracking
    const previousVisit = cookies["lastVisitTime"] || "First visit";
    const currentVisitTime = Date.now();

    // 3. Process ?item=Laptop or ?item=Headphones
    const item = parsedUrl.query.item;
    if (item && item.trim()) {
        history.push(`Purchased ${item.trim()} at ${new Date().toString()}`);
    }

    // Set cookies in response
    res.setHeader("Set-Cookie", [
        `JSESSIONID=${sessionId}; Path=/; HttpOnly`,
        `lastVisitTime=${currentVisitTime}; Max-Age=3600; Path=/; HttpOnly`
    ]);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // HTML Output exactly matching PDF Page 14
    let historyHtml = "";
    for (const record of history) {
        historyHtml += `<li>${record}</li>`;
    }

    const html = `<html>
<head><title>Session Tracking</title></head>
<body>
<h2>Session Tracking: Cookies and HttpSession</h2>
<p><b>Session ID:</b> ${sessionId}</p>
<p><b>Previous visit cookie:</b> ${previousVisit}</p>
<h3>Transaction History</h3>
<ul>${historyHtml}</ul>
<p><a href="?item=Laptop">Purchase Laptop</a></p>
<p><a href="?item=Headphones">Purchase Headphones</a></p>
</body>
</html>`;

    res.end(html);
});

server.listen(PORT, () => {
    console.log(`Session Tracker running at http://localhost:${PORT}`);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 8 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 8 - Session Tracking Mechanism"
   node server.js
3. Open browser: http://localhost:3008
================================================================================
*/
