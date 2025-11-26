import aboutImage from "../../../assets/images/insole-hero.png"; // ← your photo of hand holding insole

const AboutHero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#E6F5FF] via-[#F0FAFF] to-[#E6F5FF] py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left – Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Badge */}
              <span className="inline-block px-5 py-2 rounded-full bg-white text-[#009FF2] text-sm font-semibold border border-[#BCE3FA] shadow-sm">
                About Us
              </span>

              {/* Main Heading with Gradient */}
              <h1 className="text-4xl sm:text-5xl  font-bold leading-tight">
                Transforming <br />
                <span className="bg-gradient-to-r from-[#009FF2] to-[#00D4FF] bg-clip-text text-transparent">
                  Orthopedic Care
                </span>
                <br />
                Through Technology
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl">
                We’re on a mission to make custom orthopedic insoles accessible,
                affordable, and clinically superior through innovative 3D
                technology and AI-powered design.
              </p>
            </div>

            {/* Right – Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={aboutImage}
                alt="Custom orthopedic insole being placed in foot"
                className="w-full max-w-md lg:max-w-lg rounded-3xl  object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "10,000+", label: "Insoles Designed" },
              { number: "500+", label: "Healthcare Professionals" },
              { number: "98%", label: "Patient Satisfaction" },
              { number: "50+", label: "Countries Served" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <h3 className="text-4xl  font-bold bg-gradient-to-r from-[#009FF2] to-[#00D4FF] bg-clip-text text-transparent">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
