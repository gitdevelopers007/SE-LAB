# Experiment 8 - Session Tracking Mechanism (Cookies & HTTP Session)

## Objective
Maintaining the transactional history of any user is critical in web applications (e-commerce carts, banking, multi-step registrations). This experiment explores and implements:
1. **Cookie-based Session Tracking** (Client-side)
2. **HTTP Session Tracking** (Server-side)

---

## Files Included
1. `index.html` - Interactive web application demonstrating both Cookie & HTTP Session transaction history.
2. `server.js` - Standalone Node.js HTTP server (zero external dependencies required).
3. `CookieSessionServlet.java` - Java Servlet implementation using `jakarta.servlet.http.Cookie`.
4. `HttpSessionServlet.java` - Java Servlet implementation using `jakarta.servlet.http.HttpSession`.
5. `package.json` - Node.js project manifest.

---

## How to Run in VS Code

### Option 1: Instant Run with Node.js (Zero installation required)
1. Open terminal in this folder:
   ```bash
   cd "Experiment 8 - Session Tracking Mechanism"
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3008
   ```

### Option 2: Static Preview
You can also right-click `index.html` in VS Code and select **Open with Live Server** or double click `index.html` to open in any web browser.

### Option 3: Java Servlet (Tomcat / Jakarta EE)
1. Compile servlets:
   ```bash
   javac -cp ".;servlet-api.jar" CookieSessionServlet.java HttpSessionServlet.java
   ```
2. Deploy to Apache Tomcat (`webapps/exp8/WEB-INF/classes`).
3. Access at `http://localhost:8080/exp8/cookieSession` or `http://localhost:8080/exp8/httpSession`.
