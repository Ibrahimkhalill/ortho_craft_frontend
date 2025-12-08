import { Edit2, Download, Clock, LogOut, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
const UserProfilePage = () => {
  const designs = [
    { name: "left_foot_insole.stl", size: "2.4 MB", time: "2 hours ago" },
    { name: "left_foot_insole.stl", size: "2.4 MB", time: "2 hours ago" },
    { name: "left_foot_insole.stl", size: "2.4 MB", time: "2 hours ago" },
  ];
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="container mx-auto space-y-8 py-8 px-4 sm:px-10 2xl:px-0 sm:py-12">
        {/* Basic Information */}
        <section className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Basic Information
            </h2>
          </div>

          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src="https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Sophia Alexa"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <button className="absolute bottom-2 right-2 bg-[#009FF2] p-3 rounded-full shadow-lg hover:bg-[#0088d1] transition">
                  <Edit2 size={20} className="text-white" />
                </button>
              </div>

              {/* Info Fields */}
              <div className="flex-1 space-y-6 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Sophia Alexa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009FF2] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="example@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="000-0000-000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009FF2] focus:border-transparent outline-none"
                  />
                </div>

                <button className="w-full float-end sm:w-auto bg-[#009FF2] hover:bg-[#0088d1] text-white font-semibold px-16 py-3 rounded-3xl cursor-pointer transition shadow-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Membership */}
        <section className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900">Membership</h2>
          </div>

          <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-gray-600">My Membership</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                Medium Membership Plan
              </p>
            </div>
            <button className="cursor-pointer px-8 py-3 border border-[#009FF2] text-[#009FF2] font-semibold rounded-full hover:bg-blue-50 transition">
              Upgrade Plan
            </button>
          </div>
        </section>

        {/* My Designs */}
        <section className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900">My Designs</h2>
          </div>

          <div className="p-8 space-y-4">
            {designs.map((design, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-[#009FF2] font-bold text-xs">3D</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{design.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {design.size} • {design.time}
                    </p>
                  </div>
                </div>

                <button className="text-[#009FF2] hover:bg-blue-50 p-3 rounded-full transition">
                  <Download size={22} />
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Security Settings
            </h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Password Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-2xl pr-12 focus:ring-2 focus:ring-[#009FF2] focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: !showPassword.current,
                      })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword.current ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-2xl pr-12 focus:ring-2 focus:ring-[#009FF2] focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: !showPassword.new,
                      })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword.new ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Re-enter Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-2xl pr-12 focus:ring-2 focus:ring-[#009FF2] focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword.confirm ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center ">
              <button className="cursor-pointer bg-[#009FF2] hover:bg-[#0088d1] text-white font-bold px-16 py-3 rounded-3xl shadow-lg hover:shadow-xl transition">
                Save
              </button>
            </div>
          </div>
        </section>
        <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold px-16 py-3  rounded-3xl shadow-lg hover:shadow-xl transition flex items-center gap-3">
          <LogOut size={22} />
          Log Out
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
