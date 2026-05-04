import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ArrowRightOnRectangleIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b-2 border-green-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-green-700">Meal</span>
              <span className="text-2xl font-bold text-gray-800">Master</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium transition">Dashboard</Link>
                
                {isAdmin && (
                  <Link to="/admin" className="text-gray-600 hover:text-green-600 font-medium transition">Admin Panel</Link>
                )}

                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800">{user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 transition"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">Login</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">Admin Panel</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-green-600 font-bold">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;