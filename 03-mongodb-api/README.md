# 03 - MERN MongoDB + API Boilerplate

A production-ready, modular, and reusable **MERN Stack MongoDB + Express API Boilerplate**.

This boilerplate establishes the standard layered architecture (`Route → Controller → Service → Model → Database`) for building clean RESTful APIs over MongoDB using Mongoose.

---

## 🏗️ Layered Architecture Pattern

```text
React Client (Vite)
       │
       ▼
Axios Service Layer
       │
       ▼
Express Route (`/api/items`)
       │
       ▼
Controller (Request validation & response formatting)
       │
       ▼
Service (Mongoose query execution & business logic)
       │
       ▼
Mongoose Model (`Item.js`)
       │
       ▼
MongoDB Database
```

---

## 🌐 Local MongoDB vs MongoDB Atlas (Hackathon Deployment)

This boilerplate is designed for zero-friction transition from local development to production/hackathon cloud databases.

```text
Development NOW:
Node/Express → Mongoose → Local MongoDB

Hackathon LATER:
Node/Express → Mongoose → MongoDB Atlas
```

### Configuration Switch

* **Local Development (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
  ```
* **Hackathon Atlas Deployment (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hackathon_db
  ```

> **IMPORTANT:** Changing between local MongoDB and MongoDB Atlas requires **ONLY** updating the `MONGODB_URI` value in `.env`.
>
> **Zero source code changes** are required in controllers, services, models, routes, or frontend components. Mongoose handles both connection formats automatically.
>
> ⚠️ **Security Warning:** Real MongoDB Atlas connection strings containing database credentials must **NEVER** be committed to Git.

---

## 📂 Directory Structure

```text
03-mongodb-api/
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

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
PORT=5003
MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
CLIENT_URL=http://localhost:5175
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5003/api
```

---

## 🚀 Setup & Running

### 1. Backend Setup
```bash
cd 03-mongodb-api/server
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd 03-mongodb-api/client
npm install
npm run dev
```

App runs at `http://localhost:5175`.

---

## 📡 API Endpoints

| Method | Endpoint | Status Codes | Description |
|---|---|---|---|
| `GET` | `/api/health` | `200` | Health check and database status |
| `POST` | `/api/items` | `201`, `400` | Create new item |
| `GET` | `/api/items` | `200` | Get all items |
| `GET` | `/api/items/:id` | `200`, `400`, `404` | Get item by ID |
| `PATCH` | `/api/items/:id` | `200`, `400`, `404` | Update item fields by ID |
| `DELETE` | `/api/items/:id` | `200`, `400`, `404` | Delete item by ID |

---

## 🔄 Reusing this Boilerplate for Hackathon Domains

The `Item` model (`server/src/models/Item.js`) is designed as a generic resource template. In a hackathon, replace `Item` with your target domain entity (e.g. `Donation`, `Student`, `Product`, `Application`, `Event`):

1. **Model**: Define your schema fields in `server/src/models/YourResource.js`.
2. **Service**: Implement CRUD queries in `server/src/services/yourResourceService.js`.
3. **Controller**: Wire request/response handling in `server/src/controllers/yourResourceController.js`.
4. **Routes**: Mount endpoints in `server/src/routes/yourResourceRoutes.js`.
