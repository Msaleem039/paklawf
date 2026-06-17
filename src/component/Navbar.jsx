import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useCart } from "../Context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  "Income Tax",
  "Sales Tax",
  "PRA Laws",
  "Customs Laws",
  "Corporate Laws",
  "Labour Laws",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-15 h-10 rounded border-full flex items-center justify-center shadow-md">
              <img src="/logo.jpeg" alt="Pak Law Publication" className="w-10 h-10 rounded border-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Pak Law Publication
              </h1>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-all duration-300 px-4 py-2 rounded-full ${
                    isActive
                      ? "bg-amber-500 text-black"
                      : "text-slate-700 hover:bg-amber-500/20 hover:text-red-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="group relative">
              <button className="flex items-center gap-1 text-slate-700 font-medium hover:text-blue-900 transition">
                Categories
                <ChevronDown size={16} />
              </button>

              <div className="absolute top-12 left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                {categories.map((item, index) => (
                  <NavLink
                    key={index}
                    to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      `block px-6 py-3 text-slate-700 transition-all duration-300 ${
                        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-3 rounded-full bg-slate-100 hover:bg-amber-100 transition"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={20} className="text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition text-sm font-medium"
            >
              <LogIn size={16} />
              Admin Login
            </Link>

            {/* <Link
              to="/books"
              className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
            >
              Shop Books
            </Link> */}
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2 rounded-full bg-slate-100">
              <ShoppingCart size={20} className="text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-800"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="p-5 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-slate-700 font-medium hover:text-blue-900"
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-slate-500 mb-3">Categories</p>
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-slate-700 hover:text-blue-900"
                >
                  {item}
                </Link>
              ))}
            </div>

            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-3 rounded-lg font-medium"
            >
              <LogIn size={16} />
              Admin Login
            </Link>

            <Link
              to="/books"
              onClick={() => setMenuOpen(false)}
              className="block bg-amber-500 text-center text-white py-3 rounded-lg font-semibold"
            >
              Shop Books
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
