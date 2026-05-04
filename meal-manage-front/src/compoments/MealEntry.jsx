import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const MealEntry = ({ targetUserId, currentMonth }) => {
  const [meals, setMeals] = useState(new Array(31).fill(0));
  const [bills, setBills] = useState({ electricity: 0, water: 0, waste: 0 });
  const [otherCosts, setOtherCosts] = useState([{ amount: 0, description: "" }]);

  // Fetch existing data
  useEffect(() => {
    const loadData = async () => {
      const res = await api.get(`/meals/${targetUserId}/${currentMonth}`);
      if (res.data) {
        setMeals(res.data.dailyMeals);
        setBills({
          electricity: res.data.electricityBill,
          water: res.data.waterBill,
          waste: res.data.wasteBill
        });
        setOtherCosts(res.data.otherCosts);
      }
    };
    loadData();
  }, [targetUserId, currentMonth]);

  const handleSave = async () => {
    try {
      await api.post('/meals/update', {
        userId: targetUserId,
        monthYear: currentMonth,
        dailyMeals: meals,
        electricityBill: bills.electricity,
        waterBill: bills.water,
        wasteBill: bills.waste,
        otherCosts: otherCosts
      });
      toast.success("Records updated successfully!");
    } catch (err) {
      toast.error("Failed to save records");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-6">Daily Meal Sheet - {currentMonth}</h2>
      
      {/* 31 Day Grid */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
        {meals.map((val, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold ml-1">Day {index + 1}</span>
            <input
              type="number"
              min="0"
              className="border rounded p-2 text-center focus:ring-2 focus:ring-green-500 outline-none"
              value={val}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index] = Number(e.target.value);
                setMeals(newMeals);
              }}
            />
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Bills Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-bold text-gray-600">Electricity Bill</label>
          <input 
            type="number" 
            className="w-full border rounded p-2"
            value={bills.electricity}
            onChange={(e) => setBills({...bills, electricity: Number(e.target.value)})}
          />
        </div>
              {/* Repeat for Water and Waste... */}
              <div>
          <label className="text-sm font-bold text-gray-600">Water Bill</label>
          <input 
            type="number" 
            className="w-full border rounded p-2"
            value={bills.water}
            onChange={(e) => setBills({...bills, water: Number(e.target.value)})}
          />
              </div>
              <div>
          <label className="text-sm font-bold text-gray-600">Waste Bill</label>
          <input 
            type="number" 
            className="w-full border rounded p-2"
            value={bills.waste}
            onChange={(e) => setBills({...bills, waste: Number(e.target.value)})}
          />
        </div>
      </div>

      {/* Other Costs with Description */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-600">Other Costs</label>
        {otherCosts.map((cost, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              placeholder="Description" 
              className="flex-1 border rounded p-2 text-sm"
              value={cost.description}
              onChange={(e) => {
                const newCosts = [...otherCosts];
                newCosts[idx].description = e.target.value;
                setOtherCosts(newCosts);
              }}
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className="w-24 border rounded p-2 text-sm"
              value={cost.amount}
              onChange={(e) => {
                const newCosts = [...otherCosts];
                newCosts[idx].amount = Number(e.target.value);
                setOtherCosts(newCosts);
              }}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleSave}
        className="w-full mt-8 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
      >
        Save All Records
      </button>
    </div>
  );
};

export default MealEntry;