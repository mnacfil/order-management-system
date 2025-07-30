import type { Order } from "../../types/Order";
import { Button } from "../ui/button";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface OrderStatusActionProps {
  order: Order;
  onConfirm: (orderId: number) => void;
  onCancel: (orderId: number) => void;
  loading?: boolean;
}

const OrderStatusAction = ({
  order,
  loading,
  onConfirm,
  onCancel,
}: OrderStatusActionProps) => {
  if (order.status === "pending") {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onConfirm(order.id)}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Confirm
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onCancel(order.id)}
          disabled={loading}
        >
          <XCircleIcon className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-500">
      {order.status === "confirmed" ? "Order confirmed" : "Order cancelled"}
    </div>
  );
};

export default OrderStatusAction;
