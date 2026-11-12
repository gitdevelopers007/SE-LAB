import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ShoppingController")
public class ShoppingControllerServlet extends HttpServlet {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/shopdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "your_password";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    // GET displays products stored in the database.
    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html><html><head><title>Product Catalog</title></head><body>");
            out.println("<h2>Product Catalog from Database</h2>");
            out.println("<table border='1' cellpadding='8'>");
            out.println("<tr><th>ID</th><th>Name</th><th>Price</th></tr>");
            String sql = "SELECT id, name, price FROM products ORDER BY id";
            try (Connection connection = getConnection();
                 PreparedStatement statement = connection.prepareStatement(sql);
                 ResultSet result = statement.executeQuery()) {
                while (result.next()) {
                    out.printf("<tr><td>%d</td><td>%s</td><td>$%.2f</td></tr>",
                        result.getInt("id"),
                        escapeHtml(result.getString("name")),
                        result.getDouble("price"));
                }
            } catch (SQLException exception) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.println("<tr><td colspan='3'>Database error.</td></tr>");
            }
            out.println("</table></body></html>");
        }
    }

    // POST receives a product form and inserts the record.
    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String name = request.getParameter("name");
        String idValue = request.getParameter("id");
        String priceValue = request.getParameter("price");

        if (name == null || name.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Product name is required.");
            return;
        }

        try {
            int id = Integer.parseInt(idValue);
            double price = Double.parseDouble(priceValue);
            if (price < 0) throw new NumberFormatException();

            String sql = "INSERT INTO products(id, name, price) VALUES (?, ?, ?)";
            try (Connection connection = getConnection();
                 PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, id);
                statement.setString(2, name.trim());
                statement.setDouble(3, price);
                statement.executeUpdate();
            }
            response.sendRedirect(request.getContextPath() + "/ShoppingController");
        } catch (NumberFormatException exception) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Enter a valid product ID and price.");
        } catch (SQLException exception) {
            throw new ServletException("Unable to save product.", exception);
        }
    }

    private String escapeHtml(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace("\"", "&quot;");
    }
}

/*
================================================================================
HOW TO RUN EXPERIMENT 7 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 7 - Java Servlet with JDBC Database"
   javac -cp ".;path\to\servlet-api.jar" ShoppingControllerServlet.java
================================================================================
*/
