import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import apiClient from "../../lib/api-client";
import { toast } from "react-toastify";
import background from "../../assets/images/background.png";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/forgot-password", {
        email: data.email,
      });
      toast.success("Password reset email sent successfully!");
      navigate("/otp", { state: { email: data.email } });
    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repeat bg-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg  bg-white  rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
        <div className="w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-[#111111] mb-2">
              Ortho Craft
            </h1>

            <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email",
                  },
                })}
                className="w-full px-4 py-2 mt-2 rounded-lg border border-[#B0B0B0] outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2]  text-sm sm:text-base"
              />
              {errors.email && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#009FF2] text-white py-2 rounded-lg cursor-pointer hover:bg-[#0088d1]  focus:outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base"
              disabled={isLoading}>
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
