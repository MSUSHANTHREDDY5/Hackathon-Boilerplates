# 02 - MERN Authorization & RBAC Boilerplate

A production-ready, standalone, and reusable **MERN Stack Authorization & Role-Based Access Control (RBAC) Boilerplate**.

This module provides generic role-based and fine-grained permission-based authorization infrastructure without locking your hackathon project into hardcoded domain roles (e.g., Admin vs Student vs Institute).

---

## 🔒 Security Architecture & Public Registration Policy

* **Public Registration Defaults:**
  Public registration (`POST /api/auth/register`) strictly enforces safe defaults:
  * `role`: `"user"`
  * `permissions`: `[]`
  Any `role` or `permissions` submitted in `req.body` by unauthenticated clients is strictly stripped and ignored to prevent privilege escalation attacks.
* **Trusted Role Assignment:**
  Roles and permissions can only be assigned by trusted server-side code, administrative APIs protected by `authorizeRoles('admin')`, or database seeding scripts.
* **Development Seed Mechanism:**
  For local testing, run `npm run seed` inside `server/` to generate test accounts (`admin@example.com`, `moderator@example.com`, `reader@example.com`, `user@example.com`).

---

## 💡 Key Concepts: Authentication vs Authorization

* **Authentication ("Who are you?")**: Identifies the user via valid credentials and issues an HttpOnly JWT cookie.
* **Role Authorization ("What group do you belong to?")**: Restricts access based on user roles (e.g. `user`, `moderator`, `admin`).
* **Permission Authorization ("What actions can you perform?")**: Restricts access based on specific permission keys (e.g. `users.read`, `items.create`, `reports.view`).

---

## 🏗️ Architecture & Code Examples

### 1. Role-Based Authorization Middleware (`authorizeRoles`)

Routes pass allowed role names as arguments to `authorizeRoles`:

```javascript
const { protect } = require('./middleware/authMiddleware');
const { authorizeRoles } = require('./middleware/rbacMiddleware');

// Single role access
router.get('/admin-panel', protect, authorizeRoles('admin'), getAdminPanel);

// Multi-role access (admin OR moderator allowed)
router.get('/moderation-queue', protect, authorizeRoles('admin', 'moderator'), getQueue);
```

### 2. Permission-Based Authorization Middleware (`authorizePermissions`)

Routes specify exact permission keys required:

```javascript
const { protect } = require('./middleware/authMiddleware');
const { authorizePermissions } = require('./middleware/rbacMiddleware');

// Requires 'users.read' permission
router.get('/users', protect, authorizePermissions('users.read'), getUsers);

// Requires ALL listed permissions ('users.read' AND 'users.create')
router.post('/users', protect, authorizePermissions('users.read', 'users.create'), createUser);
```

---

## 📁 Directory Structure

```text
02-authorization-rbac/
├── client/
│   ├── src/
│   │   ├── components/ (Navbar.jsx, PermissionGuard.jsx, ProtectedRoute.jsx, RoleGuard.jsx)
│   │   ├── context/ (AuthContext.jsx)
│   │   ├── hooks/ (useAuth.js)
│   │   ├── pages/ (DashboardPage.jsx, LoginPage.jsx, RegisterPage.jsx)
│   │   ├── services/ (api.js, authService.js, rbacService.js)
│   │   ├── App.jsx, main.jsx, styles.css
│   ├── .env.example, .gitignore, index.html, package.json, vite.config.js, README.md
├── server/
│   ├── src/
│   │   ├── config/ (db.js)
│   │   ├── controllers/ (authController.js, rbacController.js)
│   │   ├── middleware/ (authMiddleware.js, errorHandler.js, rbacMiddleware.js)
│   │   ├── models/ (User.js)
│   │   ├── routes/ (authRoutes.js, healthRoutes.js, rbacRoutes.js)
│   │   ├── services/ (authService.js)
│   │   ├── utils/ (jwt.js, response.js, seed.js)
│   │   ├── app.js, server.js
│   ├── .env.example, .gitignore, package.json, README.md
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/hackathon_rbac_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
CLIENT_URL=http://localhost:5174
NODE_ENV=development
```

---

## 🚀 Setup & Running

### 1. Backend Setup
```bash
cd 02-authorization-rbac/server
npm install
npm run seed     # Populate development test accounts
npm run dev
```

### 2. Frontend Setup
```bash
cd 02-authorization-rbac/client
npm install
npm run dev
```

App runs at `http://localhost:5174`.

---

## 🧪 Testing Accounts (from `npm run seed`)

| Email | Password | Role | Permissions |
|---|---|---|---|
| `admin@example.com` | `password123` | `admin` | `["users.read", "users.create", "users.update", "reports.view"]` |
| `moderator@example.com` | `password123` | `moderator` | `["users.read", "reports.view"]` |
| `reader@example.com` | `password123` | `user` | `["users.read"]` |
| `user@example.com` | `password123` | `user` | `[]` |

---

## 📡 API Endpoints

| Method | Endpoint | Access | Authorization Middleware |
|---|---|---|---|
| `GET` | `/api/health` | Public | None |
| `POST` | `/api/auth/register` | Public | Forces `role: "user"`, `permissions: []` |
| `POST` | `/api/auth/login` | Public | None |
| `POST` | `/api/auth/logout` | Public/Private | None |
| `GET` | `/api/auth/me` | Private | `protect` |
| `GET` | `/api/authorization/public` | Public | None |
| `GET` | `/api/authorization/authenticated` | Private | `protect` |
| `GET` | `/api/authorization/role-protected` | Private | `protect`, `authorizeRoles('admin', 'moderator')` |
| `GET` | `/api/authorization/permission-protected` | Private | `protect`, `authorizePermissions('users.read')` |
