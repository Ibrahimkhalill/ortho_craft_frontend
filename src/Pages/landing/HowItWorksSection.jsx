import { Scan, Palette, Zap } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Scan size={28} />,
      title: "Scan Your Feet",
      desc: "Use any 2D or 3D scanner to capture your foot data. Even smartphone photos work!",
    },
    {
      icon: <Palette size={28} />,
      title: "Design Your Insole",
      desc: "Customize every aspect with our intuitive design studio and AI-powered recommendations.",
    },
    {
      icon: <Zap size={28} />,
      title: "Get Results Fast",
      desc: "Download your files instantly — ready for 3D printing or professional manufacturing.",
    },
  ];

  return (
    <section className="w-full py-20  overflow-hidden">
      {/* Gradient Background */}
      <div className="bg-gradient-to-br from-[#E6F5FF] via-[#F0FAFF] to-[#E6F5FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm text-[#009FF2] text-sm font-semibold border border-[#BCE3FA] shadow-sm">
              Process
            </span>
          </div>

          {/* Main Heading with Gradient */}
          <h2 className="text-4xl  font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-[#009FF2] to-[#00D4FF] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-center text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Get your custom insoles in three simple steps
          </p>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#009FF2] to-[#00C4FF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <div className="text-white">{step.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
