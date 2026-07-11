import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useGetFoodListQuery, useGetOrdersQuery } from "../store/hooks";

const Dashboard = () => {
  const { data: products = [] } = useGetFoodListQuery();
  const { data: orders = [] } = useGetOrdersQuery();

  const salesData = [
    { label: "Mon", value: 48 },
    { label: "Tue", value: 56 },
    { label: "Wed", value: 72 },
    { label: "Thu", value: 64 },
    { label: "Fri", value: 82 },
    { label: "Sat", value: 70 },
    { label: "Sun", value: 58 },
  ];

  const stats = [
    {
      title: "Total Books",
      value: String(products.length),
      icon: <Package size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: String(orders.length),
      icon: <ShoppingCart size={20} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Pending Orders",
      value: String(orders.filter((order) => order.status === "pending").length),
      icon: <Users size={20} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pak Law Book Dashboard</h1>
        <p className="text-sm text-gray-400">
          Live overview of books, orders and publications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500">{item.title}</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {item.value}
                </p>
              </div>

              <div className={`p-3 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
            </div>

            <div className="mt-3 text-xs text-green-500 flex items-center gap-1">
              <TrendingUp size={14} /> Live from API
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Sales Overview
            </h2>
            <span className="text-sm text-gray-400">
              Weekly
            </span>
          </div>

          <div className="flex h-56 items-end gap-3">
            {salesData.map((point) => (
              <div
                key={point.label}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-full rounded-t-2xl bg-blue-500 group-hover:bg-blue-600 transition-all duration-300"
                  style={{ height: `${point.value}%` }}
                />
                <span className="text-xs text-gray-500">
                  {point.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Latest Order</h3>
            <p className="mt-2 text-xl font-semibold text-gray-800">
              {orders[0]?.customerName || orders[0]?.user?.name || "No orders yet"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Catalog Size</h3>
            <p className="mt-2 text-xl font-semibold text-green-600">
              {products.length} products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
