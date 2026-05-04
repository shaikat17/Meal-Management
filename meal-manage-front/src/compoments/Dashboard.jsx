

const Dashboard = () => {
  // Mock data for now
  const stats = [
    { label: 'Total Meals', value: '45', color: 'bg-blue-500' },
    { label: 'Current Balance', value: '৳ 1,250', color: 'bg-green-500' },
    { label: 'Meal Rate', value: '৳ 42.5', color: 'bg-orange-500' },
    { label: 'Total Deposit', value: '৳ 3,000', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Shaikat!</h1>
        <p className="text-gray-600">Here is your meal summary for May 2026.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 text-gray-800`}>{stat.value}</p>
            <div className={`h-1 w-12 mt-3 rounded-full ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Daily Meal Entry Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Meal Logs</h2>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition">
            + Add Meal
          </button>
        </div>
        <div className="p-6 text-center text-gray-500">
          No meal logs found for today.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;