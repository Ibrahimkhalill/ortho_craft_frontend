import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import ThreeViewer from "../../../components/3dviewer/ThreeViewer";
import { useNavigate } from "react-router-dom";

const PreviewStep = () => {
  const activeStep = 3;
  const navigate = useNavigate();
  const steps = [
    { number: 1, label: "Welcome", active: activeStep >= 1 },
    { number: 2, label: "Upload", active: activeStep >= 2 },
    { number: 3, label: "Preview", active: true },
    { number: 4, label: "Download", active: activeStep >= 4 },
  ];

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-14">
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
                      step.active ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                    style={{ width: "220px" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-10 ">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
              Preview Your Insole
            </h1>
            <p className="text-center text-gray-600 mb-12">
              Review your customized insole design before downloading
            </p>

            {/* 3D Preview Area */}
            <div className="bg-gray-50 rounded-3xl p-10 mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-8">
                3D Preview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Foot */}
                <div className="bg-white rounded-3xl p-4 shadow-md text-center">
                  <div className="mb-6">
                    <model-viewer
                      id="modelviewer"
                      src="https://ar-menu-bucket-jvai-files.s3.ap-south-1.amazonaws.com/static_files/right.glb"
                      shadow-intensity="1"
                      camera-controls
                      touch-action="pan-y"
                      auto-rotate
                      ar
                      skybox-height="2m"
                      max-camera-orbit="auto  auto"
                      ar-modes="scene-viewer quick-look webxr"
                      style={{ width: "100%", height: "350px" }}
                      className=""></model-viewer>
                  </div>
                  <p className="text-lg font-medium text-gray-800">
                    Left foot insole
                  </p>
                </div>

                {/* Right Foot */}
                <div className="bg-white rounded-3xl p-4 shadow-md text-center">
                  <div className="mb-6">
                    <model-viewer
                      id="modelviewer"
                      src="https://ar-menu-bucket-jvai-files.s3.ap-south-1.amazonaws.com/static_files/right.glb"
                      shadow-intensity="1"
                      camera-controls
                      touch-action="pan-y"
                      auto-rotate
                      ar
                      skybox-height="2m"
                      max-camera-orbit="auto  auto"
                      ar-modes="scene-viewer quick-look webxr"
                      style={{ width: "100%", height: "350px" }}
                      className=""></model-viewer>
                  </div>
                  <p className="text-lg font-medium text-gray-800">
                    Right foot insole
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Files */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-10">
              <h3 className="font-semibold text-lg mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {["foot_scan.jpg", "foot_scan.obj"].map((file) => (
                  <div key={file} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 text-green-700 px-8 py-4 rounded-full text-center font-medium mb-12">
              Your design looks great! Click continue to download the files for
              3D printing.
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button className="px-12 py-3 border border-gray-300 cursor-pointer text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition">
                <div className="flex items-center gap-2">
                  <ArrowLeft size={20} />
                  Previous
                </div>
              </button>

              <button
                onClick={() => navigate("/custom/download")}
                className="bg-[#009FF2] hover:bg-[#0088d1] text-white cursor-pointer font-bold px-14 py-3 rounded-full shadow hover:shadow-xl transition flex items-center gap-3">
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
