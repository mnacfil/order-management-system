import { useState, useEffect } from "react";
import orderService from "../services/orderService";
import type { Order, CreateOrderRequest } from "../types/Order";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
    try {
      setError(null);
      const newOrder = await orderService.createOrder(orderData);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create order";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const confirmOrder = async (id: number): Promise<Order> => {
    try {
      setError(null);
      const updatedOrder = await orderService.confirmOrder(id);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to confirm order";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const cancelOrder = async (id: number): Promise<Order> => {
    try {
      setError(null);
      const updatedOrder = await orderService.cancelOrder(id);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to cancel order";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    confirmOrder,
    cancelOrder,
    fetchOrders,
    refetch: fetchOrders,
  };
};
