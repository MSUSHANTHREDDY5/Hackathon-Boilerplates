# Authorization & RBAC Client (React + Vite)

Frontend application for the reusable MERN Authorization & RBAC Boilerplate.

## Features

- **React + Vite** setup running on port `5174`
- **AuthContext**: React context providing `user`, `role`, `permissions`, `isAuthenticated`, `login`, `register`, `logout`
- **RoleGuard & PermissionGuard**: Client-side UI guard components for conditional rendering
- **HttpOnly Cookie Support**: Axios client (`withCredentials: true`) handling authentication session seamlessly
- **Interactive RBAC Demo**: Register users with different roles (`user`, `admin`, `moderator`) and permissions (`users.read`, `reports.view`), then test public, authenticated, role-protected, and permission-protected backend endpoints live.

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
