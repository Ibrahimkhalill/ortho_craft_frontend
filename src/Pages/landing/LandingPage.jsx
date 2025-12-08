import insoleImage from "../../assets/images/insole-hero.png"; // Your foot + insole image;
import Footer from "../../components/footer/Footer";
import { Sparkles } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { Upload, SlidersHorizontal, Download } from "lucide-react";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

export default function ChoosLanding() {
  const features = [
    {
      icon: <Upload size={28} />,
      title: "Upload Your Data",
      desc: "Upload 2D footprints or 3D scans from any device. Supports JPG, PNG, PDF, STL, OBJ, and PLY formats.",
    },
    {
      icon: <SlidersHorizontal size={28} />,
      title: "Customize Design",
      desc: "Adjust height, thickness, arch support, and pressure zones with intuitive controls and real-time 3D preview.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "AI Optimization",
      desc: "Let our AI analyze biomechanics and automatically optimize your insole design for maximum comfort and support.",
    },
    {
      icon: <Download size={28} />,
      title: "Export Design",
      desc: "Download production-ready files in multiple formats. Ready for 3D printing or professional manufacturing.",
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen ">
        {/* Hero Section */}
        <Navbar />
        <section className="w-full overflow-hidden ">
          {/* Light Blue Gradient Background */}
          <div className="bg-gradient-to-br from-[#E6F5FF] via-[#F0FAFF] to-[#E6F5FF]">
            <div className=" container mx-auto px-4 sm:px-10 2xl:px-0 py-16 md:py-24 ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8 lg:space-y-10">
                  {/* Main Heading with Gradient Text */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold leading-tight">
                    Custom Orthopedic
                    <br />
                    Insoles,{" "}
                    <span className="bg-gradient-to-r from-[#2ED9D9] to-[#2ED9D9] bg-clip-text text-transparent">
                      Designed by You
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Create perfectly fitted custom insoles using advanced 3D
                    technology and AI-powered biomechanical analysis.
                    Professional results, accessible to everyone.
                  </p>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      to="/custom" // or "/chat", "/upload-foot-scan", etc.
                      className="inline-flex items-center gap-2 sm:gap-3 bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Start Designing Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right Side - Image + Badge */}
                <div className="relative flex justify-center lg:justify-end">
                  {/* Main Insole Image */}
                  <div className="relative">
                    <img
                      src={insoleImage}
                      alt="Custom orthopedic insole being placed in shoe"
                      className="w-full max-w-2xl rounded-3xl object-cover"
                    />

                    {/* Floating Badge - 10,000+ Insoles Designed */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-10 lg:right-auto lg:-translate-x-0 lg:-bottom-10 lg:-left-20 bg-white rounded-2xl shadow px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 border border-gray-100 whitespace-nowrap">
                      <div className="p-2 sm:p-3 bg-[#009FF2] rounded-xl">
                        <Sparkles
                          size={18}
                          className="text-[#FFFFFF] sm:w-5 sm:h-5"
                        />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          10,000+
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Insoles Designed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-10 2xl:px-0">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#E6F5FF] text-[#009FF2] text-sm font-medium border border-[#BCE3FA]">
                Features
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Everything You Need
            </h2>

            {/* Subheading */}
            <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 md:mb-20">
              Professional-grade tools and AI technology to create perfect
              custom insoles
            </p>

            {/* Features Grid - 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white md:p-8 p-6 rounded-3xl shadow hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#009FF2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl  font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Promote Your Place Section */}
        <WhyChooseUsSection />

        <Footer />
      </div>
    </>
  );
}
