import {
  CheckCircle2,
  Download,
  Home,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

const DownloadStep = () => {
  const activeStep = 4;

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Progress Bar – All Steps Completed */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#009FF2] text-white flex items-center justify-center text-sm font-bold">
                    <CheckCircle2 size={28} strokeWidth={3} />
                  </div>
                  <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-gray-600 font-medium">
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="w-full h-1 mx-6 bg-[#009FF2]"
                    style={{ width: "140px" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 text-center">
            {/* Success Title */}
            <h1 className="text-3xl sm:text-4xl  font-bold text-gray-900 mb-4">
              Your Insole is Ready!
            </h1>
            <p className="text-gray-600  mb-12">
              Download your custom insole files and send them to your 3D printer
            </p>

            {/* File Selection Card */}
            <div className="bg-gray-50 rounded-3xl p-10 mb-12">
              <h3 className="text-left  font-semibold text-gray-800 mb-6">
                Select Files to Download
              </h3>

              <div className="space-y-4">
                {files.map((file) => (
                  <label
                    key={file.name}
                    className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm hover:shadow transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        defaultChecked={file.checked}
                        className="w-6 h-6 text-[#009FF2] rounded focus:ring-[#009FF2]"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {file.description}
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {file.size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold  px-12 py-3 rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3">
                <Download size={24} />
                Download Selected Files
              </button>

              <button className="border border-gray-300 text-gray-700 font-semibold  px-10 py-3 rounded-3xl hover:bg-gray-50 transition flex items-center gap-2">
                <Home size={22} />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DownloadStep;
