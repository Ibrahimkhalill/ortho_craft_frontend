import { Edit2, Trash2 } from "lucide-react";
const FoodCard = ({ item, handleEdit, handleDelete }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    {/* Image */}
    <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gray-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Content */}
    <div className="p-3 sm:p-4">
      {/* Title */}
      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2 truncate">
        {item.name}
      </h3>

      {/* Price Information */}
      <div className="space-y-1 text-xs sm:text-sm mb-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            <p className="text-gray-900 font-semibold">{item.price}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Discount</p>
            <p className="text-orange-600 font-semibold">{item.discount}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Net Price</p>
            <p className="text-green-600 font-semibold">{item.netPrice}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={() => handleEdit(item.id)}
          className="flex-1 flex items-center cursor-pointer  justify-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-[#009FF2] text-[#009FF2] rounded-lg hover:bg-amber-50 transition-colors text-xs sm:text-sm font-semibold">
          <Edit2 size={16} className="hidden sm:inline" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-xs sm:text-sm font-semibold">
          <Trash2 size={16} className="hidden sm:inline" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
);

export default FoodCard;
