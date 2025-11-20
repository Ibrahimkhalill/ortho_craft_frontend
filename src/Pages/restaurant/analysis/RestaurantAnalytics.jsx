import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle, DollarSign } from "lucide-react";
import StatCard from "../../../components/card/StatCard";
import { FaRegClock } from "react-icons/fa6";

const RestaurantAnalytics = () => {
  // Weekly Revenue Trend Data
  const weeklyRevenueData = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1400 },
    { day: "Wed", revenue: 1100 },
    { day: "Thu", revenue: 1600 },
    { day: "Fri", revenue: 1950 },
    { day: "Sat", revenue: 2100 },
    { day: "Sun", revenue: 1850 },
  ];

  // Daily Order Volume Data
  const dailyOrderData = [
    { day: "Mon", orders: 42 },
    { day: "Tue", orders: 48 },
    { day: "Wed", orders: 38 },
    { day: "Thu", orders: 55 },
    { day: "Fri", orders: 68 },
    { day: "Sat", orders: 78 },
    { day: "Sun", orders: 62 },
  ];

  // Top Selling Items
  const topSellingItems = [
    { rank: "01", name: "Margherita Pizza", orders: "324 Orders" },
    { rank: "02", name: "Chicken Parmesan", orders: "324 Orders" },
    { rank: "03", name: "Caesar Salad", orders: "324 Orders" },
    { rank: "04", name: "Tiramisu", orders: "324 Orders" },
  ];

  // Peak Hours Analysis
  const peakHoursData = [
    { time: "6:00 PM - 8:00 PM", orders: 142, revenue: "$4,260" },
    { time: "12:00 PM - 2:00 PM", orders: 142, revenue: "$4,260" },
    { time: "8:00 PM - 10:00 PM", orders: 142, revenue: "$4,260" },
    { time: "10:00 AM - 12:00 PM", orders: 142, revenue: "$4,260" },
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={FaRegClock}
          label="Pending Orders"
          value="8"
          bgColor="#F3EEE7"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed Today"
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
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Weekly Revenue Trend - Line Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
            Weekly Revenue Trend
          </h2>
          <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyRevenueData}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#009FF2"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#009FF2" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #009FF2",
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
                  dot={{ fill: "#009FF2", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Order Volume - Bar Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
            Daily Order Volume
          </h2>
          <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyOrderData}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
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
                />
                <Bar dataKey="orders" fill="#009FF2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section - Top Selling Items & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Top Selling Items */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
            Top Selling Items
          </h2>
          <div className="space-y-4">
            {topSellingItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border flex gap-4 border-gray-50 shadow-sm m-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#009FF2] text-white rounded-lg flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
                  {item.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {item.orders}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours Analysis */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6">
            Peak Hours Analysis
          </h2>
          <div className="space-y-4">
            {peakHoursData.map((hour, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {hour.time}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {hour.orders} orders
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#009FF2]">
                    {hour.revenue}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#009FF2] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(hour.orders / 142) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAnalytics;
