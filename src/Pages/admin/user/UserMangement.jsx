import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { RiUserCommunityLine } from "react-icons/ri";
import StatCard from "../../../components/card/StatCard";
import { DollarSign, Footprints, UsersRound } from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const users = [
    {
      id: 1,
      name: "Alexa",
      email: "example@gmail.com",
      avatar: "",
      subscription: "Jane Doe",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Alexa",
      email: "example@gmail.com",
      avatar: "",
      subscription: "Basic",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Alexa",
      email: "example@gmail.com",
      avatar: "",
      subscription: "kabir",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alex",
      email: "example@gmail.com",
      avatar: "",
      subscription: "Jane Doe",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Active",
    },
    {
      id: 5,
      name: "Alexa",
      email: "example@gmail.com",
      avatar: "",
      subscription: "kabir",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Active",
    },
    {
      id: 6,
      name: "Alex",
      email: "example@gmail.com",
      avatar: "",
      subscription: "Jane Doe",
      insoles: "Nov 24, 2025",
      lastActive: "20 mins ago",
      status: "Inactive",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon={RiUserCommunityLine}
          label="Total Users"
          value="2,489"
          change="8.5%"
          bgColor="#E6F5FE"
          color="#0091DC"
        />
        <StatCard
          icon={UsersRound}
          label="Jane Doe Users"
          value="2,489"
          change="8.5%"
          bgColor="#E6FFE7"
          color="#0FAC15"
        />
        <StatCard
          icon={Footprints}
          label="Average Creation"
          value="9"
          change="8.5%"
          bgColor="#EAFBFB"
          color="#219A9A"
        />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col gap-6 p-5">
        <h1 className="sm:text-3xl text-xl font-bold text-gray-900">
          User List
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#009FF2] focus:border-transparent transition"
          />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#E6F5FE] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Reference
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Creation Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-kabir text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-kabir text-gray-900">
                    {user.subscription}
                  </td>
                  <td className="px-6 py-4 font-kabir text-gray-900">
                    {user.insoles}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-4 py-2 rounded-full text-sm font-kabir ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-[#009FF2] transition">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination can go here if needed */}
    </div>
  );
};

export default UserManagement;
