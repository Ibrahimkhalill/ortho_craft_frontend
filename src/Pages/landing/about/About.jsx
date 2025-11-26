import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import AboutCoreValues from "./AboutCoreValues";
import AboutHero from "./AboutHero";
import AboutMission from "./AboutMission";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* 1. Hero Section with Stats */}
      <AboutHero />

      {/* 2. Our Mission with Image */}
      <AboutMission />

      {/* 3. Our Core Values Grid */}
      <AboutCoreValues />
      <Footer />
    </main>
  );
};

export default AboutPage;
