import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, CheckCircle, DollarSign, Clock } from "lucide-react";
import StatCard from "../../../components/card/StatCard";

const RestaurantDashboard = () => {
  // Revenue Trend Data
  const revenueData = [
    { time: "9AM", revenue: 120 },
    { time: "10AM", revenue: 280 },
    { time: "11AM", revenue: 390 },
    { time: "12PM", revenue: 760 },
    { time: "1PM", revenue: 850 },
    { time: "2PM", revenue: 620 },
    { time: "3PM", revenue: 420 },
    { time: "4PM", revenue: 380 },
    { time: "5PM", revenue: 520 },
    { time: "6PM", revenue: 890 },
    { time: "7PM", revenue: 1200 },
    { time: "Now", revenue: 1580 },
  ];

  // Recent Orders Data
  const [recentOrders] = useState([
    {
      id: "ORDER-1234",
      qrCode: "QR-ABC123",
      items: "Margherita Pizza, Caesar Salad",
      total: "$24.99",
      originalTotal: "$19.99",
      discount: "$5.00",
      time: "15 min ago",
    },
    {
      id: "ORDER-1234",
      qrCode: "QR-ABC123",
      items: "Margherita Pizza, Caesar Salad",
      total: "$24.99",
      originalTotal: "$19.99",
      discount: "$5.00",
      time: "15 min ago",
    },
    {
      id: "ORDER-1234",
      qrCode: "QR-ABC123",
      items: "Margherita Pizza, Caesar Salad",
      total: "$24.99",
      originalTotal: "$19.99",
      discount: "$5.00",
      time: "15 min ago",
    },
    {
      id: "ORDER-1234",
      qrCode: "QR-ABC123",
      items: "Margherita Pizza, Caesar Salad",
      total: "$24.99",
      originalTotal: "$19.99",
      discount: "$5.00",
      time: "15 min ago",
    },
    {
      id: "ORDER-1234",
      qrCode: "QR-ABC123",
      items: "Margherita Pizza, Caesar Salad",
      total: "$24.99",
      originalTotal: "$19.99",
      discount: "$5.00",
      time: "15 min ago",
    },
  ]);

  // Top Selling Items
  const topSellingItems = [
    {
      rank: "01",
      name: "Margherita Pizza",
      orders: "15 orders",
      price: "$18.99 each",
    },
    {
      rank: "02",
      name: "Chicken Parmesan",
      orders: "15 orders",
      price: "$18.99 each",
    },
    {
      rank: "03",
      name: "Caesar Salad",
      orders: "15 orders",
      price: "$18.99 each",
    },
    { rank: "04", name: "Tiramisu", orders: "15 orders", price: "$18.99 each" },
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={CheckCircle}
          label="Orders Completed Today"
          value="49"
          bgColor="#CAFFDE"
          color={"#00A63E"}
        />
        <StatCard
          icon={DollarSign}
          label="Today's Revenue"
          value="$1,847"
          bgColor="#D9DDF9"
          color={"#354EFF"}
        />
        <StatCard
          icon={TrendingUp}
          label="Average Order Value"
          value="$38.99"
          bgColor="#FFEDD4"
          color={"#F54900"}
        />
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
          Today's Revenue Trend
        </h2>
        <div className="w-full h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                stroke="#009FF2"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#009FF2" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => `$${value}`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#009FF2"
                strokeWidth={3}
                dot={{ fill: "#009FF2", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders and Top Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              Recent Orders
            </h2>
            <button className="text-gray-600 hover:text-gray-900 bg-white shadow px-4 py-2 rounded text-sm font-medium">
              All Orders <span className="ml-1">▼</span>
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-gray-50 shadow-sm m-4 rounded-lg hover:bg-gray-50 transition-color">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                          {order.qrCode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.items}</p>
                    </div>

                    <div className="flex flex-col items-start gap-1  text-sm">
                      <p className="text-gray-600">
                        Total:{" "}
                        <span className="line-through text-gray-400">
                          {order.originalTotal}
                        </span>
                        <span className="font-semibold ml-2 text-orange-600">
                          {order.total}
                        </span>
                      </p>

                      <div>
                        <p className="text-gray-600">
                          Discount:{" "}
                          <span className="font-semibold text-green-600">
                            {order.discount}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{order.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-gray-200">
            {recentOrders.map((order, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {order.id}
                  </h3>
                  <span className="text-xs text-gray-500">{order.time}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{order.items}</p>
                <div className="bg-gray-50 p-2 rounded mb-2">
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded inline-block">
                    {order.qrCode}
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="text-gray-600">Total:</span>{" "}
                    <span className="font-semibold text-orange-600">
                      {order.total}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Discount:</span>{" "}
                    <span className="font-semibold text-green-600">
                      {order.discount}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="p-4 md:p-6 text-center ">
            <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm md:text-base transition-colors">
              View More
            </button>
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4  ">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              Top Selling Items
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {topSellingItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4  bg-white border border-gray-50 shadow-sm m-4 rounded-lg hover:bg-gray-50 transition-color">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#009FF2] text-white rounded-lg flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
                    {item.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {item.name}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs md:text-sm text-gray-600 mt-1">
                        {item.orders}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {item.price}
                      </p>
                    </div>
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

export default RestaurantDashboard;
