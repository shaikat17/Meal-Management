import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BuildingOfficeIcon, UserIcon, WifiIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const FixedCosts = () => {
  const [costs, setCosts] = useState({ houseRent: 0, chefSalary: 0, wifiBill: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await api.get('/admin/settings');
      if (res.data) setCosts(res.data);
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/admin/settings', costs);
      toast.success("Fixed monthly costs updated!");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <ReceiptRefundIcon className="h-6 w-6 mr-2 text-green-600" />
        Monthly Fixed Costs
      </h2>
      <p className="text-sm text-gray-500 mb-6">These values apply to all months until changed.</p>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <BuildingOfficeIcon className="h-4 w-4 mr-1" /> House Rent
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={costs.houseRent}
            onChange={(e) => setCosts({ ...costs, houseRent: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <UserIcon className="h-4 w-4 mr-1" /> Chef Salary
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={costs.chefSalary}
            onChange={(e) => setCosts({ ...costs, chefSalary: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <WifiIcon className="h-4 w-4 mr-1" /> WiFi Bill
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={costs.wifiBill}
            onChange={(e) => setCosts({ ...costs, wifiBill: Number(e.target.value) })}
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
          >
            {loading ? 'Saving...' : 'Update Global Costs'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FixedCosts;