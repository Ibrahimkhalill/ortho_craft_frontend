import { MapPin, Mail, Phone, ChevronRight } from "lucide-react";
const RestaurantCard = ({ restaurant, setIsOpen }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
    {/* Image with Discount Badge */}
    <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gray-200">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      {restaurant.discount && (
        <div className="absolute top-2 right-2 bg-[#009FF2] text-white text-xs sm:text-sm font-bold px-2 py-1 rounded">
          {restaurant.discount}
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-3 sm:p-4 flex flex-col flex-1">
      {/* Name and Category */}
      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
        {restaurant.name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3">
        {restaurant.category}
      </p>

      {/* Contact Info */}
      <div className="space-y-2 text-xs sm:text-sm mb-3 flex-1">
        {/* Address */}
        <div className="flex items-start gap-2 text-gray-700">
          <MapPin size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <span className="truncate">{restaurant.address}</span>
        </div>

        {/* Email */}
        <div className="flex items-start gap-2 text-gray-700">
          <Mail size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <span className="truncate">{restaurant.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-2 text-gray-700">
          <Phone size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <span className="truncate">{restaurant.phone}</span>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-auto py-2 px-3 bg-[#009FF2] hover:bg-[#7D4C0D] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1">
        <span>View Details</span>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default RestaurantCard;
