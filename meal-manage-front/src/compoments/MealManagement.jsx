import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MealEntry from '../compoments/MealEntry';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const MealManagement = () => {
  const { user } = useAuth();
  
  // Default to current month/year (e.g., "2026-05")
  const currentYM = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentYM);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CalendarDaysIcon className="h-8 w-8 text-green-600" />
            Meal & Utility Records
          </h1>
          <p className="text-gray-600">Track your daily meals and monthly bills.</p>
        </div>

        {/* Month Picker */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border">
          <label className="text-sm font-bold text-gray-500 ml-2">Select Month:</label>
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none text-green-700 font-bold p-1 cursor-pointer"
          />
        </div>
      </div>

      {/* The MealEntry component we built */}
      <MealEntry 
        targetUserId={user.id} 
        currentMonth={selectedMonth} 
      />
    </div>
  );
};

export default MealManagement;