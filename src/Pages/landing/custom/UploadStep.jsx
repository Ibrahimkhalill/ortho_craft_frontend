import { useState } from "react";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Footprints,
  Lock,
} from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const UploadStep = () => {
  const [activeTab] = useState("2d");
  const navigate = useNavigate();

  const uploadHistory = [
    {
      name: "foot_scan.jpg",
      type: "2D",
      size: "2.4 MB",
      time: "2 hours ago",
      status: "completed",
    },
    {
      name: "foot_scan.obj",
      type: "3D",
      size: "12.4 MB",
      time: "Just now",
      status: "processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          {/* Progress Bar - Responsive */}
          <div className="flex items-center justify-center mb-10 sm:mb-16">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                      num <= 2
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
                      num <= 2 ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-50 p-6 sm:p-10 md:p-12">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left">
              Upload My Foot Data
            </h1>
            <p className="text-gray-600 mb-8 text-center sm:text-left text-sm sm:text-base">
              Upload your 2D footprints or 3D scans to begin creating your
              custom insoles
            </p>

            {/* Tabs - Fixed & Responsive */}
            <div className="flex mb-10 bg-[#E6F5FE] rounded-full p-1 max-w-full mx-auto sm:mx-0">
              <button
                className={`flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all flex-1 ${
                  activeTab === "2d"
                    ? "bg-white text-[#009FF2] shadow-sm"
                    : "text-gray-500"
                }`}>
                <Footprints size={20} />
                <span className="hidden sm:inline">2D Footprint</span>
                <span className="sm:hidden">2D</span>
              </button>

              <button
                disabled
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-gray-500 cursor-not-allowed flex-1">
                <Lock size={20} />
                <span className="hidden sm:inline">3D Scan</span>
                <span className="sm:hidden">3D</span>
              </button>
            </div>

            {/* Drag & Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 sm:p-16 mb-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#009FF2] rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload size={36} sm={{ size: 40 }} className="text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-6 max-w-md mx-auto">
                Supports: 2D scans (JPG, PNG, PDF) and 3D models (OBJ, STL, PLY)
                <br className="hidden sm:block" />
                Maximum file size: 50MB
              </p>
              <button className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold px-8 py-3 cursor-pointer rounded-3xl transition">
                Select Files
              </button>
            </div>

            {/* Guidelines */}
            <div className="bg-[#E6F5FF] rounded-3xl p-6 sm:p-8 mb-10">
              <h3 className="font-bold text-lg mb-4">Upload Guidelines</h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base list-disc list-inside">
                <li>
                  Ensure the footprint is clearly visible with good lighting
                </li>
                <li>Use a plain white or neutral background</li>
                <li>Include a reference object (ruler/coin) for scale</li>
                <li>Maximum file size: 25 MB per file</li>
              </ul>
            </div>

            {/* Upload History */}
            <div className="mb-10">
              <h3 className="font-bold text-lg mb-4">My Upload History</h3>
              <p className="text-gray-600 text-sm mb-6">
                Your recent uploads and processing status
              </p>
              <div className="space-y-4">
                {uploadHistory.map((file) => (
                  <div
                    key={file.name}
                    className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          {file.name}
                          <span className="ml-2 text-xs sm:text-sm text-gray-500">
                            {file.type}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {file.size} • {file.time}
                        </div>
                      </div>
                    </div>
                    {file.status === "completed" ? (
                      <CheckCircle2 className="w-7 h-7 text-green-500" />
                    ) : (
                      <Clock className="w-7 h-7 text-orange-500 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={() => navigate(-1)}
                className="order-2 cursor-pointer sm:order-1 px-10 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Previous
              </button>

              <button
                onClick={() => navigate("/custom/preview")}
                className="order-1 cursor-pointer sm:order-2 bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold px-12 py-3 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
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

export default UploadStep;
