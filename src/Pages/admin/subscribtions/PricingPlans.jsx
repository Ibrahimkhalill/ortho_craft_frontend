import { useState, useEffect } from "react";
import { Check, X, Edit2, Save, RotateCcw } from "lucide-react";
import EditPlanModal from "../../../components/modal/EditPlanModal";

const defaultPlans = [
  {
    name: "Basic",
    price: 20,
    features: [
      {
        text: "2D Footprint Upload (JPG, PDF)",
        basic: true,
        medium: true,
        pro: true,
      },
      { text: "Pre Modeled Elements", basic: true, medium: true, pro: true },
      { text: "Up to 20 Designs/Month", basic: true, medium: true, pro: true },
      {
        text: "3D Scan Upload (OBJ, STL)",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "Auto Adjust Height & Thickness",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "AI Optimization (Biomechanics)",
        basic: false,
        medium: false,
        pro: true,
      },
      {
        text: "Pressure Map Validation",
        basic: false,
        medium: false,
        pro: true,
      },
    ],
  },
  {
    name: "Medium",
    price: 60,
    features: [
      {
        text: "2D Footprint Upload (JPG, PDF)",
        basic: true,
        medium: true,
        pro: true,
      },
      { text: "Pre Modeled Elements", basic: true, medium: true, pro: true },
      { text: "Up to 20 Designs/Month", basic: true, medium: true, pro: true },
      {
        text: "3D Scan Upload (OBJ, STL)",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "Auto Adjust Height & Thickness",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "AI Optimization (Biomechanics)",
        basic: false,
        medium: false,
        pro: true,
      },
      {
        text: "Pressure Map Validation",
        basic: false,
        medium: false,
        pro: true,
      },
    ],
  },
  {
    name: "Pro",
    price: 120,
    features: [
      {
        text: "2D Footprint Upload (JPG, PDF)",
        basic: true,
        medium: true,
        pro: true,
      },
      { text: "Pre Modeled Elements", basic: true, medium: true, pro: true },
      { text: "Up to 20 Designs/Month", basic: true, medium: true, pro: true },
      {
        text: "3D Scan Upload (OBJ, STL)",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "Auto Adjust Height & Thickness",
        basic: false,
        medium: true,
        pro: true,
      },
      {
        text: "AI Optimization (Biomechanics)",
        basic: false,
        medium: false,
        pro: true,
      },
      {
        text: "Pressure Map Validation",
        basic: false,
        medium: false,
        pro: true,
      },
    ],
  },
];

const PricingPlans = () => {
  const [plans, setPlans] = useState(defaultPlans);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  useEffect(() => {
    const savedPlans = localStorage.getItem("ortho-pricing-plans");
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  const handlePriceChange = (index, value) => {
    const updated = [...plans];
    updated[index].price = parseInt(value) || 0;
    setPlans(updated);
  };

  const toggleFeature = (planIndex, featureIndex, planKey) => {
    const updated = [...plans];
    updated[planIndex].features[featureIndex][planKey] =
      !updated[planIndex].features[featureIndex][planKey];
    setPlans(updated);
  };

  const renderPlan = (plan) => {
    const key = plan.name.toLowerCase(); // "basic", "medium", "pro"

    return (
      <div
        key={plan.name}
        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>

          <div className="mt-6">
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-black text-gray-900">
                ${plan.price}
              </span>
              <span className="text-xl text-gray-600 ml-2">/month</span>
            </div>
          </div>
        </div>

        <ul className="space-y-5 mb-10">
          {plan.features.map((feature, fIdx) => (
            <li key={fIdx} className="flex items-start gap-3">
              {feature[key] ? (
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
              )}

              <span
                className={`text-base ${
                  feature[key] ? "text-gray-700" : "text-gray-400"
                }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => openEditModal(plan)}
          className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <Edit2 size={20} />
          Edit Plan
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Subscription Plans
            </h1>
            <p className="text-gray-600 mt-2">
              Manage pricing and features for each plan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
          {plans.map(renderPlan)}
        </div>
      </div>
      <EditPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
      />
    </>
  );
};

export default PricingPlans;
