import { useCart } from "../Context/CartContext";
import { useGetOrdersQuery } from "../store/hooks";

const normalizeOrder = (order) => ({
  id: order._id || order.id || order.createdAt,
  createdAt: order.createdAt || order.date || new Date().toISOString(),
  customerName: order.customerName || order.user?.name || order.name || "Customer",
  email: order.email || order.user?.email || "",
  phone: order.phone || order.user?.phone || "",
  productName: order.productName || order.items?.map((item) => item.name || item.title).join(", ") || "Order items",
  quantity: order.quantity || order.items?.length || 1,
  address: order.address || order.deliveryAddress || "",
  total: order.total || order.amount || 0,
  paymentMethod: order.paymentMethod || order.payment || "N/A",
  status: order.status || "pending",
});

const Orderlist = () => {
  const { orderNotifications, confirmOrderNotification } = useCart();
  const { data: apiOrders = [], isLoading, isError } = useGetOrdersQuery();

  const orders = apiOrders.length > 0
    ? apiOrders.map(normalizeOrder)
    : orderNotifications;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Order List</h2>

      {isLoading && <p className="text-gray-500 mt-2">Loading orders from API...</p>}
      {isError && apiOrders.length === 0 && (
        <p className="text-amber-500 mt-2 text-sm">Showing local order notifications.</p>
      )}

      {orders.length === 0 ? (
        <p className="text-gray-600 mt-2">No orders available yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-700 rounded-2xl p-4 bg-slate-950">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  <h3 className="text-lg font-semibold text-white">{order.customerName}</h3>
                  <p className="text-sm text-gray-300">{order.email} · {order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total: Rs. {Number(order.total || 0).toFixed(2)}</p>
                  <p className="text-sm text-green-400">{order.paymentMethod}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                <p><span className="font-semibold">Product:</span> {order.productName}</p>
                <p><span className="font-semibold">Qty:</span> {order.quantity}</p>
                <p className="sm:col-span-2"><span className="font-semibold">Address:</span> {order.address}</p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                  {order.status}
                </span>
                {order.status === "pending" && apiOrders.length === 0 && (
                  <button
                    onClick={() => confirmOrderNotification(order.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orderlist;
