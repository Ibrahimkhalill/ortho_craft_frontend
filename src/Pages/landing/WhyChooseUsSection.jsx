import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import qualityImage from "../../assets/images/quality-insole.png"; // Your image of hand holding insole

const WhyChooseUsSection = () => {
  const benefits = [
    "Medical-grade precision",
    "HIPAA secure platform",
    "Cloud storage included",
    "FDA compliant processes",
    "24/7 customer support",
    "Multi-device access",
  ];

  return (
    <section className="w-full bg-white py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex">
              <span className="px-5 py-2 rounded-full bg-[#E6F5FF] text-[#009FF2] text-sm font-semibold border border-[#BCE3FA]">
                Why Choose Us
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl  font-bold text-gray-900 leading-tight">
              Healthcare-Grade Quality,
              <br />
              Consumer-Friendly Experience
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              We combine professional medical standards with an intuitive
              interface that anyone can use. Your data is secure, your designs
              are precise, and your results are guaranteed.
            </p>

            {/* Benefits List with Green Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/design"
                className="inline-flex items-center gap-3 bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Designing Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={qualityImage}
              alt="Professional holding custom orthopedic insole"
              className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
