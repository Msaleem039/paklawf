import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useCart } from "../Context/CartContext";

const getAdminUser = () => {
  try {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const Header = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const { orderNotifications } = useCart();
  const adminUser = getAdminUser();

  const pendingCount = orderNotifications.filter((item) => item.status === "pending").length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    window.dispatchEvent(new CustomEvent("auth-changed"));
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Pak Law Book Admin
        </h1>
        <p className="text-sm text-gray-400">
          Manage books, orders & publications
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/admin/notifications")}
        >
          <Bell className="text-gray-500 hover:text-amber-600" />
          {orderNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {orderNotifications.length}
            </span>
          )}
          {pendingCount > 0 && (
            <span className="sr-only">{pendingCount} pending orders</span>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/logo.jpeg"
              alt="Pak Law Book Admin"
              className="w-9 h-9 rounded-full border object-cover"
            />
            <div className="text-left hidden sm:block">
              <span className="text-sm font-medium text-gray-700 block">
                {adminUser?.name || "Admin"}
              </span>
              <span className="text-xs text-gray-400 block max-w-[140px] truncate">
                {adminUser?.email || "paklawbook@admin.com"}
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-xl border py-3 z-50">
              <div className="px-4 pb-3 border-b">
                <p className="text-sm font-semibold text-gray-800">
                  {adminUser?.name || "Pak Law Book Admin"}
                </p>
                <p className="text-xs text-gray-500 mt-1 break-all">
                  {adminUser?.email || "Not available"}
                </p>
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  Pak Law Publication
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
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
