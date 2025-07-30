# Order Management System

A full-stack order management system with React frontend and Node.js backend.

## Quick Start

1. **Set up the database** - See `setup-instructions.md`
2. **Install dependencies** - Run `npm install` in both `backend/` and `frontend/` directories
3. **Start the backend** - `cd backend && npm start`
4. **Start the frontend** - `cd frontend && npm run dev`
5. **Access the app** - Open `http://localhost:5173`

## Project Structure

```
order-system/
├── backend/          # Node.js API server
├── frontend/         # React TypeScript app
├── database/         # Database schema and seeds
├── README.md         # This file
└── setup-instructions.md  # Detailed setup guide
```

## Features

- Product management (CRUD operations)
- Order management with status tracking
- Inventory management (not yet done)
- Order statistics and analytics
- Activity logging (not yet done)

## Tech Stack

**Backend**: Node.js, Express, MySQL, Zod
**Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI

For detailed setup instructions, see `setup-instructions.md`.
