import { useState } from "react";
import { X, Check } from "lucide-react";

const defaultFeatures = [
  "2D Footprint Upload (JPG, PDF)",
  "Pre Modeled Elements",
  "Up to 20 Designs/Month",
  "3D Scan Upload (OBJ, STL)",
  "Auto Adjust Height & Thickness",
  "AI Optimization (Biomechanics)",
  "Pressure Map Validation",
];

export default function EditPlanModal({ isOpen, onClose, plan, onSave }) {
  const [planName, setPlanName] = useState(plan?.name || "");
  const [price, setPrice] = useState(plan?.price?.toString() || "");
  const [duration, setDuration] = useState(plan?.duration || "1 month");

  const [features, setFeatures] = useState(
    plan?.features?.filter((f) => f.enabled).map((f) => f.text) ||
      defaultFeatures.slice(0, 3)
  );

  if (!isOpen || !plan) return null;

  const handleToggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSave = () => {
    const updatedPlan = {
      ...plan,
      name: planName,
      price: parseInt(price) || 0,
      duration,
      features: defaultFeatures.map((text) => ({
        text,
        enabled: features.includes(text),
      })),
    };

    onSave(updatedPlan);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Edit Plan
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-2">
            {/* Plan Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Title
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009FF2] focus:border-transparent transition"
                placeholder="e.g., Basic"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                  $
                </span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009FF2] focus:border-transparent transition"
                  placeholder="20"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009FF2] focus:border-transparent transition"
                placeholder="1 month"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Features
              </label>
              <div className="">
                {defaultFeatures.map((feature) => {
                  const isEnabled = features.includes(feature);

                  return (
                    <label
                      key={feature}
                      className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl hover:bg-gray-50 transition">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                          isEnabled
                            ? "bg-[#009FF2] border-[#009FF2]"
                            : "border-gray-300 hover:border-gray-500"
                        }`}>
                        {isEnabled && (
                          <Check size={16} className="text-white" />
                        )}
                      </div>

                      <span
                        className={`text-gray-700 ${
                          !isEnabled && "text-gray-500"
                        }`}>
                        {feature}
                      </span>

                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handleToggleFeature(feature)}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="w-full bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold py-4 rounded-2xl transition shadow-lg flex items-center justify-center gap-2">
              Update Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
