import type { Order } from "../../types/Order";
import { formatDate } from "../../lib/utils";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderStatusAction from "./OrderStatusAction";

interface OrderTableProps {
  orders: Order[];
  handleShowConfirmOrder: (orderId: number) => void;
  handleShowCancelOrder: (orderId: number) => void;
}

const OrderTable = ({
  orders,
  handleShowConfirmOrder,
  handleShowCancelOrder,
}: OrderTableProps) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No orders found. Create your first order from the Products page.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order #</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-left">Created</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{order.order_number}</td>
              <td className="p-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="p-3">
                <div className="max-w-xs">
                  {order.items_summary || `${order.item_count || 0} items`}
                </div>
              </td>
              <td className="p-3 text-right font-medium">
                ₱ {Number(order.total_amount).toFixed(2)}
              </td>
              <td className="p-3 text-sm text-gray-600">
                {formatDate(order.created_at)}
              </td>
              <td className="p-3 flex items-center justify-center">
                <OrderStatusAction
                  order={order}
                  onConfirm={handleShowConfirmOrder}
                  onCancel={handleShowCancelOrder}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
