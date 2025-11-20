import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import background from "../../assets/images/background.png";
import googleLogo from "../../assets/images/google-logo.png"; // Add Google logo SVG/PNG

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Your login API call here
      // await loginApi(data.email, data.password);

      localStorage.setItem("userEmail", data.email);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-[#111111]">Ortho Craft</h1>
          <p className="text-lg text-[#414141] mt-2">
            Sign up in to create an account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 focus:border-[#009FF2] focus:ring-2 focus:ring-[#0088d1] outline-none transition-all placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 focus:border-[#009FF2] focus:ring-2 focus:ring-[#0088d1] outline-none transition-all pr-12 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-10 text-gray-500 hover:text-[#009FF2]">
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              {...register("confirm_password", {
                required: "Confirm Password is required",
              })}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 focus:border-[#009FF2] focus:ring-2 focus:ring-[#0088d1] outline-none transition-all pr-12 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-10 text-gray-500 hover:text-[#009FF2]">
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold py-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70">
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => {
              // Google login logic
              toast("Google Sign-In coming soon!");
            }}
            className="w-full flex items-center justify-center gap-3 border-1 hover:bg-[#0088d1] hover:text-white text-gray-700 cursor-pointer border-gray-300 hover:border-gray-400 py-3.5 rounded-2xl transition-all">
            <img src={googleLogo} alt="Google" className="w-6 h-6" />
            <span className=" font-medium">Continue with Google</span>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className=" flex  items-center justify-center gap-2 mt-5">
          <p>Already have an account?</p>
          <Link to={"/user-signin"} className="text-[#0088d1]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
