import { useState } from "react";
import { useOrders } from "./useOrders";
import type { CreateOrderRequest } from "../types/Order";
import type { Product } from "../types/Product";
import { toast } from "sonner";

export const useOrdersController = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const {
    orders,
    loading,
    error,
    createOrder,
    fetchOrders,
    refetch,
    confirmOrder,
    cancelOrder,
  } = useOrders();

  const handleShowConfirmOrder = (id: number) => {
    setShowConfirmOrder(true);
    setOrderId(id);
  };

  const handleHideConfirmOrder = () => {
    setShowConfirmOrder(false);
    setOrderId(null);
  };

  const handleShowCancelOrder = (id: number) => {
    setShowCancelOrder(true);
    setOrderId(id);
  };

  const handleHideCancelOrder = () => {
    setShowCancelOrder(false);
    setOrderId(null);
  };

  const handleConfirmOrder = async (id: number) => {
    try {
      await confirmOrder(id);
      toast.success("Order confirmed successfully");
    } catch (error) {
      console.error("Failed to confirm order:", error);
      toast.error("Failed to confirm order");
    }
  };

  const handleCancelOrder = async (id: number) => {
    try {
      await cancelOrder(id);
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order");
    }
  };

  const handleOrder = (_product: Product) => {
    setShowOrderForm(true);
  };

  const handleOrderCancel = () => {
    setShowOrderForm(false);
  };

  const handleOrderSubmit = async (orderData: CreateOrderRequest) => {
    try {
      setOrderLoading(true);
      await createOrder(orderData);
      toast.success("Order created successfully");
      setShowOrderForm(false);
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to create order");
    } finally {
      setOrderLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    showOrderForm,
    orderLoading,
    showCancelOrder,
    showConfirmOrder,
    orderId,
    refetch,
    createOrder,
    handleOrder,
    fetchOrders,
    handleOrderSubmit,
    handleOrderCancel,
    handleConfirmOrder,
    handleCancelOrder,
    handleShowConfirmOrder,
    handleHideConfirmOrder,
    handleShowCancelOrder,
    handleHideCancelOrder,
    setOrderLoading,
    setShowOrderForm,
    setOrderId,
    setShowCancelOrder,
    setShowConfirmOrder,
  };
};
