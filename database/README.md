# Database Setup Guide

This directory contains the database schema and seed data for the Order Management System.

## Files

- `schema.sql` - Database schema with all tables and indexes
- `seeds.sql` - Sample data for testing and development
- `README.md` - This file

## Quick Setup

### 1. Create Database

```bash
mysql -u your_username -p < schema.sql
```

### 2. Seed Sample Data (Optional)

```bash
mysql -u your_username -p order_management_system < seeds.sql
```

## Database Schema

### Tables

1. **Products** - Product catalog with inventory tracking
2. **Orders** - Order management with status tracking
3. **Order_Items** - Individual items in each order
4. **Inventory_Logs** - Audit trail for inventory changes

### Key Features

- **Foreign Key Constraints** - Data integrity
- **Indexes** - Optimized queries
- **Timestamps** - Audit trail
- **Status Tracking** - Order lifecycle management

## Sample Data

The `seeds.sql` file includes:

- 10 sample products (electronics)
- 3 sample orders with different statuses
- Sample order items and inventory logs

## Database Connection

Update the connection details in `backend/src/config/db.js`:

```javascript
const dbConfig = {
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "order_management_system",
};
```

## Reset Database

To reset the database with fresh data:

```bash
# Drop and recreate
mysql -u your_username -p -e "DROP DATABASE IF EXISTS order_management_system;"
mysql -u your_username -p < schema.sql
mysql -u your_username -p order_management_system < seeds.sql
```
