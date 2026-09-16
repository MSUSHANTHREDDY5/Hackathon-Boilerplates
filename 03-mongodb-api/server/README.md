# MongoDB + API Server (Node.js + Express + Mongoose)

Backend service for the reusable MERN MongoDB + API Boilerplate.

## Architecture

```text
Express Route → Controller → Service → Model → MongoDB
```

## Local vs Atlas MongoDB Configuration

This server handles both local MongoDB and MongoDB Atlas seamlessly via the `MONGODB_URI` environment variable.

- **Local Development**:
  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
  ```
- **Hackathon Atlas Deployment**:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hackathon_db
  ```

> **Zero Code Changes Required**: Mongoose automatically handles both connection string formats. Switching to Atlas requires changing ONLY `MONGODB_URI` in `.env`.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check status |
| `POST` | `/api/items` | Create new item |
| `GET` | `/api/items` | List all items |
| `GET` | `/api/items/:id` | Get single item by ID |
| `PATCH` | `/api/items/:id` | Update item by ID |
| `DELETE` | `/api/items/:id` | Delete item by ID |

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
