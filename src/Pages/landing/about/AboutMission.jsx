import missionImage from "../../../assets/images/quality-insole.png"; // ← your photo

const AboutMission = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#E6F5FF] via-[#F0FAFF] to-[#E6F5FF] py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Content */}
          <div className="space-y-8">
            {/* Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#009FF2] rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We believe that every patient deserves access to high-quality,
                custom orthopedic solutions. Traditional orthotic manufacturing
                is slow, expensive, and often inconsistent. Our platform bridges
                the gap between clinical expertise and modern manufacturing
                technology.
              </p>
              <p>
                By empowering healthcare professionals with intuitive design
                tools, AI-powered optimization, and direct access to 3D
                manufacturing, we’re creating a future where personalized
                orthopedic care is the standard, not the exception.
              </p>
            </div>
          </div>

          {/* Right – Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={missionImage}
              alt="Healthcare professional fitting custom green insole"
              className="w-full max-w-lg rounded-3xl  object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
