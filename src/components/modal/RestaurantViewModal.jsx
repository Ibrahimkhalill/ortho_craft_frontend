import { useEffect, useRef } from "react";
import { X, MapPin, Mail, Phone, CheckCircle } from "lucide-react";

const RestaurantModal = ({ isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        ref={dropdownRef}>
        {/* Header */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="p-6 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Sky Deck at The Bayleaf Hotel
            </h2>
            <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
              Burger
            </span>
          </div>
        </div>

        {/* Restaurant Image */}
        <div className="px-6">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="https://i.ytimg.com/vi/BCNrKMs7dcw/sddefault.jpg"
              alt="Burger King"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">123 Main St, Downtown</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">example@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">+1 (555) 123-4567</span>
          </div>
        </div>

        {/* Special Offer */}
        <div className="mx-6 my-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                Special Offer: 30% off on all Burgers
              </p>
              <p className="text-sm text-green-700 mt-1">
                Enjoy premium burgers made by our master chefs. Valid for
                dine-in. Offer not valid with take outs.
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 text-center mb-4">
            Scan this QR code at the restaurant to redeem
          </p>

          <div className="flex justify-center mb-4">
            <div className="relative bg-white p-4 rounded-lg border-2 border-gray-200">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BURGER-KING-DISCOUNT-30"
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
          </div>

          <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Claim QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
