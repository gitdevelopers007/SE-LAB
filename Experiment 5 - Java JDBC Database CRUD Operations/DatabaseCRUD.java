import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseCRUD {
    private static final String URL = "jdbc:mysql://localhost:3306/shopdb";
    private static final String USER = "root";
    private static final String PASSWORD = "your_password";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
            System.out.println("Connected to database successfully.");

            // CREATE
            insertProduct(connection, 101, "Wireless Mouse", 25.50);
            insertProduct(connection, 102, "Mechanical Keyboard", 89.99);

            // READ
            System.out.println("\nInitial product list:");
            displayProducts(connection);

            // UPDATE
            updatePrice(connection, 101, 19.99);
            System.out.println("\nAfter price update:");
            displayProducts(connection);

            // DELETE
            deleteProduct(connection, 102);
            System.out.println("\nAfter deletion:");
            displayProducts(connection);

        } catch (SQLException exception) {
            System.out.println("Database operation failed: " + exception.getMessage());
        }
    }

    private static void insertProduct(Connection connection, int id,
            String name, double price) throws SQLException {
        String sql = "INSERT INTO products(id, name, price) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.setString(2, name);
            statement.setDouble(3, price);
            statement.executeUpdate();
            System.out.println("Inserted product: " + name);
        }
    }

    private static void displayProducts(Connection connection) throws SQLException {
        String sql = "SELECT id, name, price FROM products ORDER BY id";
        try (Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery(sql)) {
            while (result.next()) {
                System.out.printf("ID: %d | Name: %s | Price: $%.2f%n",
                    result.getInt("id"),
                    result.getString("name"),
                    result.getDouble("price"));
            }
        }
    }

    private static void updatePrice(Connection connection, int id,
            double newPrice) throws SQLException {
        String sql = "UPDATE products SET price = ? WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setDouble(1, newPrice);
            statement.setInt(2, id);
            int rows = statement.executeUpdate();
            System.out.println(rows > 0 ? "Updated product ID: " + id : "Product not found.");
        }
    }

    private static void deleteProduct(Connection connection, int id) throws SQLException {
        String sql = "DELETE FROM products WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            int rows = statement.executeUpdate();
            System.out.println(rows > 0 ? "Deleted product ID: " + id : "Product not found.");
        }
    }
}

/*
================================================================================
HOW TO RUN EXPERIMENT 5 IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Run:
   cd "Experiment 5 - Java JDBC Database CRUD Operations"
   javac DatabaseCRUD.java
   java DatabaseCRUD
================================================================================
*/
