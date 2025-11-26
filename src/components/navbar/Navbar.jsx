// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  // Check login status from localStorage
  // useEffect(() => {
  //   const checkLogin = () => {
  //     const role = localStorage.getItem("userRole");
  //     setIsLoggedIn(!!role);
  //   };

  //   checkLogin();
  //   window.addEventListener("storage", checkLogin);
  //   return () => window.removeEventListener("storage", checkLogin);
  // }, []);

  // useEffect(() => {
  //   const role = localStorage.getItem("userRole");
  //   setIsLoggedIn(!!role);
  // }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/custom", label: "Custom" },
    { to: "/about", label: "About Us" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Ortho Craft Text */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl lg:text-3xl font-bold text-gray-900">
              Ortho Craft
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8 lg:space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative pb-1 text-base lg:text-lg font-medium transition-colors duration-200
                    ${
                      isActive(link.to)
                        ? "text-[#009FF2]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}>
                  {link.label}
                  {/* Blue underline for active link */}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009FF2] rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - User Icon */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to="/user-profile"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User size={26} className="text-gray-700" />
              </Link>
            ) : (
              <Link
                to="/user-signin"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User size={26} className="text-gray-700" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200 bg-white ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-3 text-lg font-medium transition-colors ${
                isActive(link.to)
                  ? "text-[#009FF2]"
                  : "text-gray-700 hover:text-[#009FF2]"
              }`}>
              {link.label}
            </Link>
          ))}
          {/* {!isLoggedIn && (
            <>
              <Link
                to="/user-signin"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-[#009FF2] text-white font-medium rounded-xl hover:bg-blue-600 transition-colors">
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 border-2 border-[#009FF2] text-[#009FF2] font-medium rounded-xl hover:bg-[#009FF2] hover:text-white transition-all">
                Sign Up
              </Link>
            </>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
