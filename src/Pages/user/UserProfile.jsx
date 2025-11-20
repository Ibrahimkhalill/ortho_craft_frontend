import React from "react";
import background from "../../assets/images/promo.png";
import {
  Mail,
  Calendar,
  QrCode,
  DollarSign,
  MapPin,
  LogOut,
} from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: <QrCode className="w-6 h-6 text-green-600" />,
      value: "23",
      label: "Offers Redeemed",
      bgColor: "bg-green-50",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      value: "$342",
      label: "Total Saved",
      bgColor: "bg-blue-50",
    },
    {
      icon: <MapPin className="w-6 h-6 text-orange-600" />,
      value: "15",
      label: "Restaurants Visited",
      bgColor: "bg-orange-50",
    },
  ];

  const favoriteCuisines = ["Japanese", "Italian", "Mexican", "Thai"];
  const favoriteRestaurants = ["Tanoshi", "Yushoken", "Da Gianni", "Beirouz"];
  const favoriteDishes = [
    "Tuna sushi",
    "Pesto pasta",
    "Lamb kebab",
    "Beef tacos",
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <div
      className="min-h-screen bg-gray-50 bg-cover  bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt="Sarah Johnson"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sarah Johnson
              </h1>
              <div className="flex items-start gap-1 mt-1 flex-col   text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>sarah.johnson@email.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since January 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${stat.bgColor} rounded-full p-3 mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My Favorites Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Favorite Cuisines */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Favorite Cuisines
            </h3>
            <ol className="space-y-2 text-gray-700">
              {favoriteCuisines.map((cuisine, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{cuisine}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Favorite Restaurants */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Favorite Restaurants
            </h3>
            <ol className="space-y-2 text-gray-700">
              {favoriteRestaurants.map((restaurant, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{restaurant}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Favorite Dishes */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Favorite Dishes
            </h3>
            <ol className="space-y-2 text-gray-700">
              {favoriteDishes.map((dish, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{dish}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
