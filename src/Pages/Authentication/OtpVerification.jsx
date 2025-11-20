import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import apiClient from "../../lib/api-client";
import toast from "react-hot-toast"; // ✅ correct import
import background from "../../assets/images/background.png";
const OtpVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/forgot_password");
  //   }
  // }, [email, navigate]);

  // Load timer from localStorage
  // Load timer from localStorage or start new timer
  useEffect(() => {
    const expiry = localStorage.getItem("otpExpiry");
    if (expiry) {
      const remaining = Math.floor((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
        setResendEnabled(false);
      } else {
        localStorage.removeItem("otpExpiry");
        setTimer(60); // start fresh 60s
        setResendEnabled(false);
        localStorage.setItem("otpExpiry", (Date.now() + 60000).toString());
      }
    } else {
      setTimer(60); // first time page load, start 60s
      setResendEnabled(false);
      localStorage.setItem("otpExpiry", (Date.now() + 60000).toString());
    }
  }, []);

  // Countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setResendEnabled(true);
            localStorage.removeItem("otpExpiry");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isComplete = otp.every((v) => v.trim().length === 1);
    if (!isComplete) {
      toast.error("Please fill all OTP fields");
      return;
    }

    const otpCode = otp.join("");
    setIsLoading(true);
    try {
      await apiClient.post("/auth/verify-password-reset-otp", {
        email,
        otp: otpCode,
      });
      toast.success("OTP verified successfully!");
      navigate("/reset_password", { state: { email, otp: otpCode } });
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendEnabled && !isLoading) {
      setIsLoading(true);
      try {
        await apiClient.post("/auth/forgot-password", { email });
        toast.success("New OTP sent successfully!");
        const expiryTime = Date.now() + 60 * 1000;
        localStorage.setItem("otpExpiry", expiryTime.toString());
        setTimer(60);
        setResendEnabled(false);
      } catch (error) {
        console.error(
          "Resend OTP Error:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message ||
            "Failed to resend OTP. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Input change
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto move next
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Backspace to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repea bg-gray-100 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg  bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
        <div className="w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold text-[#111111] mb-2">
              OTP verification
            </h1>

            <p className="text-start text-gray-600 text-sm sm:text-base mb-6">
              Please enter the four verification code we sent to
              example@gmail.com
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-start gap-2 sm:gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 sm:w-14 h-12 sm:h-14 text-center bg-[#C6E6F6] rounded-lg text-lg sm:text-xl outline-none focus:border-[#009FF2] focus:ring-2 focus:ring-[#009FF2]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#009FF2] text-white py-2 rounded-lg cursor-pointer hover:bg-[#0088d1]  focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base"
              disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <div className=" flex  items-center justify-center gap-2 mt-5">
            <p>Didn’t receive the OTP?</p>
            <Link to={"/user-signin"} className="text-[#0088d1]">
              Click to resend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
