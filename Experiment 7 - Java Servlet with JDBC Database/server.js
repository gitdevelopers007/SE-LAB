// Experiment 7 - Runner simulating ShoppingControllerServlet in VS Code
const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const PORT = 3007;

// Simulated shopdb products table matching Lab Record Page 12 & 34
let products = [
    { id: 101, name: "Wireless Mouse", price: 19.99 }
];

const server = http.createServer((req, res) => {
    const url = req.url.split("?")[0];

    // GET / -> serves the HTML form to add products
    if (req.method === "GET" && (url === "/" || url === "/index.html")) {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
        return;
    }

    // GET /ShoppingController -> displays the product catalog table (matches PDF Page 12)
    if (req.method === "GET" && url === "/ShoppingController") {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

        let rows = "";
        for (const p of products) {
            rows += `<tr><td>${p.id}</td><td>${p.name}</td><td>$${p.price.toFixed(2)}</td></tr>`;
        }

        const html = `<!DOCTYPE html><html><head><title>Product Catalog</title></head><body>
<h2>Product Catalog from Database</h2>
<table border='1' cellpadding='8'>
<tr><th>ID</th><th>Name</th><th>Price</th></tr>
${rows}
</table>
<p><a href="/index.html">+ Add Another Product</a></p>
</body></html>`;

        res.end(html);
        return;
    }

    // POST /ShoppingController -> receives product form, inserts, and redirects (matches PDF Page 13)
    if (req.method === "POST" && url === "/ShoppingController") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const formData = querystring.parse(body);
            const id = parseInt(formData.id);
            const name = formData.name;
            const price = parseFloat(formData.price);

            if (id && name && !isNaN(price)) {
                products.push({ id, name: name.trim(), price });
            }

            // HTTP 302 Redirect to /ShoppingController
            res.writeHead(302, { "Location": "/ShoppingController" });
            res.end();
        });
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
});

server.listen(PORT, () => {
    console.log(`ShoppingController Servlet running at http://localhost:${PORT}/ShoppingController`);
    console.log(`Add Product Form at http://localhost:${PORT}/`);
});

/*
================================================================================
HOW TO RUN EXPERIMENT 7 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 7 - Java Servlet with JDBC Database"
   node server.js
3. Open browser: http://localhost:3007/ShoppingController
================================================================================
*/
