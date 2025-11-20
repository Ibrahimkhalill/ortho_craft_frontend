import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Pagination from "../../../components/Common/Pagination";
import FoodCard from "./MenuCard";
import AddFoodItemModal from "../../../components/modal/AddFoodItemModal";

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Beef Cheese Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 2,
      name: "Bolognese Pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 3,
      name: "Beef Steak",
      image:
        "https://delishglobe.com/wp-content/uploads/2025/06/Beef-Steaf-500x500.png",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 4,
      name: "Margherita Pizza",
      image:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 5,
      name: "Beef Steak",
      image:
        "https://img.freepik.com/free-photo/fresh-fried-steak-top-view_140725-5660.jpg?semt=ais_incoming&w=740&q=80",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 6,
      name: "Margherita Pizza",
      image:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 7,
      name: "Beef Cheese Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
    {
      id: 8,
      name: "Bolognese Pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
      price: "$24.99",
      discount: "$6.99",
      netPrice: "$18.99",
    },
  ]);

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);

  const handleDelete = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit item:", id);
    // Add edit logic here
  };

  const handleAddFoodItem = async () => {};

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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base"
            />
          </div>

          {/* Add Food Item Button */}
          <button
            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-[#009FF2] hover:bg-[#926427] cursor-pointer text-white rounded-lg transition-colors font-semibold text-sm sm:text-base whitespace-nowrap">
            <Plus size={20} />
            <span>Add Food Item</span>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Food List
        </h2>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No food items found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <AddFoodItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddFoodItem}
      />
    </>
  );
};

export default MenuManagement;
