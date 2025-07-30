const orderService = require("../services/orderService");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { items } = req.body;
      const order = await orderService.createOrder(items);
      res.status(201).json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  }

  async getOrder(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({
        status: "success",
        results: orders.length,
        data: { orders },
      });
    } catch (err) {
      next(err);
    }
  }

  async addItemToOrder(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const orderId = req.params.id;

      const order = await orderService.addItemToOrder(
        orderId,
        productId,
        quantity
      );
      res.json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  }

  async confirmOrder(req, res, next) {
    try {
      const order = await orderService.confirmOrder(req.params.id);
      res.json({
        status: "success",
        data: { order },
        message: "Order confirmed successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const order = await orderService.cancelOrder(req.params.id);
      res.json({
        status: "success",
        data: { order },
        message: "Order cancelled successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const result = await orderService.deleteOrder(req.params.id);
      res.json({
        status: "success",
        data: result,
        message: "Order deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
