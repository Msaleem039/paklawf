import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderNotifications, confirmOrderNotification } = useCart();

  const order = orderNotifications.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Notification Not Found</h2>
        <p className="text-gray-500 mt-2">This notification might have been removed or confirmed.</p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Order Details</h2>
      <p className="text-gray-400 mt-1">Order placed on {new Date(order.createdAt).toLocaleString()}</p>

      <div className="mt-6 rounded-3xl border border-gray-700 bg-slate-950 p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{order.customerName}</h3>
            <p className="text-sm text-gray-300">{order.email} · {order.phone}</p>
            <p className="text-sm text-gray-300 mt-2">{order.address}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total: Rs. {Number(order.total || 0).toFixed(2)}</p>
            <p className="text-sm text-green-400">{order.paymentMethod}</p>
            <p className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {order.status}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm text-gray-300 font-semibold">Items</h4>
          <ul className="mt-2 list-disc list-inside text-gray-300">
            {order.items && order.items.length > 0 ? (
              order.items.map((it, idx) => (
                <li key={idx}>{it.title || it.name || it.productName} x{it.quantity || 1}</li>
              ))
            ) : (
              <li>No cart items recorded</li>
            )}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {order.status === "pending" && (
            <button
              onClick={() => confirmOrderNotification(order.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              Confirm Order
            </button>
          )}
          <button onClick={() => navigate(-1)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl">Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
