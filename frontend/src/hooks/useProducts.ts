import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types/Product";
import productService from "../services/productService";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  createProduct: (data: Omit<Product, "id" | "created_at">) => Promise<void>;
  updateProduct: (
    id: number,
    data: Partial<Omit<Product, "id" | "created_at">>
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (productData: Omit<Product, "id" | "created_at">) => {
      try {
        setError(null);
        const newProduct = await productService.createProduct(productData);
        setProducts((prev) => [...prev, newProduct]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create product"
        );
        throw err;
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (
      id: number,
      productData: Partial<Omit<Product, "id" | "created_at">>
    ) => {
      try {
        setError(null);
        const updatedProduct = await productService.updateProduct(
          id,
          productData
        );
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? updatedProduct : product))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update product"
        );
        throw err;
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: number) => {
    try {
      setError(null);
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      throw err;
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
  };
};
