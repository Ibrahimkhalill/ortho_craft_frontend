import { Check, X } from "lucide-react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

const PricingPage = () => {
  const plans = [
    {
      name: "Basic",
      price: 20,
      period: "/month",
      features: [
        { text: "2D Footprint Upload (JPG, PDF)", included: true },
        { text: "Pre Modeled Elements", included: true },
        { text: "Up to 5 Designs/Month", included: true },
        { text: "3D Scan Upload", included: false },
        { text: "Auto Modeling", included: false },
      ],
      buttonText: "Select Plan",
      isCurrent: false,
    },
    {
      name: "Medium",
      price: 60,
      period: "/month",
      features: [
        { text: "2D Footprint Upload (JPG, PDF)", included: true },
        { text: "Pre Modeled Elements", included: true },
        { text: "Up to 20 Designs/Month", included: true },
        { text: "3D Scan Upload (OBJ, STL)", included: true },
        { text: "Auto Modeling", included: false },
      ],
      buttonText: "Current Plan",
      isCurrent: true,
    },
    {
      name: "Pro",
      price: 120,
      period: "/month",
      features: [
        { text: "2D Footprint Upload (JPG, PDF)", included: true },
        { text: "Fully Customizable Models", included: true },
        { text: "Up to 50 Designs/Month", included: true },
        { text: "3D Scan Upload (OBJ, STL)", included: true },
        { text: "Auto Modeling", included: true },
      ],
      buttonText: "Select Plan",
      isCurrent: false,
    },
  ];

  return (
    <div className="bg-gray-50">
      <Navbar />
      <section className="w-full py-20 md:py-28 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl  font-bold text-gray-900 mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-16">
            Select the plan that best fits your needs. Upgrade or downgrade at
            any time.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border ${
                  plan.isCurrent
                    ? "border-[#009FF2] border-2"
                    : "border-gray-200"
                }`}>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-lg">{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                      <span
                        className={`text-base ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-lg cursor-pointer transition-all duration-300 ${
                    plan.isCurrent
                      ? "bg-[#009FF2] text-white hover:bg-[#0088d1]"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  disabled={plan.isCurrent}>
                  {plan.buttonText}
                </button>

                {/* Current Plan Badge */}
                {plan.isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#009FF2] text-white text-sm font-medium px-4 py-1.5 rounded-xl">
                      Current Plan
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
