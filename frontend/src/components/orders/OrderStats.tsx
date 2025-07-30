import type { Order } from "../../types/Order";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "lucide-react";

interface OrderStatsProps {
  orders: Order[];
}

const OrderStats = ({ orders }: OrderStatsProps) => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;
  const totalRevenue = orders
    .filter((order) => order.status === "confirmed")
    .reduce((sum, order) => sum + Number(order.total_amount), 0);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCartIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: ClockIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Confirmed",
      value: confirmedOrders,
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cancelled",
      value: cancelledOrders,
      icon: XCircleIcon,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Total Revenue (Confirmed Orders)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ₱ {totalRevenue.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStats;
