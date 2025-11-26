import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const PreviewStep = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl">
          {/* Progress Bar - Responsive */}
          <div className="flex items-center justify-center mb-10 sm:mb-16">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                      num <= 3
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
                    className={`h-0.5 mx-3 sm:mx-8 w-[40px] sm:w-[200px] ${
                      num <= 3 ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-50 p-6 sm:p-10 md:p-12">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Preview Your Insole
            </h1>
            <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
              Review your customized insole design before downloading
            </p>

            {/* 3D Preview Area */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
                3D Preview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                {/* Left Foot */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md text-center">
                  <div className="mb-4 sm:mb-6 aspect-square max-w-sm mx-auto">
                    <model-viewer
                      src="https://ar-menu-bucket-jvai-files.s3.ap-south-1.amazonaws.com/static_files/right.glb"
                      alt="Left foot insole 3D model"
                      shadow-intensity="1"
                      camera-controls
                      touch-action="pan-y"
                      auto-rotate
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-2xl"
                    />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    Left foot insole
                  </p>
                </div>

                {/* Right Foot */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md text-center">
                  <div className="mb-4 sm:mb-6 aspect-square max-w-sm mx-auto">
                    <model-viewer
                      src="https://ar-menu-bucket-jvai-files.s3.ap-south-1.amazonaws.com/static_files/right.glb"
                      alt="Right foot insole 3D model"
                      shadow-intensity="1"
                      camera-controls
                      touch-action="pan-y"
                      auto-rotate
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-2xl"
                    />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    Right foot insole
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Files */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 mb-8">
              <h3 className="font-semibold text-lg mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {["foot_scan.jpg", "foot_scan.obj"].map((file) => (
                  <div key={file} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">
                      {file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 sm:px-8 py-4 rounded-3xl text-center font-medium mb-10 text-sm sm:text-base">
              Your design looks great! Click continue to download the files for
              3D printing.
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={() => navigate(-1)}
                className="order-2 sm:order-1 px-10 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-3xl cursor-pointer hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Previous
              </button>

              <button
                onClick={() => navigate("/custom/download")}
                className="order-1 sm:order-2 bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold px-12 py-3 rounded-3xl cursor-pointer shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
                Next
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PreviewStep;
