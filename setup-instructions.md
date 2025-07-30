# Setup Instructions

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Step 1: Database Setup

1. **Create MySQL database**

   ```sql
   CREATE DATABASE order_management_system;
   ```

2. **Run database schema**

   ```bash
   cd database
   mysql -u your_username -p order_management_system < schema.sql
   ```

3. **Seed initial data (optional)**
   ```bash
   mysql -u your_username -p order_management_system < seeds.sql
   ```

## Step 2: Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure database connection**

   - Create `.env` file
   - Please see the Environment Variables section below.
   - The credential will be used to connect to mysql server.

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4000`

## Step 3: Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Step 4: Verify Installation

1. **Backend API** - Visit `http://localhost:4000/api/products`
2. **Frontend App** - Visit `http://localhost:5173`

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check database credentials in `backend/src/config/db.js`
- Ensure database exists: `SHOW DATABASES;`

### Port Conflicts

- Backend port 4000 in use: Change in `backend/src/app.js`
- Frontend port 5173 in use: Vite will automatically use next available port

### Dependencies Issues

- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

## Development Commands

### Backend

```bash
cd backend
npm run dev        # Start with nodemon
```

### Frontend

```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Environment Variables

Create `.env` files if needed:

**Backend** (`backend/.env`):

```
DB_HOST=
DB_USER=rot
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=4000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):

```
VITE_API_URL=http://localhost:4000
```
