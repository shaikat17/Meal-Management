import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for authentication goes here
    console.log("Logging in:", { email, password });
    
    // Redirect to dashboard after login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Meal Management</h1>
            <h2 className="text-3xl font-bold text-gray-400">Shopno Bilas</h2>
            <p className="text-gray-500 mt-2">Welcome back dude.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="shaikat@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                Remember me
              </label>
              <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;