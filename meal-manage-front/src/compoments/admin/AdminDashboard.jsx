import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  UserGroupIcon,
  CheckBadgeIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import api from "../../utils/api";
import FixedCosts from "./FiixedCosts";
// import MealEntry from "../MealEntry";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all members from backend
  const fetchMembers = async () => {
    try {
      const res = await api.get("/admin/users"); // Adjust route based on your backend
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 2. Update status in DB
  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status: newStatus });
      setMembers(
        members.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
      );
      toast.success(`Member status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // 3. Delete member from DB
  const removeMember = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this member? This action cannot be undone.",
      )
    ) {
      try {
        await api.delete(`/admin/users/${id}`);
        setMembers(members.filter((m) => m._id !== id));
        toast.success("Member removed successfully");
      } catch (err) {
        toast.error("Failed to remove member");
      }
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-green-600">
        Loading Members...
      </div>
    );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <UserGroupIcon className="h-8 w-8 mr-2 text-green-600" />
              Admin Portal
            </h1>
            <p className="text-gray-600">
              Manage your mess members and their access.
            </p>
          </div>
          <div className="bg-white shadow-sm border border-green-100 text-green-700 px-6 py-3 rounded-xl font-bold text-lg">
            Total Members: {members.length}
          </div>
        </div>

        {/* Member Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-green-50/30 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        Role: {member.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {member.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : member.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {member.status === "pending" && (
                          <button
                            onClick={() => updateStatus(member._id, "active")}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm"
                            title="Approve Member"
                          >
                            <CheckBadgeIcon className="h-5 w-5" />
                          </button>
                        )}
                        {member.status === "active" ? (
                          <button
                            onClick={() => updateStatus(member._id, "inactive")}
                            className="p-2 border border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                            title="Deactivate Member"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        ) : (
                          member.status !== "pending" && (
                            <button
                              onClick={() => updateStatus(member._id, "active")}
                              className="p-2 border border-green-500 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Activate Member"
                            >
                              <CheckBadgeIcon className="h-5 w-5" />
                            </button>
                          )
                        )}
                        <button
                          onClick={() => removeMember(member._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Member"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FixedCosts />
          {/* <MealEntry targetUserId={targetUserId} currentMonth={currentMonth} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
