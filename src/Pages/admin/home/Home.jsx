import { RiUserCommunityLine } from "react-icons/ri";
import StatCard from "../../../components/card/StatCard";
import { DollarSign, Footprints } from "lucide-react";
import { Clock, CheckCircle2, Activity } from "lucide-react";
const Home = () => {
  // Sample data
  const recentActivity = [
    { type: "subscription", user: "Dr. Sarah Johnson", time: "2 minutes ago" },
    { type: "subscription", user: "Dr. Sarah Johnson", time: "2 minutes ago" },
    { type: "generation", user: "John Doe", time: "15 minutes ago" },
    { type: "processing", user: "Emma Wilson", time: "35 minutes ago" },
  ];

  const leaderboard = [
    { rank: 1, name: "Dr. Sarah Jones", count: 324 },
    { rank: 2, name: "John Doe", count: 184 },
    { rank: 3, name: "Emma Watson", count: 74 },
    { rank: 4, name: "Alex Carey", count: 70 },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "subscription":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "generation":
        return <Activity className="w-5 h-5 text-blue-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={RiUserCommunityLine}
          label="Total Users"
          value="2,489"
          change="8.5%"
          bgColor="#FFECE6"
          color="#FF470F"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value="2,489"
          change="8.5%"
          bgColor="#E6FFE7"
          color="#0FAC15"
        />
        <StatCard
          icon={Footprints}
          label="Total Insole Generations"
          value="9"
          bgColor="#EAFBFB"
          color="#219A9A"
          change="8.5%"
        />
        {/* <StatCard
          icon={RiQrCodeLine}
          label="AI Optimizations"
          value="189"
          change="8.5%"
          bgColor="#D9DDF9"
          color="#001AD7"
        /> */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity - Left Column */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 ">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Latest platform events and updates
            </p>
          </div>

          <div className="divide-y divide-gray-100 p-4">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="p-6 hover:bg-gray-50 transition-colors border rounded-2xl my-3 border-gray-50 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {activity.type === "subscription" &&
                        "New Pro Subscription"}
                      {activity.type === "generation" &&
                        "STL generation completed"}
                      {activity.type === "processing" &&
                        "AI optimization processing"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.user}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={14} />
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
        </div>

        {/* Leaderboard - Right Column */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 ">
            <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
          </div>

          <div className="p-4 space-y-4">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-5 shadow rounded-2xl hover:shadow-md transition-all border  border-gray-50">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.count} Insole generations
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-[#009FF2]`}>
                  {String(user.rank).padStart(2, "0")}
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
