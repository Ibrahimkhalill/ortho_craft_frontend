// pages/ChatPage.jsx
import React, { useState, useRef } from "react";
import { Send, Plus, X, Sparkles, MessageCircle } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import background from "../../assets/images/promo.png";

export default function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageName, setPreviewImageName] = useState("");
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    // শুরুতে কোনো মেসেজ থাকবে না → খালি চ্যাট
    // {
    //   id: 1,
    //   type: "user",
    //   text: "Hello! Recommend me some restaurants.",
    // },
    // {
    //   id: 2,
    //   type: "assistant",
    //   text: "Sure! What type of food are you craving?",
    //   hasCard: true,
    //   restaurant: { ... }
    // }
  ]);

  const handleSendMessage = () => {
    if (inputText.trim() || previewImage) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          type: "user",
          text: inputText,
          image: previewImage || undefined,
          fileName: previewImage ? previewImageName : undefined,
        },
      ]);
      setInputText("");
      setPreviewImage(null);
      setPreviewImageName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setPreviewImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="flex-1 flex flex-col bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${background})` }}>
        <Navbar />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            {/* যদি কোনো মেসেজ না থাকে → সেন্টার মেসেজ */}
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center my-20 ">
                <div className="text-center max-w-2xl px-6">
                  {/* Big Icon */}
                  <div className="mx-auto w-24 h-24 bg-[#A16414]/10 rounded-full flex items-center justify-center mb-6">
                    <Sparkles size={48} className="text-[#A16414]" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-xl sm:text-4xl font-bold text-[#7D4C0D] mb-4">
                    Welcome to Choosie AI
                  </h2>

                  {/* Subtext */}
                  <p className=" sm:text-xl text-[#7D4C0D]/80 leading-relaxed mb-8">
                    Ask me anything about restaurants! I can recommend the best
                    places with exclusive deals just for you.
                  </p>

                  {/* Example Prompts */}
                  <div className="space-y-3 max-w-xl mx-auto">
                    {["Best Manila restaurants near me with discount?"].map(
                      (prompt, i) => (
                        <button
                          key={i}
                          onClick={() => setInputText(prompt)}
                          className="block w-full text-sm sm:text-base text-left p-4 bg-white/90 backdrop-blur-sm border text-[#7D4C0D] hover:text-white border-amber-200 rounded-2xl hover:bg-[#BC7A24]  cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                          <span className=" font-medium">{prompt}</span>
                        </button>
                      )
                    )}
                  </div>

                  <p className="mt-10 text-sm text-[#7D4C0D]/60">
                    <MessageCircle className="inline-block mr-2" size={18} />
                    Start typing below or click any suggestion
                  </p>
                </div>
              </div>
            ) : (
              /* Normal Messages */
              <div className="space-y-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}>
                    <div className="max-w-xl">
                      {/* User Message */}
                      {message.type === "user" ? (
                        <div className="flex flex-col items-end space-y-3">
                          {message.image && (
                            <div className="max-w-xs sm:max-w-sm md:max-w-md">
                              <img
                                src={message.image}
                                alt={message.fileName}
                                className="rounded-xl shadow-xl max-w-full h-auto block"
                              />
                            </div>
                          )}
                          {message.text && (
                            <div className="px-6 py-4 rounded-2xl rounded-tr-none bg-[#009FF2] text-white text-base shadow-lg">
                              {message.text}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Assistant Message */
                        <div className="space-y-5">
                          <p className="text-stone-800 text-base">
                            {message.text}
                          </p>

                          {message.hasCard && message.restaurant && (
                            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xl hover:shadow-2xl transition-all">
                              <div className="relative">
                                <img
                                  src={message.restaurant.image}
                                  alt={message.restaurant.name}
                                  className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <h3 className="absolute bottom-4 left-5 text-2xl font-bold text-white drop-shadow-2xl">
                                  {message.restaurant.name}
                                </h3>
                              </div>
                              <div className="p-6 space-y-5">
                                <div className="text-sm text-stone-600 space-y-3">
                                  <p>
                                    <strong>Location:</strong>{" "}
                                    {message.restaurant.address}
                                  </p>
                                  {message.restaurant.phone && (
                                    <p>
                                      <strong>Phone:</strong>{" "}
                                      {message.restaurant.phone}
                                    </p>
                                  )}
                                </div>
                                {message.restaurant.discount && (
                                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl">
                                    <p className="font-bold text-emerald-800 text-lg">
                                      {message.restaurant.discount}
                                    </p>
                                    {message.restaurant.discountNote && (
                                      <p className="text-sm text-emerald-700 mt-1">
                                        {message.restaurant.discountNote}
                                      </p>
                                    )}
                                  </div>
                                )}
                                <button className="w-full py-4 bg-[#009FF2] hover:bg-[#A16414] text-white font-bold rounded-xl transition transform hover:scale-105 shadow-lg">
                                  Get Exclusive QR Code
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="">
          <div className="max-w-5xl mx-auto p-4 relative">
            {/* Image Preview */}
            {previewImage && (
              <div className=" w-40 relative flex items-center gap-3 pb-1 px-3 rounded-xl ">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-30 h-20 object-cover rounded-lg shadow-sm"
                />

                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setPreviewImageName("");
                  }}
                  className="text-red-600 absolute -top-4 right-1 hover:bg-red-50 p-2 rounded-full transition">
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Input Box */}
            <div className="flex items-center px-2 gap-3 bg-white border border-stone-300 rounded-full shadow-lg">
              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-stone-600 hover:text-[#009FF2] hover:bg-stone-100 rounded-full transition"
                title="Upload image">
                <Plus size={22} />
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Text Input */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                rows={1}
                className="flex-1 px-1 py-4 resize-none focus:outline-none text-sm sm:text-base max-h-32 overflow-y-auto"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() && !previewImage}
                className={`
                  p-3 rounded-full transition-all duration-200
                  ${
                    inputText.trim() || previewImage
                      ? "bg-[#009FF2] text-white hover:bg-[#BC7A24] shadow-md"
                      : "text-stone-400 cursor-not-allowed"
                  }
                `}>
                <Send size={20} />
              </button>
            </div>

            <p className="text-center text-xs text-stone-500 mt-3">
              Choosie can make mistakes. Consider checking important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
