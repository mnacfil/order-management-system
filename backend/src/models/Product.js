const db = require("../config/db");
const AppError = require("../utils/errors/AppError");

class Product {
  static async create(productData) {
    try {
      const [result] = await db.query(
        `INSERT INTO Products (name, description, price, stock_quantity) 
         VALUES (?, ?, ?, ?)`,
        [
          productData.name,
          productData.description,
          productData.price,
          productData.stock_quantity,
        ]
      );
      return await this.findById(result.insertId);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new AppError("Product with this name already exists", 409);
      }
      throw new AppError("Internal server error", 500);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM Products WHERE id = ?`, [
        id,
      ]);
      if (rows.length === 0) {
        throw new AppError("Product not found", 404);
      }
      return rows[0];
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Internal server error", 500);
    }
  }

  static async findAll() {
    try {
      const [rows] = await db.query(`SELECT * FROM Products`);
      return rows;
    } catch (err) {
      throw new AppError("Internal server error", 500);
    }
  }

  static async update(id, productData) {
    try {
      const fields = [];
      const values = [];

      Object.entries(productData).forEach(([key, value]) => {
        fields.push(`${key} = ?`);
        values.push(value);
      });

      values.push(id);

      const query = `UPDATE Products SET ${fields.join(", ")} WHERE id = ?`;

      const [result] = await db.query(query, values);

      if (result.affectedRows === 0) {
        throw new AppError("Product not found", 404);
      }

      return await this.findById(id);
    } catch (err) {
      if (err instanceof AppError) throw err;
      if (err.code === "ER_DUP_ENTRY") {
        throw new AppError("Product with this name already exists", 409);
      }
      throw new AppError("Internal server error", 500);
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query(`DELETE FROM Products WHERE id = ?`, [
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new AppError("Product not found", 404);
      }
      return true;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Internal server error", 500);
    }
  }
}

module.exports = Product;
