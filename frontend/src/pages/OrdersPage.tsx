import OrderTable from "../components/orders/OrderTable";
import OrderStats from "../components/orders/OrderStats";
import { useOrdersController } from "../hooks/useOrdersController";

const OrdersPage = () => {
  const {
    orders,
    loading,
    error,
    handleConfirmOrder,
    handleCancelOrder,
    refetch,
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
        onConfirm={handleConfirmOrder}
        onCancel={handleCancelOrder}
        loading={loading}
      />
    </div>
  );
};

export default OrdersPage;
