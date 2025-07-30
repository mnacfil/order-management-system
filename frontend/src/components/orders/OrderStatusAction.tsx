import type { Order } from "../../types/Order";
import { Button } from "../ui/button";
import {
  CheckCircleIcon,
  XCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface OrderStatusActionProps {
  order: Order;
  onConfirm: (orderId: number) => void;
  onCancel: (orderId: number) => void;
}

const OrderStatusAction = ({
  order,
  onConfirm,
  onCancel,
}: OrderStatusActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {order.status === "pending" && (
          <>
            <DropdownMenuItem
              onClick={() => onConfirm(order.id)}
              className="cursor-pointer"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Confirm
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onCancel(order.id)}
              className="cursor-pointer"
            >
              <XCircleIcon className="h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}
        {order.status === "confirmed" && (
          <DropdownMenuItem
            onClick={() => onCancel(order.id)}
            className="cursor-pointer"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusAction;
