import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

const WelcomeStep = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content - Full height centering */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Progress Bar - Responsive */}
          <div className="flex items-center justify-center mb-10 sm:mb-16">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                      num === 1
                        ? "bg-[#009FF2] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                    {num}
                  </div>
                  <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs whitespace-nowrap text-gray-600 font-medium hidden sm:block">
                    {num === 1
                      ? "Welcome"
                      : num === 2
                      ? "Upload"
                      : num === 3
                      ? "Preview"
                      : "Download"}
                  </p>
                </div>

                {idx < 3 && (
                  <div
                    className={`h-0.5 mx-3 sm:mx-8 transition-all w-[40px] sm:w-[200px] ${
                      num === 1 ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card - Responsive Padding */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-50 p-6 sm:p-10 md:p-16 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Welcome to Ortho Craft Insole Creation Tool
            </h1>

            {/* Info Box */}
            <div className="bg-[#E6F5FF] rounded-3xl p-6 sm:p-8 md:p-12 text-left mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#009FF2] mb-5">
                Welcome! I will guide you through configuring your ideal insole.
                Let's get started!
              </h2>

              <div className="space-y-4 text-gray-700">
                <h3 className="font-bold text-base sm:text-lg">
                  Steps to follow:
                </h3>
                <ul className="space-y-2 list-disc list-inside text-sm sm:text-base">
                  <li>Upload your Footprint (2D / 3D)</li>
                  <li>Select Templates</li>
                  <li>Customize your Insole</li>
                  <li>Preview your insole design</li>
                  <li>Download the design ready for 3D printing</li>
                </ul>
              </div>

              <p className="text-gray-600 italic mt-5 text-sm sm:text-base">
                Based on your data, Ortho Craft will create a customized insole
                perfect for your feet.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/custom/upload")}
              className="w-full sm:w-auto bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold text-lg px-12 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
              Let's go
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WelcomeStep;
