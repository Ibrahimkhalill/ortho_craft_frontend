import { useState } from "react";
import { X, Upload } from "lucide-react";
import Swal from "sweetalert2";

const AddFoodItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    foodName: "",
    freeItem: "",
    price: "",
    discount: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please upload a JPG, PNG, or JPEG image",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "File size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.photo) {
        setErrors((prev) => ({
          ...prev,
          photo: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.foodName.trim()) {
      newErrors.foodName = "Food name is required";
    }

    if (!formData.freeItem.trim()) {
      newErrors.freeItem = "Free item is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.discount.trim()) {
      newErrors.discount = "Discount is required";
    } else if (isNaN(formData.discount) || parseFloat(formData.discount) < 0) {
      newErrors.discount = "Please enter a valid discount";
    }

    if (!formData.photo) {
      newErrors.photo = "Please upload a food photo";
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
      // Create FormData object for file upload
      const data = new FormData();
      data.append("foodName", formData.foodName);
      data.append("freeItem", formData.freeItem);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("photo", formData.photo);

      // Call the onSubmit callback
      await onSubmit(data);

      Swal.fire({
        title: "Success!",
        text: "Food item added successfully",
        icon: "success",
        confirmButtonColor: "#92400e",
      });

      // Reset form
      setFormData({
        foodName: "",
        freeItem: "",
        price: "",
        discount: "",
        photo: null,
      });
      setPreview(null);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add food item",
        icon: "error",
        confirmButtonColor: "#92400e",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      foodName: "",
      freeItem: "",
      price: "",
      discount: "",
      photo: null,
    });
    setPreview(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Add Food Item
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Upload Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full p-6 sm:p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#926427] hover:bg-[#F5F0E9] transition-colors">
                  {preview ? (
                    <div className="w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto mb-3"
                      />
                      <p className="text-xs sm:text-sm text-gray-600 text-center">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload
                        size={32}
                        className="text-gray-400 mx-auto mb-2"
                      />
                      <p className="text-sm font-semibold text-gray-900">
                        Upload
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG or JPEG
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {errors.photo && (
                <p className="text-red-600 text-xs sm:text-sm mt-2">
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Food Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Beef Cheese Burger"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#926427] text-sm sm:text-base ${
                  errors.foodName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.foodName && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.foodName}
                </p>
              )}
            </div>

            {/* Free Item */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Free Item
              </label>
              <input
                type="text"
                name="freeItem"
                value={formData.freeItem}
                onChange={handleInputChange}
                placeholder="e.g., French Fries"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#926427] text-sm sm:text-base ${
                  errors.freeItem ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.freeItem && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.freeItem}
                </p>
              )}
            </div>

            {/* Price and Discount in Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="24.99"
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#926427] text-sm sm:text-base ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.price}
                  </p>
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
                    className={`w-full pl-8 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#926427] text-sm sm:text-base ${
                      errors.discount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.discount && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.discount}
                  </p>
                )}
              </div>
            </div>

            {/* Net Price Display */}
            {formData.price && formData.discount && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  Net Price:{" "}
                  <span className="font-semibold">
                    $
                    {(
                      parseFloat(formData.price) - parseFloat(formData.discount)
                    ).toFixed(2)}
                  </span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#009FF2] hover:bg-[#926427] disabled:bg-[#009FF2] disabled:opacity-50 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              {loading ? "Adding Food Item..." : "Add Food Item"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFoodItemModal;
