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
      <div className="w-72 hidden lg:block border-r border-gray-800 bg-[#111827]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl min-h-[400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
