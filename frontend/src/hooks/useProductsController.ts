import { useState } from "react";
import type { Product } from "../types/Product";
import { useProducts } from "./useProducts";
import { toast } from "sonner";

export const useProductsController = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteProductId(product.id);
  };

  const confirmDelete = async () => {
    if (deleteProductId) {
      try {
        await deleteProduct(deleteProductId);
        toast.success("Product deleted successfully!");
        setDeleteProductId(null);
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleFormSubmit = async (values: {
    name: string;
    price: unknown;
    stock_quantity: unknown;
    description?: string | undefined;
  }) => {
    try {
      setFormLoading(true);
      const productData = {
        name: values.name,
        description: values.description || "",
        price: Number(values.price),
        stock_quantity: Number(values.stock_quantity),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData);
        toast.success("Product created successfully!");
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error("Failed to save product");
      console.error("Form submission error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return {
    products,
    loading,
    error,
    showForm,
    editingProduct,
    deleteProductId,
    formLoading,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleFormSubmit,
    handleFormCancel,
    setShowForm,
    setDeleteProductId,
  };
};
