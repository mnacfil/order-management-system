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
        <Badge variant="secondary" className="flex items-center gap-1">
          <ClockIcon className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "confirmed":
      return (
        <Badge variant="default" className="flex items-center gap-1">
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
