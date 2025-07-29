import apiClient from "./api";
import type { Product } from "../types/Product";
import { BASE_PATH } from "../lib/config";
import type { ApiResponse } from "../types/global";

interface ProductApiResponse extends ApiResponse<{ product: Product }> {}
interface ProductsApiResponse extends ApiResponse<{ products: Product[] }> {}

class ProductService {
  private readonly baseUrl = BASE_PATH.PRODUCTS;

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<ProductsApiResponse>(this.baseUrl);
      return response.data.data?.products || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<ProductApiResponse>(
        `${this.baseUrl}/${id}`
      );
      if (!response.data.data?.product) {
        throw new Error("Product not found");
      }
      return response.data.data.product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Failed to fetch product");
    }
  }

  async createProduct(
    productData: Omit<Product, "id" | "created_at">
  ): Promise<Product> {
    try {
      const response = await apiClient.post<ProductApiResponse>(
        this.baseUrl,
        productData
      );
      if (!response.data.data?.product) {
        throw new Error("Failed to create product");
      }
      return response.data.data.product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  }

  async updateProduct(
    id: number,
    productData: Partial<Omit<Product, "id" | "created_at">>
  ): Promise<Product> {
    try {
      const response = await apiClient.patch<ProductApiResponse>(
        `${this.baseUrl}/${id}`,
        productData
      );
      if (!response.data.data?.product) {
        throw new Error("Failed to update product");
      }
      return response.data.data.product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }
}

export default new ProductService();
