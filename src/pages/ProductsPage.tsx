import { useState } from "react";
import type { Product } from "../types/Product";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import {
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Sample Product",
    description: "A sample product for demo purposes.",
    price: 19.99,
    stock_quantity: 50,
    created_at: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  function handleAdd() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleDelete(product: Product) {
    setDeleteProduct(product);
  }

  function confirmDelete() {
    if (deleteProduct) {
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    }
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingProduct(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex justify-end">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleAdd}
        >
          Add Product
        </button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add/Edit Product Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </AlertDialogHeader>
          <ProductForm
            initialValues={editingProduct || {}}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={(open) => !open && setDeleteProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <b>{deleteProduct?.name}</b>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteProduct(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
