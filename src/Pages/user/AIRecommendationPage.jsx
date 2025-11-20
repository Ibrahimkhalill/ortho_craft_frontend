import { useState } from "react";
import { Sparkles } from "lucide-react";

import background from "../../assets/images/promo.png";
import Navbar from "../../components/navbar/Navbar";
import RestaurantModal from "../../components/modal/RestaurantViewModal";
import RestaurantCard from "../../components/card/RestaurantCard";
import Footer from "../../components/footer/Footer";

const AIRecommendationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Recommendation categories with restaurants
  const recommendationCategories = [
    {
      id: 1,
      title: "Romantic Date Night Suggestions",
      description: "2 recommendations from your AI conversation",
      icon: "🔖",
      restaurants: [
        {
          id: 1,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 2,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
      ],
    },
    {
      id: 2,
      title: "Healthy Lunch Options Near Work",
      description: "4 recommendations from your AI conversation",
      icon: "🥗",
      restaurants: [
        {
          id: 1,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 2,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 3,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 4,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
      ],
    },
    {
      id: 3,
      title: "Quick Family Dinner Ideas",
      description: "3 recommendations from your AI conversation",
      icon: "👨‍👩‍👧‍👦",
      restaurants: [
        {
          id: 1,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 2,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
        {
          id: 3,
          name: "Burger King",
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          address: "123 Main St, Downtown",
          email: "example@gmail.com",
          phone: "+1 (555) 123-4567",
          discount: "15% OFF",
        },
      ],
    },
  ];

  return (
    <>
      <section
        className="w-full bg-[#FDFBF2] py-8 md:py-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}>
        <Navbar />
        <div className=" px-4 sm:px-6 lg:px-8 py-4 ">
          <div className="w-full pt-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={28} className="text-[#009FF2]" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  AI <span className="text-[#009FF2] ml-1">Recommendation</span>
                </h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Discover amazing offers and save on your favorite restaurants
              </p>
            </div>

            {/* Recommendation Categories */}
            <div className="space-y-12">
              {recommendationCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7D4C0D] rounded-lg flex items-center justify-center text-lg md:text-xl flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Restaurant Cards Grid */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6`}>
                    {category.restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={`${category.id}-${restaurant.id}`}
                        restaurant={restaurant}
                        setIsOpen={setIsOpen}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State CTA */}
            <div className="text-center py-12 border-t border-gray-200 mt-12">
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Want more personalized recommendations?
              </p>
              <button className="px-6 py-3 bg-[#009FF2] hover:bg-[#7D4C0D] text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                <Sparkles size={18} />
                <span>Chat with AI</span>
              </button>
            </div>
          </div>
        </div>
        <RestaurantModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
      <Footer />
    </>
  );
};

export default AIRecommendationPage;
