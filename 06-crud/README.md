# 06 - MERN CRUD Boilerplate

A production-ready, modular, and reusable **MERN Stack CRUD Boilerplate** providing full Create, Read, Update, and Delete capabilities for MongoDB collections.

---

## 🎯 Purpose & Architecture

This boilerplate demonstrates the complete MERN data flow:

```text
React Component (`ItemsPage.jsx`)
       │
       ▼
Axios Service (`itemService.js` / `api.js`)
       │
       ▼
Express Route (`POST /api/items`)
       │
       ▼
Controller Layer (`itemController.js`)
       │
       ▼
Service Layer (`itemService.js`)
       │
       ▼
Mongoose Model (`Item.js`)
       │
       ▼
MongoDB Database
```

---

## 💻 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JavaScript (CommonJS)
- **Frontend**: React, Vite, Axios, JavaScript (ESM), CSS3
- **Security & Utilities**: Helmet, CORS, Dotenv

---

## 📁 Project Structure

```text
06-crud/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.jsx
│   │   │   └── ItemList.jsx
│   │   ├── pages/
│   │   │   └── ItemsPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── itemService.js
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
│   │   │   └── itemController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   ├── models/
│   │   │   └── Item.js
│   │   ├── routes/
│   │   │   ├── healthRoutes.js
│   │   │   └── itemRoutes.js
│   │   ├── services/
│   │   │   └── itemService.js
│   │   ├── utils/
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

## 🌐 Database Configuration (Local MongoDB vs Atlas)

This boilerplate uses local MongoDB for development and testing, while supporting MongoDB Atlas for production/hackathon deployments without changing code.

- **Local MongoDB (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
  ```

- **MongoDB Atlas (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hackathon_db
  ```

> **Note**: Only `MONGODB_URI` in `server/.env` changes. The backend code remains 100% identical.

---

## 🔑 Environment Variables

### Server (`server/.env`)
```env
PORT=5006
MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
CLIENT_URL=http://localhost:5178
NODE_ENV=development
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5006/api
```

---

## 🚀 Setup & Execution

### 1. Start Server
```bash
cd 06-crud/server
npm install
npm run dev
```
Server runs at `http://localhost:5006`.

### 2. Start Client
```bash
cd 06-crud/client
npm install
npm run dev
```
Client runs at `http://localhost:5178`.

---

## 📡 API Endpoints & Request Examples

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | API & Database health check | `200` |
| `POST` | `/api/items` | Create a new item | `201`, `400` |
| `GET` | `/api/items` | Retrieve all items (newest first) | `200` |
| `GET` | `/api/items/:id` | Retrieve single item by ID | `200`, `400`, `404` |
| `PATCH` | `/api/items/:id` | Update item by ID | `200`, `400`, `404` |
| `DELETE` | `/api/items/:id` | Delete item by ID | `200`, `400`, `404` |

### 1. Create Item
```bash
curl -X POST http://localhost:5006/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hackathon Project",
    "description": "Building full-stack MERN application",
    "status": "active"
  }'
```

### 2. Get All Items
```bash
curl -X GET http://localhost:5006/api/items
```

### 3. Update Item
```bash
curl -X PATCH http://localhost:5006/api/items/<ITEM_ID> \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive"
  }'
```

### 4. Delete Item
```bash
curl -X DELETE http://localhost:5006/api/items/<ITEM_ID>
```

---

## 🔄 How to Reuse & Adapt This Boilerplate

To convert `Item` into another entity (e.g., `Product`, `Task`, `Event`, `Project`):

1. **Rename Model**: Rename `server/src/models/Item.js` to `Product.js` and adjust schema fields (e.g., price, category).
2. **Rename Service & Controller**: Update service queries (`productService.js`) and controller routes (`productController.js`).
3. **Update Routes**: Change route paths in `app.js` to `/api/products`.
4. **Update Frontend Services & Components**: Update `productService.js`, `ProductForm.jsx`, `ProductList.jsx`, and `ProductsPage.jsx`.

---

## 🛠️ Troubleshooting

- **MongoDB Connection Failed**: Ensure local MongoDB daemon is running (`mongod` or `brew services start mongodb-community`).
- **CORS Blocked**: Confirm `CLIENT_URL` in `server/.env` matches frontend origin (`http://localhost:5178`).
- **PORT Conflict**: If port 5006 is occupied, update `PORT` in `server/.env` and `VITE_API_URL` in `client/.env`.
