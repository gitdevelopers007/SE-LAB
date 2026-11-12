# Experiment 11 - Authorized REST API Endpoints using JWT (JSON Web Token)

## Objective
Enhance the Student REST API from Experiment 10 by introducing **JWT (JSON Web Token)** authorization. Clients must authenticate via `/api/auth/login` to obtain a signed JWT token, and attach it to subsequent requests via the `Authorization: Bearer <token>` header to access protected CRUD routes.

---

## Authentication & Authorization Flow

```
+------------+       1. POST /api/auth/login (username & password)       +-------------------+
|            | --------------------------------------------------------> |                   |
|   Client   | <-------------------------------------------------------- |   Express Server  |
| (Postman / |       2. Response: { "token": "eyJhbGci..." }             |   (JWT Issuer)    |
|  Browser)  |                                                           |                   |
|            |       3. GET /api/students + Header [Authorization: Bearer] |                   |
|            | --------------------------------------------------------> |                   |
|            | <-------------------------------------------------------- | 4. Verify & 200 OK|
+------------+       5. Response: Student Records                        +-------------------+
```

---

## How to Run in VS Code

1. Navigate to the experiment folder:
   ```bash
   cd "Experiment 11 - Express JWT Authentication"
   ```
2. Start the server (runs with pure Node.js fallback or express):
   ```bash
   node server.js
   ```
3. Open in browser:
   ```
   http://localhost:3011
   ```
   - Default login credentials:
     - **Username:** `admin`
     - **Password:** `password123`

---

## Postman Testing Instructions

1. Open Postman and click **Import**.
2. Select `postman_collection.json`.
3. Run **1. User Login (Obtain JWT)**.
   - The test script automatically stores `jwt_token` in the environment!
4. Run **2. Get Protected Profile** or **3. Get Students (Authorized)**.
   - Notice the `Authorization: Bearer {{jwt_token}}` header automatically included.
5. Run **5. Test Unauthorized Access (Missing Token)**.
   - Observe that the server strictly rejects the request with **HTTP 401 Unauthorized**!
