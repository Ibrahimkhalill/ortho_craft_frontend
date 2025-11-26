import { CheckCircle2, Download, Home } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-gray-50">
      <Navbar />

      <div className="min-h-screen flex sm:items-center sm:justify-center px-3 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-5xl">
          {/* Progress Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#009FF2] text-white flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-gray-600 font-medium whitespace-nowrap">
                    {step.label}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="h-1 ml-5 bg-[#009FF2] w-10 sm:w-52"></div>
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-50 p-6 sm:p-10 md:p-14 text-center">
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
              Your Insole is Ready!
            </h1>
            <p className="text-gray-600 mb-10 sm:mb-12 text-sm sm:text-base">
              Download your custom insole files and send them to your 3D printer
            </p>

            {/* File Selection */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 mb-10">
              <h3 className="text-left font-semibold text-gray-800 mb-5 sm:mb-6">
                Select Files to Download
              </h3>

              <div className="space-y-4">
                {files.map((file) => (
                  <label
                    key={file.name}
                    className="flex flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        defaultChecked={file.checked}
                        className="w-5 h-5 sm:w-6 sm:h-6 accent-blue-500"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base break-all">
                          {file.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {file.description}
                        </div>
                      </div>
                    </div>

                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {file.size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center">
              <button className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold w-full sm:w-auto px-10 py-3 rounded-3xl shadow-lg flex items-center justify-center gap-3">
                <Download size={22} />
                Download Selected Files
              </button>

              <button
                onClick={() => navigate("/")}
                className="border border-gray-300 text-gray-700 font-semibold w-full sm:w-auto px-8 py-3 rounded-3xl hover:bg-gray-50 flex items-center justify-center gap-2">
                <Home size={20} />
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
