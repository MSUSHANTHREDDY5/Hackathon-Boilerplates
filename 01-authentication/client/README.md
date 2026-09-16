# Authentication Client (React + Vite)

Frontend application for the reusable MERN Authentication Boilerplate.

## Features

- **React + Vite** fast setup
- **AuthContext**: React context for authentication state (`user`, `loading`, `isAuthenticated`, `login`, `register`, `logout`, `refreshUser`)
- **HttpOnly Cookie Handling**: Configured Axios instance (`withCredentials: true`) to automatically handle authentication cookies without exposing tokens to JS
- **Protected Routes**: `<ProtectedRoute>` wrapper redirecting unauthenticated users to `/login`
- **Clean UI**: Ready-to-use login, registration, and dashboard pages

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will start at `http://localhost:5173`.
