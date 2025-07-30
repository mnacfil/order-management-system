import OrderTable from "../components/orders/OrderTable";
import OrderStats from "../components/orders/OrderStats";
import { useOrdersController } from "../hooks/useOrdersController";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const OrdersPage = () => {
  const {
    orders,
    loading,
    error,
    showCancelOrder,
    showConfirmOrder,
    showDeleteOrder,
    orderId,
    handleConfirmOrder,
    handleCancelOrder,
    handleDeleteOrder,
    refetch,
    handleShowConfirmOrder,
    handleHideConfirmOrder,
    handleShowCancelOrder,
    handleHideCancelOrder,
    setShowCancelOrder,
    setShowConfirmOrder,
    setShowDeleteOrder,
    handleShowDeleteOrder,
    handleHideDeleteOrder,
  } = useOrdersController();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading orders...</div>
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={refetch}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Refresh
        </button>
      </div>
      <OrderStats orders={orders} />
      <OrderTable
        orders={orders}
        handleShowConfirmOrder={handleShowConfirmOrder}
        handleShowCancelOrder={handleShowCancelOrder}
        handleShowDeleteOrder={handleShowDeleteOrder}
      />
      {/* For Confirming orders dialog */}
      <AlertDialog
        open={showConfirmOrder}
        onOpenChange={(open) => !open && setShowConfirmOrder(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm this order? The order will be
              marked as confirmed and the order status will be updated to
              "confirmed".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleHideConfirmOrder}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!orderId) return;
                handleConfirmOrder(orderId);
                handleHideConfirmOrder();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* For Cancelling orders dialog */}
      <AlertDialog
        open={showCancelOrder}
        onOpenChange={(open) => !open && setShowCancelOrder(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? The order will be
              marked as cancelled and the order status will be updated to
              "cancelled".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleHideCancelOrder}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!orderId) return;
                handleCancelOrder(orderId);
                handleHideCancelOrder();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* For deleting orders dialog */}
      <AlertDialog
        open={showDeleteOrder}
        onOpenChange={(open) => !open && setShowDeleteOrder(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleHideDeleteOrder}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!orderId) return;
                handleDeleteOrder(orderId);
                handleHideDeleteOrder();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrdersPage;
