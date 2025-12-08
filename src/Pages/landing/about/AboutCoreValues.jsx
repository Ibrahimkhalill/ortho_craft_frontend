import { Heart, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";

const AboutCoreValues = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description:
        "Every design decision prioritizes patient comfort and clinical outcomes",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI and 3D technology to advance orthopedic care",
    },
    {
      icon: ShieldCheck,
      title: "Quality & Safety",
      description:
        "Medical-grade materials and rigorous quality standards in every insole",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "Always evolving our platform based on clinician feedback and research",
    },
  ];

  return (
    <section className="w-full bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 sm:px-10 2xl:px-0">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 sm:text-lg text-sm max-w-3xl mx-auto">
            These principles guide everything we do, from product development to
            customer support
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl  md:p-8 p-6 shadow hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <div className="w-16 h-16 bg-[#009FF2] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Icon size={36} className="text-white" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutCoreValues;
