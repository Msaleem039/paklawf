import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useCart } from "../Context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { orderNotifications } = useCart();
  const pendingCount = orderNotifications.filter((item) => item.status === "pending").length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new CustomEvent("auth-changed"));
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
      
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Welcome back 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        {/* Search Box */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer" onClick={() => navigate('/admin/notifications')}>
          <Bell className="text-gray-500 hover:text-blue-600" />
          {orderNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {orderNotifications.length}
            </span>
          )}

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border py-2 z-50">
              <div className="px-4 pb-2 border-b">
                <p className="text-sm font-semibold text-gray-700">Order Notifications</p>
                <p className="text-xs text-gray-500">
                  {pendingCount > 0 ? `${pendingCount} pending order(s)` : "No pending orders"}
                </p>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {orderNotifications.length > 0 ? (
                  orderNotifications.slice(0, 5).map((order) => (
                    <div key={order.id} className="border-b last:border-b-0">
                      <Link to={`/admin/notifications/${order.id}`} className="block px-4 py-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{order.customerName || order.email}</p>
                            <p className="text-xs text-gray-500">
                              {order.productName ? `${order.productName} x${order.quantity}` : `${order.items?.length || 0} items`}
                            </p>
                          </div>
                          <span className={`text-[11px] px-2 py-1 rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-4 text-sm text-gray-500">No recent orders.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-9 h-9 rounded-full border"
            />
            <span className="text-sm font-medium text-gray-700">
              Admin
            </span>
            <ChevronDown size={16} />
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl border py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;