import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/SessionTracker")
public class SessionTrackingServlet extends HttpServlet {
    @Override
    @SuppressWarnings("unchecked")
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        // Read the previous visit time from a browser cookie.
        String previousVisit = "First visit";
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("lastVisitTime".equals(cookie.getName())) {
                    previousVisit = cookie.getValue();
                    break;
                }
            }
        }

        // Store the current visit time in a cookie for one hour.
        Cookie visitCookie =
            new Cookie("lastVisitTime", String.valueOf(System.currentTimeMillis()));
        visitCookie.setMaxAge(60 * 60);
        visitCookie.setHttpOnly(true);
        visitCookie.setPath(request.getContextPath().isEmpty()
            ? "/" : request.getContextPath());
        response.addCookie(visitCookie);

        // Keep transaction history on the server in HttpSession.
        HttpSession session = request.getSession(true);
        List<String> history =
            (List<String>) session.getAttribute("transactionHistory");
        if (history == null) {
            history = new ArrayList<>();
        }

        String item = request.getParameter("item");
        if (item != null && !item.trim().isEmpty()) {
            history.add("Purchased " + item.trim() + " at " + new Date());
            session.setAttribute("transactionHistory", history);
        }

        try (PrintWriter out = response.getWriter()) {
            out.println("<html><head><title>Session Tracking</title></head><body>");
            out.println("<h2>Session Tracking: Cookies and HttpSession</h2>");
            out.println("<p><b>Session ID:</b> " + session.getId() + "</p>");
            out.println("<p><b>Previous visit cookie:</b> " + previousVisit + "</p>");
            out.println("<h3>Transaction History</h3><ul>");
            for (String record : history) {
                out.println("<li>" + record + "</li>");
            }
            out.println("</ul>");
            out.println("<p><a href='?item=Laptop'>Purchase Laptop</a></p>");
            out.println("<p><a href='?item=Headphones'>Purchase Headphones</a></p>");
            out.println("</body></html>");
        }
    }
}

/*
================================================================================
HOW TO RUN EXPERIMENT 8 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 8 - Session Tracking Mechanism"
   node server.js
3. Open browser: http://localhost:3000 (or http://localhost:3008)
================================================================================
*/
