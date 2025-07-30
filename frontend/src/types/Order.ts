export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product_name?: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: "pending" | "confirmed" | "cancelled";
  total_amount: number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  item_count?: number;
  items_summary?: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface AddItemToOrderRequest {
  productId: number;
  quantity: number;
}
