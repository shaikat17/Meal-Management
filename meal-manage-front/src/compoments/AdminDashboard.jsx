import { useState } from 'react';

const AdminDashboard = () => {
  // Mock data for members
  const [members, setMembers] = useState([
    { id: 1, name: 'Shaikat Chandra Paul', email: 'shaikat@example.com', status: 'active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', status: 'pending' },
    { id: 3, name: 'Anisur Rahman', email: 'anis@example.com', status: 'inactive' },
  ]);

  const updateStatus = (id, newStatus) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const removeMember = (id) => {
    if(window.confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-600">Manage your mess members and their access.</p>
          </div>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
            Total Members: {members.length}
          </div>
        </div>

        {/* Member Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Member Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      member.status === 'active' ? 'bg-green-100 text-green-700' :
                      member.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {member.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(member.id, 'active')}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded shadow-sm"
                      >
                        Approve
                      </button>
                    )}
                    {member.status === 'active' ? (
                      <button 
                        onClick={() => updateStatus(member.id, 'inactive')}
                        className="border border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-xs px-3 py-1.5 rounded"
                      >
                        Deactivate
                      </button>
                    ) : (
                      member.status !== 'pending' && (
                        <button 
                          onClick={() => updateStatus(member.id, 'active')}
                          className="border border-green-500 text-green-600 hover:bg-green-50 text-xs px-3 py-1.5 rounded"
                        >
                          Activate
                        </button>
                      )
                    )}
                    <button 
                      onClick={() => removeMember(member.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 text-xs px-3 py-1.5 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;