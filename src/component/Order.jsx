import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { usePlaceOrderMutation } from "../store/hooks";
import { showSuccess, showInfo } from "../utils/toast";

const OrderForm = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, addOrderNotification, clearCart } = useCart();
  const [placeOrder] = usePlaceOrderMutation();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    productName: "",
    quantity: 1,
    address: "",
    paymentMethod: "cash on delivery",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [width, height] = useWindowSize();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrderNotification = (orderData) => {
    addOrderNotification({
      ...orderData,
      items: cartItems,
      total: cartTotal,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const orderData = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      productName: formData.productName || cartItems.map((item) => item.title).join(", "),
      quantity: formData.quantity.toString(),
      deliveryAddress: formData.address,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      amount: cartTotal,
    };

    let orderSavedOnServer = false;

    try {
      const result = await placeOrder(orderData).unwrap();
      orderSavedOnServer = Boolean(result?.success ?? true);
    } catch (error) {
      console.warn("Order API request failed:", error);
    }

    try {
      createOrderNotification(orderData);
    } catch (err) {
      console.error("Notification Error:", err);
    }

    clearCart();
    setOrderPlaced(true);

    setFormData({
      customerName: "",
      email: "",
      phone: "",
      productName: "",
      quantity: 1,
      address: "",
      paymentMethod: "cash on delivery",
    });

    if (!orderSavedOnServer) {
      showInfo("Order saved locally. Admin has been notified.");
    } else {
      showSuccess("Order placed successfully!");
    }

    setSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />

        <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <div className="text-7xl mb-4">🎉</div>

          <h1 className="text-3xl font-bold text-amber-400 mb-3">Order Placed Successfully!</h1>

          <p className="text-gray-400 mb-5">
            Thank you for shopping with us. Your order will be delivered soon!
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setOrderPlaced(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Place Another Order
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">Place Your Order</h2>

        {cartItems.length > 0 && (
          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-sm text-slate-300">
            <p className="font-semibold text-amber-400 mb-2">Cart Summary</p>
            {cartItems.map((item) => (
              <p key={item._id}>
                {item.title} x{item.quantity}
              </p>
            ))}
            <p className="mt-2 font-semibold text-white">Total: Rs. {cartTotal.toFixed(2)}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03XXXXXXXXX"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName || cartItems.map((item) => item.title).join(", ")}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Delivery Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter delivery address"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2"
            >
              <option value="cash on delivery">Cash on Delivery</option>
              <option value="online payment">Online Payment</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition duration-300 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
