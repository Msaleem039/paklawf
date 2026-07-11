import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusSquare,
  ShoppingBag,
  Bell,
  ClipboardList,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <Home size={18} />,
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "Product List",
      path: "/admin/products",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ClipboardList size={18} />,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: <Bell size={18} />,
    },
  ];

  return (
    <div className="h-full bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Pak Law Book" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-bold text-amber-600 tracking-wide">
              Pak Law Book
            </h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-1 px-3 py-4 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <span
                  className={`${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t text-sm text-gray-400">
        © 2026 Pak Law Book
      </div>
    </div>
  );
};

export default Sidebar;