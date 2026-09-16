# 06 - CRUD Boilerplate (Frontend Client)

React + Vite frontend providing a user interface for generic item CRUD operations.

## 🚀 Features

- **Full Item Lifecycle**: Create, Read, Update, and Delete items.
- **Client-Side Pre-Validation**: Validates name field input before submitting API requests.
- **Service Abstraction**: All network requests pass through `src/services/itemService.js` backed by Axios (`src/services/api.js`).
- **Responsive Layout**: Clean grid layout with CSS cards, form inputs, status badges, and table layout.
- **States**: Handles loading, empty, error, and confirmation states cleanly.

## ⚙️ Setup

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5006/api
```

Run dev server:

```bash
npm install
npm run dev
```

App runs at `http://localhost:5178`.
