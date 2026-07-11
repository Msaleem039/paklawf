import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useLoginMutation } from "../store/hooks";
import { showSuccess } from "../utils/toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(formData).unwrap();
      if (result?.success || result?.token) {
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            name: result?.user?.name || result?.name || "Pak Law Book Admin",
            email: result?.user?.email || formData.email,
          })
        );
        window.dispatchEvent(new CustomEvent('auth-changed'));
        showSuccess("Welcome back! Login successful.");
        navigate("/admin", { replace: true });
        return;
      }
      setError(result?.message || "Login failed. Please check your credentials.");
    } catch (err) {
      setError(err?.data?.message || err?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close login"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-amber-400 text-center mb-2">Admin Login</h1>
        <p className="text-slate-400 text-center mb-8">Sign in to manage your store</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-amber-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-amber-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
