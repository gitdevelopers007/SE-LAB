# Experiment 10 - Express REST API for Student CRUD Operations

## Objective
Develop an Express web application that exposes a RESTful API to perform **CRUD (Create, Read, Update, Delete)** operations on student data, testable via Postman and a built-in interactive web UI.

---

## REST Endpoints Overview

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Retrieve all student records | None |
| `GET` | `/api/students/:id` | Retrieve student by ID | None |
| `POST` | `/api/students` | Create new student record | JSON (`name`, `email`, `course`, `grade`, `gpa`) |
| `PUT` | `/api/students/:id` | Update existing student | JSON (fields to update) |
| `DELETE` | `/api/students/:id` | Delete student record | None |

---

## How to Run in VS Code

1. Navigate to the experiment directory:
   ```bash
   cd "Experiment 10 - Express REST API Student CRUD"
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   # or
   node server.js
   ```
4. Access the web interface in your browser:
   ```
   http://localhost:3010
   ```

---

## Testing with Postman

1. Open Postman.
2. Click **Import** (top left).
3. Select or drag-and-drop `postman_collection.json` located in this folder.
4. You will see 5 ready-to-use requests:
   - **1. Get All Students**: `GET http://localhost:3010/api/students`
   - **2. Get Student by ID**: `GET http://localhost:3010/api/students/1`
   - **3. Create Student**: `POST http://localhost:3010/api/students` with raw JSON payload
   - **4. Update Student**: `PUT http://localhost:3010/api/students/1`
   - **5. Delete Student**: `DELETE http://localhost:3010/api/students/2`
5. Click **Send** on each request to verify status code `200` / `201` and JSON responses!
