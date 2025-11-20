/* eslint-disable no-unused-vars */
const StatCard = ({ icon: Icon, label, value, change, bgColor, color }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm md:text-base font-medium">
          {label}
        </p>
        <h3 className="text-2xl  font-bold text-gray-900 mt-2">{value}</h3>
        {/* <div className="flex items-center gap-1 mt-2">
          <TrendingUp size={16} className="text-green-500" />
          <span className="text-green-500 text-xs md:text-sm font-semibold">
            {change} Up from last month
          </span>
        </div> */}
      </div>
      <div
        className="p-2 md:p-3 rounded-xl ml-4"
        style={{ backgroundColor: bgColor }}>
        <Icon
          size={24}
          color={color}
          className="text-orange-600 md:w-8 md:h-8"
        />
      </div>
    </div>
  </div>
);

export default StatCard;
