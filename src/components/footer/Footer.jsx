import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F4C75] text-white py-16 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Column 1 - Logo & Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ortho Craft</h2>
            <p className="text-[#B0D4E8] text-sm leading-relaxed max-w-xs">
              Advanced custom orthopedic insole design platform for healthcare
              professionals and patients.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Pricing", "Custom"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${
                      link.toLowerCase() === "home" ? "" : link.toLowerCase()
                    }`}
                    className="text-[#B0D4E8] hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Support</h3>
            <ul className="space-y-3">
              {["About Us", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-[#B0D4E8] hover:text-white transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-[#B0D4E8]">
                <Mail size={18} />
                <span>example@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-[#B0D4E8]">
                <Phone size={18} />
                <span>000-0000-000</span>
              </li>
              <li className="flex items-start gap-3 text-[#B0D4E8]">
                <MapPin size={18} className="mt-0.5" />
                <span>
                  123 Medical Plaza, Healthcare City,
                  <br />
                  HC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-[#1E6FA0] text-center">
          <p className="text-[#B0D4E8] text-sm">
            © 2025 OrthoCraft. All rights reserved. Built with healthcare in
            mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
