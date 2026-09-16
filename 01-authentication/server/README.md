# Authentication Server (Node.js + Express + Mongoose)

Backend API service for the reusable MERN Authentication Boilerplate.

## Features

- **JWT Authentication** stored in secure `HttpOnly` cookies
- **Password Hashing** via `bcryptjs`
- **Mongoose User Model** with email normalization and automatic password exclusions
- **Express Layered Architecture**: `Route → Controller → Service → Model`
- **Centralized Error Handling** for validation errors, duplicate keys, and JWT errors
- **Security Protections**: Helmet, CORS with credentials, request size limits

## Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Server health status |
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & set token cookie |
| `POST` | `/api/auth/logout` | Public/Private | Clear authentication cookie |
| `GET` | `/api/auth/me` | Private | Fetch current user details |
| `GET` | `/api/auth/protected` | Private | Test protected route verification |

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server with nodemon
npm run dev

# Start production server
npm start
```
