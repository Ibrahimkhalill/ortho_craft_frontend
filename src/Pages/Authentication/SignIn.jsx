import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
// import apiClient from "../../lib/api-client";
// import { setAuthTokens } from "../../lib/cookie-utils";
import toast from "react-hot-toast";
import background from "../../assets/images/background.png";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // const response = await apiClient.post("/auth/login", {
      //   email: data.email,
      //   password: data.password,
      //   role: data.role,
      // });

      // const { accessToken, refreshToken } = response.data.data;

      // // টোকেন সেভ
      // setAuthTokens(accessToken, refreshToken);

      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);
      toast.success("Login successful!");

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/restaurant/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${background})` }}>
      {/* Form Container */}
      <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-[#111111]">Ortho Craft</h1>
            <h2 className="text-lg font-semibold mb-6 text-[#414141]">
              Sign in to manage your website
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-gray-600 text-sm sm:text-base">Role</label>
              <select
                {...register("role", { required: "Please select your role" })}
                className="w-full px-4 py-3 rounded-[12px] border border-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#A16414] bg-white text-gray-700 text-sm sm:text-base"
                defaultValue="">
                <option value="" disabled>
                  Select your role
                </option>
                <option value="admin">Admin</option>
                <option value="restaurant">Restaurant</option>
                <option value="User">User</option>
              </select>
              {errors.role && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 rounded-[12px] border border-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#A16414] transition-all text-sm sm:text-base"
              />
              {errors.email && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-gray-600 text-sm sm:text-base">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-3 rounded-[12px] border border-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#A16414] text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500 hover:text-[#A16414] transition-colors">
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <a
                href="/forgot_password"
                className="text-[#009FF2] hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#A16414] hover:bg-[#009FF2] disabled:bg-[#b8860b] text-white font-medium py-3 rounded-[12px] transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
