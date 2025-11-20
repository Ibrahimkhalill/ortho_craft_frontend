import { useState } from "react";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { Footprints, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const UploadStep = () => {
  const [activeTab, setActiveTab] = useState("2d");
  const [activeStep] = useState(2); // Step 2
  const navigate = useNavigate();
  const steps = [
    { number: 1, label: "Welcome", active: activeStep >= 1 },
    { number: 2, label: "Upload", active: true },
    { number: 3, label: "Preview", active: activeStep >= 3 },
    { number: 4, label: "Download", active: activeStep >= 4 },
  ];

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
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen  flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl px-8 md:px-12">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step.active
                        ? "bg-[#009FF2] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                    {step.number}
                  </div>
                  <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-gray-600">
                    {step.label}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-0.5 mx-6 transition-all ${
                      steps[index + 1].active ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                    style={{ width: "200px" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex mb-10 bg-[#E6F5FE] rounded-xl p-1 ">
            {/* 2D Footprint – Active */}
            <button
              onClick={() => setActiveTab("2d")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === "2d"
                  ? "bg-white text-[#009FF2] m-1 w-[50%] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              <Footprints size={20} />
              2D Footprint
            </button>

            {/* 3D Scan – Locked (Inactive) */}
            <button
              disabled
              className="flex items-center gap-3 px-8 py-4 rounded-full font-medium text-gray-500 cursor-not-allowed">
              <Lock size={20} />
              3D Scan
            </button>
          </div>
          {/* Main Content Card */}
          <div className=" rounded-3xl ">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Upload My Foot Data
            </h1>
            <p className="text-gray-600 mb-10">
              Upload your 2D footprints or 3D scans to begin creating your
              custom insoles
            </p>

            {/* Tabs */}

            {/* Drag & Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-16 mb-10 text-center">
              <div className="w-20 h-20 bg-[#009FF2] rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload size={40} className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drop files here or click to upload
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Supports: 2D scans (JPG, PNG, PDF) and 3D models (OBJ, STL, PLY)
                <br />
                Maximum file size: 50MB
              </p>

              <button className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold px-8 py-3 rounded-full transition">
                Select Files
              </button>
            </div>

            {/* Upload Guidelines */}
            <div className="bg-[#E6F5FF] rounded-3xl p-8 mb-10">
              <h3 className="font-bold text-lg mb-4">Upload Guidelines</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>
                  Ensure the footprint is clearly visible with good lighting
                </li>
                <li>Use a plain white or neutral background</li>
                <li>Include a reference object (ruler/coin) for scale</li>
                <li>Maximum file size: 25 MB per file</li>
              </ul>
            </div>

            {/* Upload History */}
            <div className="mb-12">
              <h3 className="font-bold text-lg mb-6">My Upload History</h3>
              <p className="text-gray-600 text-sm mb-6">
                Your recent uploads and processing status
              </p>

              <div className="space-y-4">
                {uploadHistory.map((file, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-[#E2E8F0] rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {file.name}
                          <span className="ml-3 text-sm font-normal text-gray-500">
                            {file.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {file.size} • {file.time}
                        </div>
                      </div>
                    </div>

                    {file.status === "completed" ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                      <Clock className="w-8 h-8 text-orange-500 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button className="px-12 py-3 border border-gray-300 text-gray-700 font-semibold cursor-pointer rounded-full hover:bg-gray-50 transition">
                Previous
              </button>

              <button
                onClick={() => navigate("/custom/preview")}
                className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold px-12 py-3 cursor-pointer rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition">
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
