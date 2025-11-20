import { useState } from "react";

import { QrCode, CheckCircle, Clock } from "lucide-react";
import Pagination from "../../../components/Common/Pagination";
import StatCard from "../../../components/card/StatCard";
import BarCharts from "../../../components/chart/BarChart";
import LineCharts from "../../../components/chart/LineChart";

const QRScanningTracking = () => {
  // Hourly scan activity data
  const hourlyData = [
    { time: "9AM", scans: 40 },
    { time: "10AM", scans: 65 },
    { time: "11AM", scans: 145 },
    { time: "12PM", scans: 155 },
    { time: "1PM", scans: 135 },
    { time: "2PM", scans: 85 },
    { time: "3PM", scans: 65 },
    { time: "4PM", scans: 55 },
    { time: "5PM", scans: 75 },
    { time: "6PM", scans: 185 },
    { time: "7PM", scans: 240 },
    { time: "8PM", scans: 200 },
  ];

  // Top restaurants by QR scans
  const topRestaurants = [
    { name: "Golden Spoon", scans: 450 },
    { name: "Sushi Haven", scans: 430 },
    { name: "Pasta Paradise", scans: 380 },
    { name: "Thai Delight", scans: 320 },
    { name: "Burger Palace", scans: 280 },
  ];

  // QR Scan Feed data
  const [scanFeed] = useState([
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Scanned",
    },
    {
      id: "QR-001",
      restaurant: "Pizza Hut",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Scanned",
    },
    {
      id: "QR-001",
      restaurant: "Dominos Pizza",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Pending",
    },
    {
      id: "QR-001",
      restaurant: "Burger King",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Scanned",
    },
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Scanned",
    },
    {
      id: "QR-001",
      restaurant: "La Bella Pasta",
      dateTime: "Nov 13, 2025 5:00PM",
      status: "Pending",
    },
  ]);

  const getStatusColor = (status) => {
    return status === "Scanned"
      ? "bg-[#C9FFDF] text-[#008236]"
      : "bg-[#FAF3D5] text-[#009FF2]";
  };

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(scanFeed.length / itemsPerPage);

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={QrCode}
          label="Total Scans Today"
          value="134"
          change="8.5%"
          bgColor="#FFEFE6"
          color="#7B3306"
        />
        <StatCard
          icon={CheckCircle}
          label="Successful Scans"
          value="$7,189"
          change="8.5%"
          bgColor="#F3E5FD"
          color="#AE43F9"
        />
        <StatCard
          icon={Clock}
          label="Avg Scan Time"
          value="89"
          change="8.5%"
          bgColor="#E8E9FE"
          color="#6668F4"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Hourly Scan Activity Line Chart */}
        <LineCharts label={"Hourly Scan Activity"} hourlyData={hourlyData} />
        {/* Top Restaurants by QR Scans Bar Chart */}
        <BarCharts
          topRestaurants={topRestaurants}
          label={"Top Restaurants by QR Scans"}
        />
      </div>

      {/* QR Scan Feed Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">
            QR Scan Feed
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  QR ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scanFeed.map((scan, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {scan.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {scan.restaurant}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {scan.dateTime}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        scan.status
                      )}`}>
                      {scan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {scanFeed.map((scan, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    QR ID: {scan.id}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {scan.restaurant}
                  </p>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    scan.status
                  )}`}>
                  {scan.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">{scan.dateTime}</p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default QRScanningTracking;
