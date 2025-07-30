import apiClient from "./api";
import type {
  Order,
  CreateOrderRequest,
  AddItemToOrderRequest,
} from "../types/Order";
import { BASE_PATH } from "../lib/config";
import type { ApiResponse } from "../types/global";

interface OrderApiResponse extends ApiResponse<{ order: Order }> {}
interface OrdersApiResponse extends ApiResponse<{ orders: Order[] }> {}

class OrderService {
  private readonly baseUrl = BASE_PATH.ORDERS;

  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await apiClient.get<OrdersApiResponse>(this.baseUrl);
      return response.data.data?.orders || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  }

  async getOrderById(id: number): Promise<Order> {
    try {
      const response = await apiClient.get<OrderApiResponse>(
        `${this.baseUrl}/${id}`
      );
      if (!response.data.data?.order) {
        throw new Error("Order not found");
      }
      return response.data.data.order;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw new Error("Failed to fetch order");
    }
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await apiClient.post<OrderApiResponse>(
        this.baseUrl,
        orderData
      );
      if (!response.data.data?.order) {
        throw new Error("Failed to create order");
      }
      return response.data.data.order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  }

  async addItemToOrder(
    orderId: number,
    itemData: AddItemToOrderRequest
  ): Promise<Order> {
    try {
      const response = await apiClient.post<OrderApiResponse>(
        `${this.baseUrl}/${orderId}/items`,
        itemData
      );
      if (!response.data.data?.order) {
        throw new Error("Failed to add item to order");
      }
      return response.data.data.order;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw new Error("Failed to add item to order");
    }
  }

  async confirmOrder(id: number): Promise<Order> {
    try {
      const response = await apiClient.patch<OrderApiResponse>(
        `${this.baseUrl}/${id}/confirm`
      );
      if (!response.data.data?.order) {
        throw new Error("Failed to confirm order");
      }
      return response.data.data.order;
    } catch (error) {
      console.error("Error confirming order:", error);
      throw new Error("Failed to confirm order");
    }
  }

  async cancelOrder(id: number): Promise<Order> {
    try {
      const response = await apiClient.patch<OrderApiResponse>(
        `${this.baseUrl}/${id}/cancel`
      );
      if (!response.data.data?.order) {
        throw new Error("Failed to cancel order");
      }
      return response.data.data.order;
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw new Error("Failed to cancel order");
    }
  }

  async deleteOrder(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Failed to delete order");
    }
  }
}

export default new OrderService();
