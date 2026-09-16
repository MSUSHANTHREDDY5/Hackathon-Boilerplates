# Authorization & RBAC Server (Node.js + Express + Mongoose)

Backend API service for the reusable MERN Authorization & RBAC Boilerplate.

## Features

- **Generic Role Authorization Middleware**: `authorizeRoles(...allowedRoles)` protecting routes by user roles
- **Permission Authorization Middleware**: `authorizePermissions(...requiredPermissions)` protecting routes by user permissions
- **Mongoose User Model with RBAC**: Fields `role` (default: `"user"`) and `permissions` (array of string permission keys)
- **HttpOnly JWT Session Management**: Required fail-fast `JWT_SECRET`, configurable cookie security options (`COOKIE_SECURE`, `COOKIE_SAMESITE`)
- **Express Layered Architecture**: `Route → Controller → Service → Model`
- **1MB Request Body Limit**: Restricted payload size for security

## Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Server health status |
| `POST` | `/api/auth/register` | Public | Register new user (with role/permissions) |
| `POST` | `/api/auth/login` | Public | Authenticate user & set token cookie |
| `POST` | `/api/auth/logout` | Public/Private | Clear authentication cookie |
| `GET` | `/api/auth/me` | Private | Fetch current user identity, role & permissions |
| `GET` | `/api/authorization/public` | Public | Public authorization demo route |
| `GET` | `/api/authorization/authenticated` | Private | Requires valid JWT token |
| `GET` | `/api/authorization/role-protected` | Private (`admin`/`moderator`) | Requires authorized role |
| `GET` | `/api/authorization/permission-protected` | Private (`users.read`) | Requires specific permission |

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
