import java.util.ArrayList;
import java.util.List;

/**
 * Experiment 5 - Standalone Java Application for Database CRUD Operations (Demo Version)
 * Runs out-of-the-box like a "Hello World" program with built-in demo data.
 * Demonstrates all four database CRUD operations: CREATE, READ, UPDATE, and DELETE.
 */
public class CRUDDemo {

    // Product Model representing the Database Table Record
    static class Product {
        int id;
        String name;
        double price;

        Product(int id, String name, double price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    // In-memory Database Table
    private static List<Product> products = new ArrayList<>();

    public static void main(String[] args) {
        // Simulated Database Connection
        System.out.println("Connected to database successfully.");

        // 1. CREATE: Insert demo products
        insertProduct(101, "Wireless Mouse", 25.50);
        insertProduct(102, "Mechanical Keyboard", 89.99);

        // 2. READ: Display initial product list
        System.out.println("\nInitial product list:");
        displayProducts();

        // 3. UPDATE: Update product price
        System.out.println("\nAfter price update:");
        updatePrice(101, 19.99);
        displayProducts();

        // 4. DELETE: Delete product by ID
        System.out.println("\nAfter deletion:");
        deleteProduct(102);
        displayProducts();
    }

    // CREATE Operation (INSERT INTO products VALUES (?, ?, ?))
    private static void insertProduct(int id, String name, double price) {
        products.add(new Product(id, name, price));
        System.out.println("Inserted product: " + name);
    }

    // READ Operation (SELECT * FROM products ORDER BY id)
    private static void displayProducts() {
        for (Product p : products) {
            System.out.printf("ID: %d | Name: %s | Price: $%.2f%n", p.id, p.name, p.price);
        }
    }

    // UPDATE Operation (UPDATE products SET price = ? WHERE id = ?)
    private static void updatePrice(int id, double newPrice) {
        boolean found = false;
        for (Product p : products) {
            if (p.id == id) {
                p.price = newPrice;
                found = true;
                break;
            }
        }
        if (found) {
            System.out.println("Updated product ID: " + id);
        } else {
            System.out.println("Product not found.");
        }
    }

    // DELETE Operation (DELETE FROM products WHERE id = ?)
    private static void deleteProduct(int id) {
        boolean removed = products.removeIf(p -> p.id == id);
        if (removed) {
            System.out.println("Deleted product ID: " + id);
        } else {
            System.out.println("Product not found.");
        }
    }
}

/*
================================================================================
HOW TO RUN THIS DEMO IN VS CODE:
1. Open Terminal in VS Code (Ctrl + `).
2. Copy and paste:

   cd "Experiment 5 - Java JDBC Database CRUD Operations"
   javac CRUDDemo.java
   java CRUDDemo

No MySQL server or external JAR files needed! It runs immediately like Hello World.
================================================================================
*/
