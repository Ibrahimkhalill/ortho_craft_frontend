import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

const ResSettingsPage = () => {
  // Account Information State
  const [accountForm, setAccountForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [accountErrors, setAccountErrors] = useState({});
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");

  // Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [securityErrors, setSecurityErrors] = useState({});
  const [securityLoading, setSecurityLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Account Information Handlers
  const handleAccountInputChange = (e) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (accountErrors[name]) {
      setAccountErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateAccountForm = () => {
    const errors = {};

    if (!accountForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountForm.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!accountForm.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    return errors;
  };

  const handleSaveAccountChanges = async (e) => {
    e.preventDefault();
    const errors = validateAccountForm();

    if (Object.keys(errors).length > 0) {
      setAccountErrors(errors);
      return;
    }

    setAccountLoading(true);
    setAccountMessage("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/account/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountForm),
      });

      if (!response.ok) throw new Error("Failed to update account");

      Swal.fire({
        title: "Success!",
        text: "Account information updated successfully",
        icon: "success",
        confirmButtonColor: "#92400e",
      });

      setAccountMessage("Account updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update account information",
        icon: "error",
        confirmButtonColor: "#92400e",
      });
    } finally {
      setAccountLoading(false);
    }
  };

  // Security Handlers
  const handleSecurityInputChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (securityErrors[name]) {
      setSecurityErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateSecurityForm = () => {
    const errors = {};

    if (!securityForm.currentPassword.trim()) {
      errors.currentPassword = "Current password is required";
    }

    if (!securityForm.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (securityForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!securityForm.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (securityForm.newPassword !== securityForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSaveSecurityChanges = async (e) => {
    e.preventDefault();
    const errors = validateSecurityForm();

    if (Object.keys(errors).length > 0) {
      setSecurityErrors(errors);
      return;
    }

    setSecurityLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/security/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword,
        }),
      });

      if (!response.ok) throw new Error("Failed to change password");

      Swal.fire({
        title: "Success!",
        text: "Password changed successfully",
        icon: "success",
        confirmButtonColor: "#92400e",
      });

      // Reset form
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to change password",
        icon: "error",
        confirmButtonColor: "#92400e",
      });
    } finally {
      setSecurityLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const FormInput = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    placeholder,
    icon: Icon,
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {Icon && (
          <button
            type="button"
            onClick={() => Icon()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
            {Icon()}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-8 md:space-y-12 max-w-4xl mx-auto">
      {/* Account Information Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Account Information
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Update your account details
          </p>
        </div>

        <form onSubmit={handleSaveAccountChanges} className="space-y-6">
          <FormInput
            label="Resturant Name"
            name="resturant_name"
            type="text"
            value={accountForm.name}
            onChange={handleAccountInputChange}
            error={accountErrors.name}
            placeholder="Pizza Burg"
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={accountForm.email}
            onChange={handleAccountInputChange}
            error={accountErrors.email}
            placeholder="example@gmail.com"
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={accountForm.phone}
            onChange={handleAccountInputChange}
            error={accountErrors.phone}
            placeholder="000-0000-000"
          />

          {accountMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{accountMessage}</p>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={accountLoading}
              className="px-6 py-2 sm:py-3 bg-[#009FF2] hover:bg-[#926427] cursor-pointer disabled:bg-[#009FF2] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
              {accountLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl  font-bold text-gray-900">Security</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Manage password and security settings
          </p>
        </div>

        <form onSubmit={handleSaveSecurityChanges} className="space-y-6">
          {/* Current Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={securityForm.currentPassword}
                onChange={handleSecurityInputChange}
                placeholder="Enter Password"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base pr-12 ${
                  securityErrors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPasswords.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {securityErrors.currentPassword && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                <AlertCircle size={16} />
                <span>{securityErrors.currentPassword}</span>
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={securityForm.newPassword}
                onChange={handleSecurityInputChange}
                placeholder="Enter New Password"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base pr-12 ${
                  securityErrors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {securityErrors.newPassword && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                <AlertCircle size={16} />
                <span>{securityErrors.newPassword}</span>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={securityForm.confirmPassword}
                onChange={handleSecurityInputChange}
                placeholder="Re-enter Password"
                className={`w-full px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base pr-12 ${
                  securityErrors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPasswords.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {securityErrors.confirmPassword && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-xs sm:text-sm">
                <AlertCircle size={16} />
                <span>{securityErrors.confirmPassword}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={securityLoading}
              className="px-6 py-2 sm:py-3 bg-[#009FF2] hover:bg-[#926427] cursor-pointer disabled:bg-[#009FF2] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
              {securityLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResSettingsPage;
