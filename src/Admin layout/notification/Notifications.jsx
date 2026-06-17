import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { orderNotifications, confirmOrderNotification } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Order Notifications</h2>
      <p className="text-gray-400 mt-1">Manage new orders and confirm them from this page.</p>

      {orderNotifications.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-gray-700 bg-slate-950 p-6 text-gray-400">
          No notifications yet. Customer orders will appear here once placed.
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {orderNotifications.map((item) => (
            <div key={item._id || item.id} className="rounded-3xl border border-gray-700 bg-slate-950 p-6">
              <div className="block">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">{item.title || "Order Notification"}</p>
                    <h3 className="text-xl font-semibold text-white mt-2">{item.customerName || item.name}</h3>
                    <p className="text-sm text-gray-300">{item.email} · {item.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                      {item.status || "pending"}
                    </span>
                    <p className="text-sm text-green-400 mt-2">{item.paymentMethod}</p>
                  </div>
                </div>

                <div className="mt-5 text-gray-300 space-y-2">
                  <p><span className="font-semibold text-white">Customer:</span> {item.customerName}</p>
                  <p><span className="font-semibold text-white">Email:</span> {item.email}</p>
                  <p><span className="font-semibold text-white">Phone:</span> {item.phone}</p>
                  <p><span className="font-semibold text-white">Product:</span> {item.productName}</p>
                  <p><span className="font-semibold text-white">Quantity:</span> {item.quantity}</p>
                  <p><span className="font-semibold text-white">Address:</span> {item.deliveryAddress || item.address}</p>
                  <p><span className="font-semibold text-white">Payment:</span> {item.paymentMethod}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-sm text-gray-400">
                  {item.items?.length > 0 ? `${item.items.length} cart item(s)` : "No cart items recorded"}
                </div>
                {item.status === "pending" && (
                  <button
                    onClick={() => confirmOrderNotification(item.id || item._id)}
                    className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
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

export default Notifications;
