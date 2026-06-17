import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { parsePrice } from "../utils/productUtils";

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, updateQuantity } = useCart();

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (!item) return;
    updateQuantity(id, item.quantity + 1);
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (!item) return;
    const nextQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    updateQuantity(id, nextQuantity);
  };

  const formatRupees = (amount) =>
    `Rs. ${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="p-8 text-center bg-gray-700">
        <h2 className="text-3xl font-bold mb-2 text-white">Your Cart is Empty</h2>
        <p className="text-white">Add products from gallery to view them here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-blue-950 text-white">
  <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-500">Shopping Cart</h1>
        <div className="bg-black text-yellow-500 px-5 py-2 rounded-full font-semibold">
          {totalItems} Items
        </div>
      </div>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-5">
              <img
                src={item.image || item.Image}
                alt={item.title}
                className="w-28 h-28 object-contain bg-gray-100 rounded-xl p-2"
              />
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-white-500 mt-1">Price: {formatRupees(parsePrice(item.price))}</p>
                <p className="text-yellow-500 font-bold mt-2">
                  Total: {formatRupees(parsePrice(item.price) * item.quantity)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="px-4 py-2 bg-black-100 hover:bg-gray-200 text-xl"
                >
                  -
                </button>
                <span className="px-5 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="px-4 py-2 bg-black-100 hover:bg-gray-200 text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-5">
        <div>
          <p className="text-lg text-gray-400 ">Total Products: {totalItems}</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-500">Total: {formatRupees(cartTotal)}</h2>
        </div>
        <Link to="/order">
          <button className="bg-yellow-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black-500 transition">
            Proceed to Order
          </button>
        </Link>
      </div>
    </div>
    
  );
};

export default Cart;
