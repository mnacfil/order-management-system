const db = require("../config/db.js");
const AppError = require("../utils/errors/AppError.js");
const { v4: uuidv4 } = require("uuid");

class Order {
  static async create() {
    try {
      const orderNumber = `ORD-${uuidv4()}`;
      const [result] = await db.query(
        `INSERT INTO Orders (order_number, status, total_amount) VALUES (?, 'pending', 0.00)`,
        [orderNumber]
      );
      return await this.findById(result.insertId);
    } catch (err) {
      throw new AppError("Failed to create order", 500);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM Orders WHERE id = ?`, [id]);
      if (rows.length === 0) {
        throw new AppError("Order not found", 404);
      }
      return rows[0];
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Internal server error", 500);
    }
  }

  static async findAll() {
    try {
      const [rows] = await db.query(
        `SELECT o.*, 
                COUNT(oi.id) as item_count,
                GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, ')') SEPARATOR ', ') as items_summary
         FROM Orders o
         LEFT JOIN Order_Items oi ON o.id = oi.order_id
         LEFT JOIN Products p ON oi.product_id = p.id
         GROUP BY o.id
         ORDER BY o.created_at DESC`
      );
      return rows;
    } catch (err) {
      throw new AppError("Internal server error", 500);
    }
  }

  static async addItem(orderId, productId, quantity) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Get product details
      const [productRows] = await connection.query(
        `SELECT * FROM Products WHERE id = ?`,
        [productId]
      );

      if (productRows.length === 0) {
        throw new AppError("Product not found", 404);
      }

      const product = productRows[0];

      // Check stock availability
      if (product.stock_quantity < quantity) {
        throw new AppError(
          `Insufficient stock. Available: ${product.stock_quantity}`,
          400
        );
      }

      // Check if item already exists in order
      const [existingItems] = await connection.query(
        `SELECT * FROM Order_Items WHERE order_id = ? AND product_id = ?`,
        [orderId, productId]
      );

      if (existingItems.length > 0) {
        // Update existing item
        const newQuantity = existingItems[0].quantity + quantity;
        const newSubtotal = newQuantity * product.price;

        await connection.query(
          `UPDATE Order_Items SET quantity = ?, subtotal = ? WHERE order_id = ? AND product_id = ?`,
          [newQuantity, newSubtotal, orderId, productId]
        );
      } else {
        // Add new item
        const subtotal = quantity * product.price;
        await connection.query(
          `INSERT INTO Order_Items (order_id, product_id, quantity, unit_price, subtotal) 
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, productId, quantity, product.price, subtotal]
        );
      }

      // Update order total
      await this.updateOrderTotal(connection, orderId);

      await connection.commit();
      return await this.findById(orderId);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async updateOrderTotal(connection, orderId) {
    const [result] = await connection.query(
      `UPDATE Orders o 
       SET total_amount = (
         SELECT COALESCE(SUM(subtotal), 0) 
         FROM Order_Items 
         WHERE order_id = ?
       )
       WHERE id = ?`,
      [orderId, orderId]
    );
    return result;
  }

  static async confirmOrder(orderId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Get order items
      const [items] = await connection.query(
        `SELECT oi.*, p.stock_quantity, p.name 
         FROM Order_Items oi 
         JOIN Products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [orderId]
      );

      if (items.length === 0) {
        throw new AppError("Order has no items", 400);
      }

      // Check stock and update inventory
      for (const item of items) {
        if (item.stock_quantity < item.quantity) {
          throw new AppError(
            `Insufficient stock for ${item.name}. Available: ${item.stock_quantity}`,
            400
          );
        }

        // Update product stock
        await connection.query(
          `UPDATE Products SET stock_quantity = stock_quantity - ? WHERE id = ?`,
          [item.quantity, item.product_id]
        );

        // Log inventory change
        await connection.query(
          `INSERT INTO Inventory_Logs (product_id, change_type, quantity_change, reason, order_id) 
           VALUES (?, 'order_created', ?, ?, ?)`,
          [
            item.product_id,
            -item.quantity,
            `Order ${orderId} confirmed`,
            orderId,
          ]
        );
      }

      // Update order status
      await connection.query(
        `UPDATE Orders SET status = 'confirmed' WHERE id = ?`,
        [orderId]
      );

      await connection.commit();
      return await this.findById(orderId);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async cancelOrder(orderId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Get order details
      const order = await this.findById(orderId);
      if (order.status === "confirmed") {
        // Restore inventory if order was confirmed
        const [items] = await connection.query(
          `SELECT * FROM Order_Items WHERE order_id = ?`,
          [orderId]
        );

        for (const item of items) {
          // Restore product stock
          await connection.query(
            `UPDATE Products SET stock_quantity = stock_quantity + ? WHERE id = ?`,
            [item.quantity, item.product_id]
          );

          // Log inventory change
          await connection.query(
            `INSERT INTO Inventory_Logs (product_id, change_type, quantity_change, reason, order_id) 
             VALUES (?, 'order_cancelled', ?, ?, ?)`,
            [
              item.product_id,
              item.quantity,
              `Order ${orderId} cancelled`,
              orderId,
            ]
          );
        }
      }

      // Update order status
      await connection.query(
        `UPDATE Orders SET status = 'cancelled' WHERE id = ?`,
        [orderId]
      );

      await connection.commit();
      return await this.findById(orderId);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = Order;
