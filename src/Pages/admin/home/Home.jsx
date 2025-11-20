import { useState } from "react";
import {
  RiUserCommunityLine,
  RiBuildingLine,
  RiQrCodeLine,
} from "react-icons/ri";
import StatCard from "../../../components/card/StatCard";

const Home = () => {
  // Sample data
  const [transactions] = useState([
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      item: "Carbonara Pasta",
      amount: "$29.99",
      discount: "$6.99",
      time: "10 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Pizza Hut",
      item: "Margherita Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "20 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Dominos Pizza",
      item: "Sea Food Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "30 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Burger King",
      item: "Cheese Burger",
      amount: "$29.99",
      discount: "$6.99",
      time: "40 min ago",
    },
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      item: "Carbonara Pasta",
      amount: "$29.99",
      discount: "$6.99",
      time: "10 min ago",
    },
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      item: "Carbonara Pasta",
      amount: "$29.99",
      discount: "$6.99",
      time: "10 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Pizza Hut",
      item: "Margherita Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "20 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Pizza Hut",
      item: "Margherita Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "20 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Dominos Pizza",
      item: "Sea Food Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "30 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Dominos Pizza",
      item: "Sea Food Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "30 min ago",
    },
    {
      id: "QR-001",
      restaurant: "Dominos Pizza",
      item: "Sea Food Pizza",
      amount: "$29.99",
      discount: "$6.99",
      time: "30 min ago",
    },
  ]);

  const [leaderboard] = useState([
    { rank: "01", restaurant: "La Bella Pasta", scans: "84 Scans" },
    { rank: "02", restaurant: "Pizza Hut", scans: "74 Scans" },
    { rank: "03", restaurant: "Burger King", scans: "34 Scans" },
    { rank: "04", restaurant: "Uncle Boba", scans: "20 Scans" },
  ]);

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={RiUserCommunityLine}
          label="Total Customers"
          value="2,489"
          change="8.5%"
          bgColor="#FFECE6"
          color="#FF470F"
        />
        <StatCard
          icon={RiBuildingLine}
          label="Affiliate Restaurants"
          value="9"
          bgColor="#F3EEE7"
          color="#009FF2"
          change="8.5%"
        />
        <StatCard
          icon={RiQrCodeLine}
          label="Total QR Scans"
          value="189"
          change="8.5%"
          bgColor="#D9DDF9"
          color="#001AD7"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border  border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              Transactions
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block h-[45vh] overflow-y-auto overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F3EEE7]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    QR ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {tx.restaurant}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {tx.item}
                    </td>
                    <td className="px-6 py-4 text-sm  text-[#414141]">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {tx.discount}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {transactions.map((tx, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      QR ID: {tx.id}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {tx.restaurant}
                    </p>
                    <p className="text-sm text-gray-600">{tx.item}</p>
                  </div>
                  <span className="text-xs font-semibold text-orange-600">
                    {tx.discount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">
                    {tx.amount}
                  </span>
                  <span className="text-xs text-gray-500">{tx.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="p-4 md:p-6 text-center border-t border-gray-200">
            <button className="text-[#009FF2] hover:text-orange-700 font-semibold text-sm md:text-base transition-colors">
              View More
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              Leaderboard
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {leaderboard.map((item, idx) => (
              <div
                key={idx}
                className="p-4 md:p-6 bg-white border border-gray-50 shadow-sm m-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {item.restaurant}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {item.scans}
                    </p>
                  </div>
                  <div className="ml-4 w-10 h-10 md:w-12 md:h-12 bg-[#009FF2] text-white rounded-lg flex items-center justify-center font-bold text-sm md:text-base">
                    {item.rank}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
