import type { Order } from "../../types/Order";
import { Badge } from "../ui/badge";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="flex items-center gap-1 bg-yellow-500 text-white">
          <ClockIcon className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "confirmed":
      return (
        <Badge className="flex items-center gap-1 bg-green-500 text-white">
          <CheckCircleIcon className="h-3 w-3" />
          Confirmed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircleIcon className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default OrderStatusBadge;
