import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components (assuming they are in a components folder)
import Login from "./compoments/auth/Login";
import Register from "./compoments/auth/Register";
import Dashboard from "./compoments/Dashboard";
import AdminDashboard from "./compoments/admin/AdminDashboard";
import Navbar from "./compoments/layout/NavBar";
import MealManagement from "./compoments/MealManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/my-meals" element={<MealManagement />} />
          <Route
            path="*"
            element={
              <div className="p-10 text-center">404 - Page Not Found</div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
