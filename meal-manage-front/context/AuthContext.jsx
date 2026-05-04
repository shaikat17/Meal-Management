import { createContext, useState, useContext, useEffect } from 'react';
import api from '../src/utils/api'; // Import your API utility for token validation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Lazy Initialization: Read from localStorage only once on startup
  // This prevents the "blank page" flicker and cascading render errors
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // 2. Login Function: Called from Login.jsx
  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  // 3. Logout Function: Clears everything
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // 4. (Optional) Check Token Validity on refresh
  // This ensures that if the token expires, the user is logged out automatically
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // You can create a simple /me route in backend to verify the token
          // await api.get('/auth/me'); 
        } catch (err) {
          logout();
        }
      }
    };
    checkAuth();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};