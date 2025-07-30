import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";
import OrderForm from "../components/orders/OrderForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../components/ui/alert-dialog";
import { useProductsController } from "../hooks/useProductsController";
import { useOrdersController } from "../hooks/useOrdersController";
import { Button } from "../components/ui/button";

const ProductsPage = () => {
  const {
    products,
    loading,
    error,
    showForm,
    editingProduct,
    formLoading,
    deleteProductId,
    handleAdd,
    handleEdit,
    handleDelete,
    setShowForm,
    handleFormSubmit,
    handleFormCancel,
    setDeleteProductId,
    confirmDelete,
  } = useProductsController();

  const {
    showOrderForm,
    orderLoading,
    handleOrder,
    handleOrderSubmit,
    handleOrderCancel,
    setShowOrderForm,
  } = useOrdersController();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleAdd}>Add Product</Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOrder={handleOrder}
      />

      {/* For Add/Edit Product Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            initialValues={editingProduct || {}}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        </DialogContent>
      </Dialog>

      {/* For Delete Product Dialog */}
      <AlertDialog
        open={!!deleteProductId}
        onOpenChange={(open) => !open && setDeleteProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteProductId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* For Create Order Dialog */}
      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Order</DialogTitle>
          </DialogHeader>
          <OrderForm
            products={products}
            loading={orderLoading}
            onSubmit={handleOrderSubmit}
            onCancel={handleOrderCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
