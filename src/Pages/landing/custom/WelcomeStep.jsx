import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const WelcomeStep = () => {
  const [activeStep] = useState(1); // Step 1
  const navigate = useNavigate();
  const steps = [
    { number: 1, label: "Welcome", active: true },
    { number: 2, label: "Upload", active: activeStep >= 2 },
    { number: 3, label: "Preview", active: activeStep >= 3 },
    { number: 4, label: "Download", active: activeStep >= 4 },
  ];

  return (
    <div className=" bg-gray-50">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
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
                    className={`h-0.5 mx-4 transition-all duration-500 ${
                      steps[index + 1].active ? "bg-[#009FF2]" : "bg-gray-300"
                    }`}
                    style={{ width: "120px" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center">
            <h1 className="text-3xl  font-bold text-gray-900 mb-8">
              Welcome to Ortho Craft Insole Creation Tool
            </h1>

            <div className="bg-[#E6F5FF] rounded-3xl p-8 md:p-12 mb-10 text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-[#009FF2] mb-6">
                Welcome! I will guide you through configuring your ideal insole.
                Let's get started!
              </h2>

              <div className="space-y-3 text-gray-700 mb-6">
                <h3 className="font-semibold text-lg">Steps to follow:</h3>
                <ul className="space-y-2 list-disc list-inside text-base">
                  <li>Upload your Footprint (2D / 3D)</li>
                  <li>Select Templates</li>
                  <li>Customize your Insole</li>
                  <li>Preview your insole design</li>
                  <li>Download the design ready for 3D printing</li>
                </ul>
              </div>

              <p className="text-gray-600 italic">
                Based on your data, Ortho Craft will create a customized insole
                perfect for your feet.
              </p>
            </div>

            <button
              onClick={() => navigate("/custom/upload")}
              className="bg-[#009FF2] hover:bg-[#0088d1] cursor-pointer text-white font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
              Let's go <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomeStep;
