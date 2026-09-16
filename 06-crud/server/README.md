# 06 - CRUD Boilerplate (Backend Server)

Express.js REST API providing generic CRUD operations for MongoDB documents using Mongoose.

## 🚀 Features

- **Standard REST Endpoints**: `POST /api/items`, `GET /api/items`, `GET /api/items/:id`, `PATCH /api/items/:id`, `DELETE /api/items/:id`.
- **Layered Architecture**: Route -> Controller -> Service -> Model -> Database.
- **Fail-Fast Configuration**: Ensures `MONGODB_URI` is supplied before listening on PORT 5006.
- **Centralized Error & 404 Handlers**: Uniform JSON responses for validation, ObjectId parsing, and unexpected errors.
- **Protected Fields**: Automatic payload filtering prevents modifications to `_id`, `createdAt`, or `updatedAt`.

## ⚙️ Environment Configuration

Copy `.env.example` to `.env`:

```env
PORT=5006
MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
CLIENT_URL=http://localhost:5178
NODE_ENV=development
```

## 🌐 Local MongoDB vs MongoDB Atlas

- **Local MongoDB**: `MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db`
- **MongoDB Atlas**: `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hackathon_db`

No source code changes are required when switching databases.

## 📡 API Reference

- `GET /api/health` - Check health status
- `POST /api/items` - Create new item
- `GET /api/items` - Retrieve all items sorted newest first
- `GET /api/items/:id` - Retrieve single item by ID
- `PATCH /api/items/:id` - Update existing item
- `DELETE /api/items/:id` - Delete item by ID
