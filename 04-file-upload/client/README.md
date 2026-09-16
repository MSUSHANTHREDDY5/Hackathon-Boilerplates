# File Upload Client (React + Vite)

Frontend application for the reusable MERN File Upload Boilerplate.

## Features

- **React + Vite** setup running on port `5176`
- **Axios Service**: Centralized API instance (`VITE_API_URL=http://localhost:5004/api`)
- **FormData Uploads**: Handles multipart form submissions automatically without manually overriding boundaries
- **Client-Side Pre-Validation**: Validates file size (max 5 MB) and MIME types (JPG, PNG, WEBP, PDF, TXT) before upload
- **File Repository Table**: Lists original filename, readable size formatting (`KB`/`MB`), type badge, upload date, Download button, and Delete button

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
