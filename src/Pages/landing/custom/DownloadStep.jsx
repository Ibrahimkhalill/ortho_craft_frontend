import { CheckCircle2, Download, Home } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "../../../components/Common/ProgressSteps";

const DownloadStep = () => {
  const navigate = useNavigate();
  const steps = [
    { number: 1, label: "Welcome", active: true },
    { number: 2, label: "Upload", active: true },
    { number: 3, label: "Preview", active: true },
    { number: 4, label: "Download", active: true },
  ];

  const files = [
    {
      name: "insole_design.gcode",
      description: "3D model file for printing",
      size: "12.9MB",
      checked: true,
    },
    {
      name: "insole_design.obj",
      description: "3D model with texture support",
      size: "12.9MB",
      checked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar placeholder */}
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-5 md:px-10 py-8 sm:py-12">
        <div className="w-full container mx-auto">
          {/* Progress Bar */}
          <ProgressSteps activeStep={4} />

          {/* Main Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-5 sm:p-8 md:p-10 lg:p-14 text-center">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
              Your Insole is Ready!
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-xs sm:text-sm md:text-base px-2">
              Download your custom insole files and send them to your 3D printer
            </p>

            {/* File Selection */}
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 md:mb-10">
              <h3 className="text-left font-semibold text-gray-800 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg">
                Select Files to Download
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {files.map((file) => (
                  <label
                    key={file.name}
                    className="flex flex-row items-center justify-between gap-3 xs:gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 sm:gap-4 w-full xs:w-auto">
                      <input
                        type="checkbox"
                        defaultChecked={file.checked}
                        className="w-5 h-5  mt-0.5 xs:mt-0 accent-blue-500 flex-shrink-0"
                      />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base break-words">
                          {file.name}
                        </div>
                        <div className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5">
                          {file.description}
                        </div>
                      </div>
                    </div>

                    <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base  xs:ml-0 flex-shrink-0">
                      {file.size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-center items-stretch sm:items-center">
              <button className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold w-full  sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3 rounded-2xl sm:rounded-3xl shadow hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Selected Files
              </button>

              <button
                onClick={() => navigate("/")}
                className="border-2 border-gray-300 text-gray-700 font-semibold w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DownloadStep;
