import { useEffect, useRef, useState } from "react";
import { X, AlertCircle, Search, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const AddBillModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    qrNumber: "",
    selectedItems: [],
    totalAmount: "",
    discount: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock data - আপনার API থেকে replace করবেন
  const availableItems = [
    { id: 1, name: "Margherita Pizza", price: 18.99, discount: 10 },
    { id: 2, name: "Beef Cheese Burger", price: 12.99, discount: 10 },
    { id: 3, name: "Caesar Salad", price: 8.99, discount: 10 },
    { id: 4, name: "Carbonara Pasta", price: 15.99, discount: 12 },
    { id: 5, name: "Chicken Parmesan", price: 16.99, discount: 13 },
    { id: 6, name: "BBQ Ribs", price: 22.99, discount: 11 },
    { id: 7, name: "Fish Fillet", price: 14.99, discount: 10 },
    { id: 8, name: "Vegetable Stir Fry", price: 11.99, discount: 10 },
  ];

  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.selectedItems.some((selected) => selected.id === item.id)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddItem = (item) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: [...prev.selectedItems, { ...item, quantity: 1 }],
    }));
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveItem = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.filter((item) => item.id !== itemId),
    }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ),
    }));
  };

  const calculateItemsTotal = () => {
    return formData.selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.qrNumber.trim()) {
      newErrors.qrNumber = "QR Number is required";
    }

    if (formData.selectedItems.length === 0) {
      newErrors.selectedItems = "Please add at least one item";
    }

    if (!formData.totalAmount.trim()) {
      newErrors.totalAmount = "Total amount is required";
    } else if (
      isNaN(formData.totalAmount) ||
      parseFloat(formData.totalAmount) <= 0
    ) {
      newErrors.totalAmount = "Please enter a valid amount";
    }

    if (!formData.discount.trim()) {
      newErrors.discount = "Discount is required";
    } else if (isNaN(formData.discount) || parseFloat(formData.discount) < 0) {
      newErrors.discount = "Please enter a valid discount";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const billData = {
        qrNumber: formData.qrNumber,
        items: formData.selectedItems,
        itemsText: formData.selectedItems
          .map((item) => `${item.name} x${item.quantity}`)
          .join(", "),
        totalAmount: parseFloat(formData.totalAmount),
        discount: parseFloat(formData.discount),
        netAmount:
          parseFloat(formData.totalAmount) - parseFloat(formData.discount),
        timestamp: new Date().toISOString(),
      };

      await onSubmit(billData);

      Swal.fire({
        title: "Success!",
        text: "Bill added successfully",
        icon: "success",
        confirmButtonColor: "#92400e",
      });

      setFormData({
        qrNumber: "",
        selectedItems: [],
        totalAmount: "",
        discount: "",
      });
      setErrors({});
      setSearchTerm("");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add bill",
        icon: "error",
        confirmButtonColor: "#92400e",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      qrNumber: "",
      selectedItems: [],
      totalAmount: "",
      discount: "",
    });
    setErrors({});
    setSearchTerm("");
    setShowDropdown(false);
    onClose();
  };

  if (!isOpen) return null;

  const netAmount =
    formData.totalAmount && formData.discount
      ? (
          parseFloat(formData.totalAmount) - parseFloat(formData.discount)
        ).toFixed(2)
      : "0.00";

  const itemsTotal = calculateItemsTotal();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Add New Bill
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* QR Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                QR Number
              </label>
              <input
                type="text"
                name="qrNumber"
                value={formData.qrNumber}
                onChange={handleInputChange}
                placeholder="e.g., QR-1234"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base ${
                  errors.qrNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.qrNumber && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.qrNumber}</span>
                </div>
              )}
            </div>

            {/* Items Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Items
              </label>
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-2 border border-gray-300 px-2 rounded-lg">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search items..."
                    className="flex-1 px-3 py-2 sm:py-3   focus:outline-none focus:ring-0 focus:ring-transparent text-sm sm:text-base"
                  />
                </div>

                {/* Dropdown */}
                {showDropdown && filteredItems.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleAddItem(item)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-50 border-b border-gray-200 last:border-b-0 transition-colors">
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">${item.price}</p>
                        </div>
                        <Plus size={18} className="text-[#009FF2]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.selectedItems && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.selectedItems}</span>
                </div>
              )}
            </div>

            {/* Selected Items List */}
            {formData.selectedItems.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Selected Items
                </h3>
                {formData.selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 gap-3">
                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 hover:bg-gray-100 rounded transition-colors text-gray-700 font-bold">
                        −
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-gray-100 rounded transition-colors text-gray-700 font-bold">
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right w-16">
                      <p className="text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors flex-shrink-0">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                ))}

                {/* Items Total */}
                {/* <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">
                    Items Total:
                  </span>
                  <span className="text-base font-bold ">
                    ${itemsTotal.toFixed(2)}
                  </span>
                </div> */}
              </div>
            )}

            {/* Amount and Discount */}
            <div className="grid grid-cols-2 gap-4">
              {/* Total Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Total Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="totalAmount"
                    value={itemsTotal}
                    readOnly
                    placeholder="24.99"
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base ${
                      errors.totalAmount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.totalAmount && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.totalAmount}</span>
                  </div>
                )}
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Discount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="6.99"
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base ${
                      errors.discount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.discount && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.discount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Net Amount Display */}
            {formData.totalAmount && formData.discount && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Net Amount</p>
                <p className="text-lg sm:text-xl font-bold text-green-700">
                  ${netAmount}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#009FF2] hover:bg-[#A16414] disabled:bg-[#009FF2] disabled:opacity-50 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              {loading ? "Adding Bill..." : "Add Bill"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBillModal;
