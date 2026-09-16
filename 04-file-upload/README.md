# 04 - MERN File Upload Boilerplate

A production-ready, modular, and reusable **MERN Stack File Upload Boilerplate**.

This boilerplate demonstrates complete file management infrastructure: local disk storage using Multer, server-side MIME & size validation, MongoDB metadata tracking, orphan file cleanup, and browser file streaming/downloading.

---

## 🎯 Purpose & What This Boilerplate Teaches

1. **Multipart Data Flow**: How `FormData` is passed from React through Axios to Express and processed by Multer.
2. **Disk vs Database Separation**: Binary files are stored safely on the server's disk (`server/uploads/`) while metadata (`originalName`, `storedName`, `mimeType`, `size`, `path`) is indexed in MongoDB.
3. **Robust Backend Validation**: Enforcing 5 MB file size limits and MIME whitelisting (Images: JPG, PNG, WEBP; Documents: PDF, TXT) on the server.
4. **Orphan File Prevention**: Automatically deleting physical uploaded files if database metadata insertion fails.
5. **Physical File Streaming**: Securely serving files for browser download without exposing server absolute directory paths.

---

## 🏗️ Architecture & Upload Flow

```text
React Client (`FilesPage.jsx`)
       │
       ▼
Axios Request (`FormData` with `file` field)
       │
       ▼
Express Route (`POST /api/files`)
       │
       ▼
Multer Middleware (`uploadSingleFile`)
   ├── Validate MIME type (JPEG/PNG/WEBP/PDF/TXT)
   ├── Validate File Size (Max 5 MB)
   └── Save file to `server/uploads/` with unique collision-resistant filename
       │
       ▼
File Controller (`uploadFile`)
       │
       ▼
File Service (`saveFileMetadata`)
   └── Save metadata record in MongoDB (`File.js`)
   └── (If DB fails: Automatically delete physical disk file)
```

---

## 🌐 Local MongoDB vs MongoDB Atlas

This boilerplate uses local MongoDB for development and testing, while fully supporting cloud database deployment for hackathons.

* **Local Development (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
  ```
* **Hackathon Atlas Deployment (`server/.env`)**:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hackathon_db
  ```

> **Zero Source Code Changes Required**: Switching from local MongoDB to MongoDB Atlas requires **ONLY** changing `MONGODB_URI` in `server/.env`. No controllers, services, models, or routes require modification.

---

## ☁️ Future Cloud Storage Extension (Cloudinary / AWS S3)

For hackathon projects requiring cloud storage:
- Replace `Multer` diskStorage with `memoryStorage` or direct cloud SDK upload middleware (e.g., `cloudinary.uploader.upload_stream` or `@aws-sdk/client-s3`).
- Store the returned Cloud URL (e.g. `https://res.cloudinary.com/...`) in the `path` or `url` field of the MongoDB `File` model.

---

## 📁 Directory Structure

```text
04-file-upload/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileList.jsx
│   │   │   └── FileUploadForm.jsx
│   │   ├── pages/
│   │   │   └── FilesPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── fileService.js
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
│   ├── uploads/
│   │   └── .gitkeep
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── fileController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   └── File.js
│   │   ├── routes/
│   │   │   ├── fileRoutes.js
│   │   │   └── healthRoutes.js
│   │   ├── services/
│   │   │   └── fileService.js
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
PORT=5004
MONGODB_URI=mongodb://127.0.0.1:27017/hackathon_db
CLIENT_URL=http://localhost:5176
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5004/api
```

---

## 🚀 Setup & Running

### 1. Backend Setup
```bash
cd 04-file-upload/server
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd 04-file-upload/client
npm install
npm run dev
```

App runs at `http://localhost:5176`.

---

## 📡 API Endpoints

| Method | Endpoint | Status Codes | Description |
|---|---|---|---|
| `GET` | `/api/health` | `200` | Health check and database status |
| `POST` | `/api/files` | `201`, `400` | Upload file (`multipart/form-data`, field `file`) |
| `GET` | `/api/files` | `200` | Retrieve all file metadata |
| `GET` | `/api/files/:id` | `200`, `400`, `404` | Retrieve single file metadata by ID |
| `GET` | `/api/files/:id/download` | `200`, `400`, `404` | Stream physical file for browser download |
| `DELETE` | `/api/files/:id` | `200`, `400`, `404` | Delete database record and physical disk file |

---

## 🔒 Security Summary

* **No Path Traversal**: Random 16-byte hex prefixes are added to filenames. User-controlled directory paths are stripped.
* **Ignored Uploads**: `server/uploads/*` (except `.gitkeep`) is ignored in Git so uploaded files are never committed.
* **Clean Exception Handling**: If file upload succeeds on disk but MongoDB metadata creation fails, the physical file is unlinked immediately.
