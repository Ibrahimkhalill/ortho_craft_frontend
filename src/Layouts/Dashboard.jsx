import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo/logo.svg";

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menus = [
    { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { title: "User Management", path: "/admin/users", icon: Users },
    { title: "Pricing & Plans", path: "/admin/pricing", icon: DollarSign },
    { title: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const currentPath = location.pathname;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* MOBILE MENU BUTTON */}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-[#E6F5FF] transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* LOGO */}
        <div className="p-8">
          <h1 className="text-3xl font-black text-gray-900">Ortho Craft</h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-3">
            {menus.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-6 py-3 rounded-2xl text-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#009FF2] text-white shadow-lg"
                        : "text-gray-700 hover:bg-white hover:shadow"
                    }`}>
                    <Icon size={24} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* LOGOUT */}
        <div className="p-3">
          <button className="w-full flex items-center gap-4 px-6 py-4 text-lg font-medium text-red-600 hover:bg-red-50 rounded-2xl transition">
            <LogOut size={24} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200">
          <div className="h-20 px-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden border p-2 border-gray-200  bg-white rounded-xl  ">
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Welcome, <span className="text-[#89540E]">User</span> 👋
                </h1>
                <p className="text-sm text-gray-500">Have a wonderful day!</p>
              </div>
            </div>

            <Link
              to={"/admin/settings"}
              className="flex items-center gap-3 hover:opacity-80">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Ortho</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#89540E]">
                <img src={logo} className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
