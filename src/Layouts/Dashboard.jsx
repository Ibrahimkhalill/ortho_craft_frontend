import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo/logo.svg";
import {
  RiSettings4Line,
  RiUserCommunityLine,
  RiUserFollowLine,
  RiMenu3Line,
} from "react-icons/ri";
import { GrBarChart } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";

import { LuLayoutDashboard } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";

import { FaRightFromBracket } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import { removeAuthTokens } from "../lib/cookie-utils";
import { useUser } from "../lib/UserContext";
import { useState, useEffect } from "react";

import { HiOutlineQrcode } from "react-icons/hi";

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profileData } = useUser();

  const [userRole, setUserRole] = useState("admin");
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    console.log("userRole", role);
    setUserRole(role || "admin");

    const handleStorageChange = (e) => {
      if (e.key === "userRole") {
        setUserRole(e.newValue || "admin");

        if (!e.newValue) {
          removeAuthTokens();
          window.location.href = "/signin";
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out");
        removeAuthTokens();
        window.location.href = "/signin";
      }
    });
  };

  const iconMappings = {
    Home: LuLayoutDashboard,
    User: RiUserCommunityLine,
    Settings: RiSettings4Line,
    Offer: BsCashCoin,
    Challenge: GrBarChart,
    Referrals: RiUserFollowLine,
    orders: HiOutlineQrcode,
    Notification: LuClipboardList,
  };

  // Admin Menus
  const adminMenus = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: iconMappings.Home,
      role: "admin",
      gap: true,
    },
    {
      title: "Affiliate Restaurants",
      path: "/admin/restaurants",
      icon: iconMappings.User,
      role: "admin",
    },
    {
      title: "Billing Monitor",
      path: "/admin/billing",
      icon: iconMappings.Offer,
      role: "admin",
    },
    {
      title: "QR Scan Tracking",
      path: "/admin/qr-tracking",
      icon: iconMappings.orders,
      role: "admin",
    },

    {
      title: "Settings",
      path: "/admin/settings",
      icon: iconMappings.Settings,
      role: "admin",
    },
  ];

  // Restaurant Menus
  const restaurantMenus = [
    {
      title: "Dashboard",
      path: "/restaurant/dashboard",
      icon: iconMappings.Home,
      role: "restaurant",
      gap: true,
    },
    {
      title: "Menu Management",
      path: "/restaurant/menu",
      icon: iconMappings.Notification,
      role: "restaurant",
    },

    {
      title: "Bill Data Management",
      path: "/restaurant/bills",
      icon: iconMappings.Offer,
      role: "restaurant",
    },
    {
      title: "Basic Analytics",
      path: "/restaurant/analytics",
      icon: iconMappings.Challenge,
      role: "restaurant",
    },
    {
      title: "Settings",
      path: "/restaurant/settings",
      icon: iconMappings.Settings,
      role: "restaurant",
    },
  ];

  // Select menus based on user role
  const currentMenus = userRole === "restaurant" ? restaurantMenus : adminMenus;

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-[#009FF2] text-white rounded-lg hover:bg-[#6B3D01] transition-colors">
        <RiMenu3Line size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-72 bg-[#F6F0E1] shadow-lg transition-transform duration-300 z-40 md:z-10 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
        {/* Logo Section */}
        <div className="p-4 md:p-6 ">
          <div className="flex items-center gap-3">
            <img src={logo} />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 md:p-6">
          <ul className="space-y-2">
            {currentMenus.map((Menu, index) => (
              <Link
                to={Menu.path}
                key={index}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  location.pathname === Menu.path
                    ? "bg-[#009FF2] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#009FF2]/10"
                }`}>
                <IconContext.Provider value={{ className: "text-2xl  " }}>
                  <Menu.icon />
                </IconContext.Provider>
                <span className="text-sm md:text-base font-medium truncate">
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 md:p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#009FF2]/10 hover:text-black cursor-pointer rounded-lg transition-colors duration-200">
            <FaRightFromBracket className="text-lg md:text-xl flex-shrink-0" />
            <span className="text-sm md:text-base font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 pt-16 md:pt-0">
          <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
            {/* Welcome Section */}
            <div className="flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Welcome,{" "}
                <span className="text-[#009FF2]">
                  {profileData?.name || "User"}
                </span>{" "}
                👋
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Have a wonderful day!
              </p>
            </div>

            {/* Profile Section */}
            <Link
              to={
                userRole === "restaurant"
                  ? "/restaurant/settings"
                  : "/admin/settings"
              }
              className="flex items-center gap-3 hover:opacity-75 transition-opacity ml-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  {profileData?.name || "User"}
                </p>
                <p className="text-xs md:text-sm text-gray-500 capitalize">
                  {userRole}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#009FF2]">
                <img
                  src={profileData?.profileImage || logo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
