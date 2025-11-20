import { useState } from "react";
import { Search, Plus, DollarSign, Eye } from "lucide-react";

import Pagination from "../../../components/Common/Pagination";
import StatCard from "../../../components/card/StatCard";
import { AiOutlineDollar } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";
import AddBillModal from "../../../components/modal/AddBillModal ";

const BillDataManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBill = async (billData) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/bills/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (!response.ok) throw new Error("Failed to add bill");

      console.log("Bill added successfully:", billData);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const [billRecords] = useState([
    {
      id: 1,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 2,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 3,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 4,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 5,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 6,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 7,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 8,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 9,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 10,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 11,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
    {
      id: 12,
      qrNumber: "QR-001",
      orderNumber: "ORDER-1234",
      items: "Carbonara Pasta, Caesar Salad",
      amount: "$29.99",
      discount: "$6.99",
      time: "Nov 14, 2025 3:32pm",
    },
  ]);

  const filteredRecords = billRecords.filter(
    (record) =>
      record.qrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <>
      <div className="w-full space-y-6 md:space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            icon={AiOutlineDollar}
            label="Total Orders Today"
            value="127"
            change="8.5%"
            bgColor="#F3EEE7"
            color="#7B3306"
          />
          <StatCard
            icon={IoAnalyticsOutline}
            label="Discounts Given"
            value="$1,327.13"
            change="8.5%"
            bgColor="#CAFFDE"
            color={"#008236"}
          />
          <StatCard
            icon={DollarSign}
            label="Avg Bill Value"
            value="$47.99"
            change="8.5%"
            bgColor="#D9DDF9"
            color="#354EFF"
          />
        </div>

        {/* Search and Add Bill Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FF2] text-sm sm:text-base"
            />
          </div>

          {/* Add Bill Button */}
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-[#009FF2] hover:bg-amber-800 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base whitespace-nowrap">
            <Plus size={20} />
            <span>Add Bill</span>
          </button>
        </div>

        {/* Billing Records Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg md:text-2xl font-bold text-[#414141]">
              Billing Records
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-y-auto h-[40vh] ">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    QR Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#009FF2]">
                    Items
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
                {paginatedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#414141] font-medium">
                      {record.qrNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {record.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {record.items}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {record.amount}
                    </td>
                    <td className="px-6 py-4 text-sm  text-[#414141]">
                      {record.discount}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#414141]">
                      {record.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {paginatedRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-2">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs font-semibold text-[#414141] mb-1">
                        QR Number: {record.qrNumber}
                      </p>
                      <p className="text-sm font-semibold text-[#414141]">
                        {record.orderNumber}
                      </p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Eye size={18} className="text-gray-500" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#414141] mb-2">
                    {record.items}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-[#414141]">Amount</p>
                      <p className="font-semibold text-[#414141]">
                        {record.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#414141]">Discount</p>
                      <p className="font-semibold text-orange-600">
                        {record.discount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#414141]">Time</p>
                      <p className="text-xs text-[#414141]">
                        {record.time.split(" ").slice(-1)[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {paginatedRecords.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-[#414141] text-lg">No billing records found</p>
            </div>
          )}

          {/* Pagination */}
        </div>
        <Pagination
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
      <AddBillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBill}
      />
    </>
  );
};

export default BillDataManagementPage;
