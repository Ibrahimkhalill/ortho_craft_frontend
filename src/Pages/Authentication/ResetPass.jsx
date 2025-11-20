import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import apiClient from "../../lib/api-client";
import { toast } from "react-toastify";
import background from "../../assets/images/background.png";
const ResetPass = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";
  const otp = state?.otp || "";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password");

  // // Redirect if no email or OTP
  // useEffect(() => {
  //   if (!email || !otp) {
  //     navigate("/forgot_password");
  //   }
  // }, [email, otp, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/reset-password", {
        email,
        otp,
        newPassword: data.password,
      });
      toast.success("Password reset successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repea bg-gray-100 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-center  justify-center w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
        <div className="w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-[#111111]">Ortho Craft</h1>

            <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
              Enter your new password here
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  maxLength: { value: 10, message: "Maximum 10 characters" },
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-[#B0B0B0]"
                } outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2]  text-sm sm:text-base`}
              />
              {errors.password && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm sm:text-base mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please re-enter password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#B0B0B0]"
                } outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2]  text-sm sm:text-base`}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#009FF2] text-white py-2 rounded-lg hover:bg-[#0088d1] focus:outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2] cursor-pointer text-sm sm:text-base"
              disabled={isLoading || !isValid}>
              {isLoading ? "Resetting..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
