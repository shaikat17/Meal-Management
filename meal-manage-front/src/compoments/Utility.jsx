import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  BoltIcon, 
  TrashIcon, 
  BeakerIcon, 
  PlusCircleIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import api from '../utils/api';

const UtilityForm = ({ targetUserId = null, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    electricity: '',
    waste: '',
    water: '',
    otherAmount: '',
    otherDesc: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Get current month/year for display
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Fetch existing data for the running month
  useEffect(() => {
    const fetchCurrentCosts = async () => {
      try {
        // If targetUserId exists, we are an admin editing someone else
        const url = targetUserId ? `/user-costs/${targetUserId}` : `/user-costs/my-current`;
        const res = await api.get(url);
        if (res.data) {
          setFormData({
            electricity: res.data.electricity || '',
            waste: res.data.waste || '',
            water: res.data.water || '',
            otherAmount: res.data.otherCost?.amount || '',
            otherDesc: res.data.otherCost?.description || ''
          });
        }
      } catch (err) {
        console.log("No existing data for this month yet.");
      } finally {
        setFetching(false);
      }
    };
    fetchCurrentCosts();
  }, [targetUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData, targetUserId };
      await api.post('/user-costs/update', payload);
      toast.success("Utility records updated successfully!");
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update costs");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center p-5 text-green-600 animate-pulse">Loading records...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Monthly Utilities <span className="text-green-600">({currentMonth})</span>
        </h2>
        <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Running Year: {currentYear}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Electricity */}
        <div className="relative">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Electricity Bill</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BoltIcon className="h-5 w-5 text-yellow-500" />
            </div>
            <input
              type="number"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-gray-50"
              placeholder="0.00"
              value={formData.electricity}
              onChange={(e) => setFormData({ ...formData, electricity: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Waste Bill */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Waste Bill</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TrashIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-gray-50"
                placeholder="0.00"
                value={formData.waste}
                onChange={(e) => setFormData({ ...formData, waste: e.target.value })}
              />
            </div>
          </div>

          {/* Water Bill */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Water Bill</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BeakerIcon className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-gray-50"
                placeholder="0.00"
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Other Cost */}
        <div className="border-t pt-4 mt-4 border-dashed">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Other Cost & Description</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              className="w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-gray-50"
              placeholder="Amount"
              value={formData.otherAmount}
              onChange={(e) => setFormData({ ...formData, otherAmount: e.target.value })}
            />
            <input
              type="text"
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-gray-50"
              placeholder="Reason (e.g. Broken Bulb)"
              value={formData.otherDesc}
              onChange={(e) => setFormData({ ...formData, otherDesc: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <PlusCircleIcon className="h-5 w-5" />
              Update Costs
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UtilityForm;