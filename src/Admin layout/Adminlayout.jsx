import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">

      {/* Sidebar */}
      <div className="w-72 hidden lg:block border-r border-gray-800 bg-[#111827]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-6">

          {/* Top Welcome Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

              <div>
                <h1 className="text-3xl font-bold text-white">
                  Perfume Admin Dashboard
                </h1>

                <p className="text-gray-400 mt-2">
                  Manage luxury perfumes, orders, customers & analytics.
                </p>
              </div>

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-2xl transition duration-300 shadow-lg">
                + Add New Product
              </button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-gray-400 text-sm">
                Total Products
              </h3>

              <h1 className="text-4xl font-bold text-white mt-2">
                245
              </h1>

              <p className="text-green-400 mt-2 text-sm">
                +12% this month
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-gray-400 text-sm">
                Total Orders
              </h3>

              <h1 className="text-4xl font-bold text-white mt-2">
                1,450
              </h1>

              <p className="text-green-400 mt-2 text-sm">
                +18% this month
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-gray-400 text-sm">
                Revenue
              </h3>

              <h1 className="text-4xl font-bold text-white mt-2">
                $18K
              </h1>

              <p className="text-green-400 mt-2 text-sm">
                +25% this month
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-gray-400 text-sm">
                Customers
              </h3>

              <h1 className="text-4xl font-bold text-white mt-2">
                890
              </h1>

              <p className="text-green-400 mt-2 text-sm">
                +8% this month
              </p>
            </div>
          </div>

          {/* Outlet Pages */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl min-h-[400px]">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminLayout;