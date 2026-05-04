import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    // After registration, usually send them to login or dashboard
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-green-600">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Join Us</h1>
            <p className="text-gray-500 mt-2">Start managing your daily meals today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="Shaikat Paul"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="email@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="text-xs text-gray-500">
              By clicking Sign Up, you agree to our <span className="text-green-600 underline cursor-pointer">Terms & Conditions</span>.
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Already a member?{' '}
            <Link to="/login" className="text-green-600 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;