const Order = require("../models/Order");
const { z } = require("zod");
const AppError = require("../utils/errors/AppError");

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.preprocess(
          (val) => Number(val),
          z.number().int().positive()
        ),
        quantity: z.preprocess(
          (val) => Number(val),
          z.number().int().positive()
        ),
      })
    )
    .optional()
    .default([]),
});

const addItemSchema = z.object({
  orderId: z.preprocess((val) => Number(val), z.number().int().positive()),
  productId: z.preprocess((val) => Number(val), z.number().int().positive()),
  quantity: z.preprocess((val) => Number(val), z.number().int().positive()),
});

const confirmOrderSchema = z.object({
  orderId: z.preprocess((val) => Number(val), z.number().int().positive()),
});

const cancelOrderSchema = z.object({
  orderId: z.preprocess((val) => Number(val), z.number().int().positive()),
});

class OrderService {
  async createOrder(items = []) {
    try {
      const validatedData = createOrderSchema.parse({ items });

      // Create the order
      const order = await Order.create();

      // Add items if provided
      for (const item of validatedData.items) {
        await Order.addItem(order.id, item.productId, item.quantity);
      }

      // Return the updated order with items
      return await Order.findById(order.id);
    } catch (err) {
      if (err instanceof AppError) throw err;
      if (err.name === "ZodError") {
        throw new AppError(`Validation error: ${err.message}`, 400);
      }
      throw new AppError("Failed to create order", 500);
    }
  }

  async getOrderById(orderId) {
    try {
      await this.validateOrderId(orderId);
      return await Order.findById(orderId);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to get order", 500);
    }
  }

  async getAllOrders() {
    try {
      return await Order.findAll();
    } catch (err) {
      throw new AppError("Failed to get orders", 500);
    }
  }

  async addItemToOrder(orderId, productId, quantity) {
    try {
      const validatedData = addItemSchema.parse({
        orderId,
        productId,
        quantity,
      });

      return await Order.addItem(
        validatedData.orderId,
        validatedData.productId,
        validatedData.quantity
      );
    } catch (err) {
      if (err instanceof AppError) throw err;
      if (err.name === "ZodError") {
        throw new AppError(`Validation error: ${err.message}`, 400);
      }
      throw new AppError("Failed to add item to order", 500);
    }
  }

  async confirmOrder(orderId) {
    try {
      const validatedData = confirmOrderSchema.parse({
        orderId,
      });

      return await Order.confirmOrder(validatedData.orderId);
    } catch (err) {
      if (err instanceof AppError) throw err;
      if (err.name === "ZodError") {
        throw new AppError(`Validation error: ${err.message}`, 400);
      }
      throw new AppError("Failed to confirm order", 500);
    }
  }

  async cancelOrder(orderId) {
    try {
      const validatedData = cancelOrderSchema.parse({
        orderId,
      });

      return await Order.cancelOrder(validatedData.orderId);
    } catch (err) {
      if (err instanceof AppError) throw err;
      if (err.name === "ZodError") {
        throw new AppError(`Validation error: ${err.message}`, 400);
      }
      throw new AppError("Failed to cancel order", 500);
    }
  }

  async validateOrderId(orderId) {
    try {
      z.preprocess((val) => Number(val), z.number().int().positive()).parse(
        orderId
      );
    } catch (err) {
      throw new AppError("Invalid order ID", 400);
    }
  }
}

module.exports = new OrderService();
