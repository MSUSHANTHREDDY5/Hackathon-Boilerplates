# File Upload Server (Node.js + Express + Multer + Mongoose)

Backend API service for the reusable MERN File Upload Boilerplate.

## Architecture & Flow

```text
Express Route → Multer DiskStorage → Controller → FileService → Mongoose Model → Disk / MongoDB
```

* **Local Disk Storage**: Uploaded files stored in `server/uploads/` with unique collision-resistant names.
* **MongoDB Metadata**: File documents record `originalName`, `storedName`, `mimeType`, `size`, and `path`.
* **Orphan File Cleanup**: If database metadata creation fails after disk upload, the physical disk file is automatically deleted to prevent orphaned files.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check status |
| `POST` | `/api/files` | Upload file (`multipart/form-data`, field: `file`) |
| `GET` | `/api/files` | List all file metadata |
| `GET` | `/api/files/:id` | Get single file metadata by ID |
| `GET` | `/api/files/:id/download` | Download physical file |
| `DELETE` | `/api/files/:id` | Delete metadata record and physical file |

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
