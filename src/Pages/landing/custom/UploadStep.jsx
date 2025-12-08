import { useState, useRef } from "react";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Footprints,
  Lock,
} from "lucide-react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import ProgressSteps from "../../../components/Common/ProgressSteps";
import { useNavigate } from "react-router-dom";

const UploadStep = () => {
  const [activeTab, setActiveTab] = useState("2d");
  const [selectedFoot, setSelectedFoot] = useState(""); // "left" | "right" | "both" | ""
  const [patientName, setPatientName] = useState("");
  const [reference, setReference] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [footSelectionError, setFootSelectionError] = useState(false); // For visual feedback
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // Show error temporarily when trying to upload without selecting foot
  const triggerFootError = () => {
    setFootSelectionError(true);
    setTimeout(() => setFootSelectionError(false), 4000);
  };

  const handleFileSelect = (files) => {
    if (!selectedFoot) {
      triggerFootError();
      return;
    }

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB
      const isValidType =
        file.type.startsWith("image/") ||
        file.name.toLowerCase().endsWith(".obj") ||
        file.name.toLowerCase().endsWith(".stl") ||
        file.name.toLowerCase().endsWith(".ply") ||
        file.type === "application/pdf";

      return isValidSize && isValidType;
    });

    if (validFiles.length === 0) {
      alert(
        "No valid files found. Please check file type and size (max 50MB)."
      );
      return;
    }

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: activeTab.toUpperCase(),
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      time: "Just now",
      status: "completed",
      file,
    }));

    setUploadedFiles((prev) => [...newFiles, ...prev]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (selectedFoot) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (!selectedFoot) {
      triggerFootError();
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleNext = () => {
    if (!patientName || !reference || !selectedFoot) {
      alert("Please fill in all required fields including foot selection.");
      return;
    }
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one file.");
      return;
    }
    navigate("/custom/preview");
  };

  const handleUploadAreaClick = () => {
    if (!selectedFoot) {
      triggerFootError();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="w-full container mx-auto">
          {/* Progress Steps */}
          <ProgressSteps activeStep={2} />

          {/* Patient Details Card */}
          <div className="py-6 sm:py-8 w-full px-4 sm:px-6 lg:px-10 bg-white border border-gray-50 shadow rounded-2xl sm:rounded-3xl mb-4 sm:mb-6">
            <div className="pb-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 text-center sm:text-left">
                Patient Details
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="patient-name"
                  className="text-sm sm:text-base font-medium text-gray-700">
                  Patient's Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="patient-name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#B8B8B8] rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="reference"
                  className="text-sm sm:text-base font-medium text-gray-700">
                  Reference <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Reference ID"
                  id="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#B8B8B8] rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Main Upload Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-50 p-4 sm:p-6 lg:p-10 xl:p-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 text-center sm:text-left">
              Upload My Foot Data
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-center sm:text-left text-xs sm:text-sm lg:text-base">
              Upload your 2D footprints or 3D scans to begin creating your
              custom insoles
            </p>

            {/* Foot Selection */}
            <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="foot"
                  value="left"
                  checked={selectedFoot === "left"}
                  onChange={(e) => setSelectedFoot(e.target.value)}
                  className="w-5 h-5 text-[#009FF2] focus:ring-[#009FF2] accent-blue-500"
                />
                <span className="text-sm sm:text-base font-medium">
                  Left Foot
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="foot"
                  value="right"
                  checked={selectedFoot === "right"}
                  onChange={(e) => setSelectedFoot(e.target.value)}
                  className="w-5 h-5 text-[#009FF2] focus:ring-[#009FF2] accent-blue-500"
                />
                <span className="text-sm sm:text-base font-medium">
                  Right Foot
                </span>
              </label>
            </div>

            {/* Tabs */}
            <div className="flex mb-10 bg-[#E6F5FE] rounded-full p-1 max-w-full mx-auto sm:mx-0">
              <button
                onClick={() => setActiveTab("2d")}
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

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.obj,.stl,.ply"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
              className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 mb-8 sm:mb-10 text-center cursor-pointer transition-all ${
                selectedFoot
                  ? isDragging
                    ? "border-[#009FF2] bg-blue-50"
                    : "border-gray-300 hover:border-[#009FF2] hover:bg-gray-50"
                  : "border-gray-300 bg-gray-50 opacity-70 cursor-not-allowed"
              }`}>
              {/* Error Overlay */}
              {footSelectionError && (
                <div className="absolute inset-0 bg-red-100 bg-opacity-95 rounded-2xl sm:rounded-3xl flex items-center justify-center z-10 px-6">
                  <div className="text-center">
                    <X className="w-16 h-16 text-red-600 mx-auto mb-3" />
                    <p className="text-red-700 font-bold text-xl">
                      Please Select a Foot First!
                    </p>
                    <p className="text-red-600 mt-2">
                      Choose Left, Right, or Both Feet above
                    </p>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div
                className={`transition-opacity ${
                  footSelectionError ? "opacity-30" : "opacity-100"
                }`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#009FF2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
                  {selectedFoot
                    ? "Drop files here or click to upload"
                    : "First, select which foot(s)"}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-md mx-auto">
                  {selectedFoot
                    ? "Supports: JPG, PNG, PDF, OBJ, STL, PLY • Max 50MB per file"
                    : "You must select Left, Right, or Both Feet before uploading"}
                </p>
                <button
                  type="button"
                  disabled={!selectedFoot}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedFoot) fileInputRef.current?.click();
                  }}
                  className={`px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all cursor-pointer ${
                    selectedFoot
                      ? "bg-[#009FF2] hover:bg-[#0088d1] text-white shadow"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}>
                  {selectedFoot ? "Select Files" : "Select Foot First"}
                </button>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-[#E6F5FF] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 mb-8">
              <h3 className="font-bold text-base sm:text-lg mb-4">
                Upload Guidelines
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm list-disc pl-5">
                <li>
                  Ensure the footprint is clearly visible with good lighting
                </li>
                <li>Use a plain white or neutral background</li>
                <li>Include a reference object (ruler/coin) for scale</li>
                <li>Maximum file size: 50 MB per file</li>
              </ul>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3">Uploaded Files</h3>
                <p className="text-gray-600 text-sm mb-5">
                  {uploadedFiles.length} file
                  {uploadedFiles.length > 1 ? "s" : ""} uploaded
                </p>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="bg-gray-50 rounded-xl p-4 sm:p-5 flex items-center justify-between border border-gray-200">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {file.name}
                            <span className="ml-2 text-xs text-gray-500 font-normal">
                              {file.type}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            {file.size} • {file.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 hover:bg-gray-200 rounded-full transition">
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between mt-10">
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-10 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Previous
              </button>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold px-12 py-3 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
                Next
                <ArrowRight size={22} />
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
