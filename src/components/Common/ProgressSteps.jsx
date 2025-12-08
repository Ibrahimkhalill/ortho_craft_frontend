// ProgressSteps.jsx

const stepsData = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Upload" },
  { id: 3, label: "Preview" },
  { id: 4, label: "Download" },
];

const ProgressSteps = ({ activeStep = 1 }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center justify-center mb-10 sm:mb-16">
        {stepsData.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="relative">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                  step.id <= activeStep
                    ? "bg-[#009FF2] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                {step.id}
              </div>

              {/* Step Label */}
              <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs whitespace-nowrap text-gray-600 font-medium hidden sm:block">
                {step.label}
              </p>
            </div>

            {/* Line Between Steps */}
            {index !== stepsData.length - 1 && (
              <div
                className={`h-0.5 mx-3 sm:mx-8 w-[37px] md:w-[130px] lg:w-[200px] xl:w-[270px] 2xl:w-[380px] ${
                  step.id < activeStep ? "bg-[#009FF2]" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
