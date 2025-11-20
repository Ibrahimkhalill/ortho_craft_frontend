import { useState } from "react";
import { X, Upload } from "lucide-react";

const AddRestaurantModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    category: "",
    location: "",
    email: "",
    phone: "",
    logo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Please upload a JPG, PNG, or JPEG image");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.restaurantName.trim()) {
      alert("Please enter restaurant name");
      return;
    }
    if (!formData.category.trim()) {
      alert("Please select a category");
      return;
    }
    if (!formData.location.trim()) {
      alert("Please enter location");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Please enter phone number");
      return;
    }
    if (!formData.logo) {
      alert("Please upload a restaurant logo");
      return;
    }

    setLoading(true);

    try {
      // Call the onSubmit callback with form data
      await onSubmit(formData);

      // Reset form
      setFormData({
        restaurantName: "",
        category: "",
        location: "",
        email: "",
        phone: "",
        logo: null,
      });
      setPreview(null);
      onClose();
    } catch (error) {
      console.error("Error adding restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      restaurantName: "",
      category: "",
      location: "",
      email: "",
      phone: "",
      logo: null,
    });
    setPreview(null);
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Add Restaurants
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Upload Logo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center w-full p-6 sm:p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#009FF2] hover:bg-[#F2EDE6] transition-colors">
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
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                placeholder="e.g., Burger King"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base"
              />
            </div>

            {/* Restaurant Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Restaurant Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base bg-white">
                <option value="">Select Category</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Seafood">Seafood</option>
                <option value="Dessert">Dessert</option>
                <option value="Cafe">Cafe</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., 123 Main St, Downtown"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., 000-0000-000"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F6226] text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#009FF2] hover:bg-amber-800 disabled:bg-[#009FF2] disabled:opacity-50 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              {loading ? "Adding Restaurant..." : "Add Restaurant"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRestaurantModal;
