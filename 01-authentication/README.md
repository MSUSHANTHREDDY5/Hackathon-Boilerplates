# 01 - MERN Authentication Boilerplate

A production-ready, modular, and reusable **MERN Stack Authentication Boilerplate**.

This module provides complete user identity management (Registration, Login, Logout, JWT issuing, HttpOnly Cookie storage, Session Restoration, and Route Protection) without hardcoded role logic or problem-statement specific dependencies.

---

## 🏗️ Architecture & Design Pattern

The boilerplate follows a clean, decoupled layered architecture for both server and client:

### Backend Architecture
```text
Client Request
      │
      ▼
Routes (/api/auth/*)
      │
      ▼
Controllers (Request parsing & response shaping)
      │
      ▼
Services (Business logic & validations)
      │
      ▼
Models (Mongoose schemas & hooks)
      │
      ▼
MongoDB Database
```

### Frontend Architecture
```text
React Components (Pages / UI)
      │
      ▼
Custom Hooks (useAuth)
      │
      ▼
AuthContext (Session state & operations)
      │
      ▼
Axios Service (Centralized API client with credentials)
```

---

## 📁 Directory Structure

```text
01-authentication/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── healthRoutes.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   └── response.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🔒 JWT & Cookie Strategy

* **Required JWT Secret:** `JWT_SECRET` is strictly required. If missing or empty, the server fails fast with a configuration error. No fallback secret is used.
* **Token Transmission:** Authentication tokens are stored in `HttpOnly` cookies named `token`. This ensures client-side JavaScript (XSS attacks) cannot read the JWT secret or payload directly.
* **Configurable Cookie Security:**
  * `httpOnly: true` – Prevents client-side script access.
  * `secure`: Configured via `COOKIE_SECURE` (`true` | `false`). Defaults to `true` in production, `false` in development. Automatically forced to `true` if `sameSite: 'none'`.
  * `sameSite`: Configured via `COOKIE_SAMESITE` (`lax` | `strict` | `none`). Defaults to `lax`.
  * `maxAge: 7 days` – Configurable duration.
* **Request Limits:** Express JSON payload parser is restricted to `1mb` for authentication endpoints.
* **CORS Integration:** Configured with `credentials: true` on Express server and `withCredentials: true` on frontend Axios client.

---

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hackathon_auth_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Running

### 1. Backend Setup
```bash
cd 01-authentication/server

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Frontend Setup
```bash
cd 01-authentication/client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

---

## 📡 API Endpoints & Specification

### 1. Health Check
* **GET** `/api/health`
* **Response (200):**
```json
{
  "success": true,
  "message": "Server is healthy and running",
  "timestamp": "2026-09-16T08:00:00.000Z"
}
```

### 2. Register User
* **POST** `/api/auth/register`
* **Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```
* **Response (201 Created):** *(Sets HttpOnly Cookie)*
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "66e7f1...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "createdAt": "2026-09-16T08:00:00.000Z",
      "updatedAt": "2026-09-16T08:00:00.000Z"
    }
  }
}
```

### 3. Login User
* **POST** `/api/auth/login`
* **Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
* **Response (200 OK):** *(Sets HttpOnly Cookie)*
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "66e7f1...",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
}
```

### 4. Logout User
* **POST** `/api/auth/logout`
* **Response (200 OK):** *(Clears Cookie)*
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 5. Get Current User (`/me`)
* **GET** `/api/auth/me` *(Protected)*
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Authenticated user profile retrieved",
  "data": {
    "user": {
      "_id": "66e7f1...",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
}
```

### 6. Test Protected Route
* **GET** `/api/auth/protected` *(Protected)*
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "You are authenticated",
  "data": {
    "user": { ... }
  }
}
```

---

## 💡 How to Reuse in Another MERN Project

1. Copy `server/src/models/User.js`, `server/src/middleware/authMiddleware.js`, and `server/src/utils/jwt.js` to your new Express backend.
2. Set your environment variables in `.env` (`JWT_SECRET`, etc.).
3. Copy `client/src/context/AuthContext.jsx` and `client/src/components/ProtectedRoute.jsx` to your new React frontend.
4. Wrap your root App with `<AuthProvider>`.
5. Use `<ProtectedRoute>` for pages requiring authentication.

---

## ⚠️ Known Limitations & Future Extensions

- **Phase 1 Boundary:** This module answers *"Who is this user?"*. It intentionally contains no role-based authorization or access levels (Admin/Student/Manager). Role-Based Access Control will be added in **Phase 2 (`02-authorization-rbac/`)**.
- **Password Reset:** For hackathons, email sending / reset tokens can be added on top of `authService.js`.
