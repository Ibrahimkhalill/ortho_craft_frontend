import React, { useState } from "react";
import { Search, Filter, Plus, MapPin, Mail, Phone } from "lucide-react";
import Pagination from "../../../components/Common/Pagination";
import AddRestaurantModal from "../../../components/modal/AddRestaurantModal";

const AffiliateRestaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Pizza Hut",
      cuisine: "Manila",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pizza_hut_logo_international.svg/2176px-Pizza_hut_logo_international.svg.png",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 2,
      name: "Sky Deck at The Bayleaf Hotel",
      cuisine: "Manila",
      image: "https://i.ytimg.com/vi/BCNrKMs7dcw/maxresdefault.jpg",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 3,
      name: "Manila Bay Kitchen",
      cuisine: "Manila",
      image: "https://images.otstatic.com/prod1/54584219/1/medium.jpg",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 4,
      name: "Ilustrado",
      cuisine: "Manila",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/04/89/4a/5e/ilustrado-sign.jpg",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Inactive",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 5,
      name: "Cafe Ilang-Ilang",
      cuisine: "Manila",
      image:
        "https://manilahotel.b-cdn.net/wp-content/uploads/2023/12/Cafe-Ilang-Ilang-Private-Room-1024x1024.jpg",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Inactive",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 6,
      name: "Bistro Remedios",
      cuisine: "Manila",
      image:
        "https://cdn.tasteatlas.com/images/restaurants/0b79dde546fe49d3a9604d4d50633931.jpg?w=600",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 7,
      name: " Ruby Wong’s Godown",
      cuisine: "Manila",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csN3dtIQdqv9AepEoPMrnvTdPGDz7v-6RA&s",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Inactive",
      totalScans: 324,
      totalSelling: "$7,856",
    },
    {
      id: 8,
      name: "Harbor View Restaurant",
      cuisine: "Manila",
      image:
        "https://images.getbento.com/accounts/a9a05a32a9abad0e6803b9fbbb9dcf4e/media/ndxslEFQQOOAoFW3yIw7_harborview_vert_logo.png?w=600&fit=max&auto=compress,format&cs=origin&h=600",
      address: "123 Main St, Downtown",
      email: "example@gmail.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      totalScans: 324,
      totalSelling: "$7,856",
    },
  ];

  const itemsPerPage = 8;
  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRestaurants = filteredRestaurants.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddRestaurant = async (formData) => {
    // Create FormData object for file upload
    const data = new FormData();
    data.append("restaurantName", formData.restaurantName);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("logo", formData.logo);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/restaurants/add", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to add restaurant");

      console.log("Restaurant added successfully");
      // Show success message
      alert("Restaurant added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add restaurant");
    }
  };

  const RestaurantCard = ({ restaurant }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">
              {restaurant.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {restaurant.cuisine}
            </p>
          </div>
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                restaurant.status
              )}`}>
              {restaurant.status}
            </span>
          </div>
        </div>

        {/* Status Badge */}

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={16} className="text-gray-500 flex-shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail size={16} className="text-gray-500 flex-shrink-0" />
            <span className="truncate">{restaurant.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={16} className="text-gray-500 flex-shrink-0" />
            <span className="truncate">{restaurant.phone}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Scans</p>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              {restaurant.totalScans}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Selling</p>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              {restaurant.totalSelling}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search restaurant..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
            <Filter size={18} />
            <span>Filter</span>
          </button>

          {/* Add Restaurant Button */}
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center gap-2 px-4 py-2 sm:py-3 bg-[#009FF2] hover:bg-amber-800 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base whitespace-nowrap">
            <Plus size={18} />
            <span>Add Restaurant</span>
          </button>
        </div>

        {/* Filter Dropdown (mobile friendly) */}
        {filterOpen && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Active Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Inactive Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-orange-600" />
                <span className="text-sm">High Selling</span>
              </label>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Restaurant List
        </h2>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <AddRestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRestaurant}
      />
    </>
  );
};

export default AffiliateRestaurants;
