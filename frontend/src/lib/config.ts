export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";
export const BASE_PATH = {
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
} as const;
