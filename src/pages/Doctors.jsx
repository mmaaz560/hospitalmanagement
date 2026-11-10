import React from 'react';
import Sidebar from '../component/Sidebar';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Doctors = () => {
  // Dummy Data
  const doctors = [
    { id: 'D-001', name: 'Dr. Sarah Ahmed', spec: 'Cardiologist', exp: '10 Years', phone: '0300-1112222', status: 'Available' },
    { id: 'D-002', name: 'Dr. Ahmed Khan', spec: 'Physician', exp: '8 Years', phone: '0301-3334444', status: 'Busy' },
    { id: 'D-003', name: 'Dr. Fatima Zafar', spec: 'Pediatrician', exp: '7 Years', phone: '0321-5556666', status: 'Available' },
    { id: 'D-004', name: 'Dr. Usman Ali', spec: 'Surgeon', exp: '12 Years', phone: '0333-7778888', status: 'On Leave' },
    { id: 'D-005', name: 'Dr. Ayesha Malik', spec: 'Gynecologist', exp: '9 Years', phone: '0345-9990000', status: 'Available' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Doctors Directory</h1>
            <p className="text-slate-500 text-sm mt-1">Manage hospital doctors and staff.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2">
            <FaPlus /> Add Doctor
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between bg-slate-50/50">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Search doctors..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Doctor Name</th>
                  <th className="p-4 font-semibold">Specialization</th>
                  <th className="p-4 font-semibold">Experience</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Availability</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {d.name.charAt(4)}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{d.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-blue-600">{d.spec}</td>
                    <td className="p-4 text-sm text-slate-600">{d.exp}</td>
                    <td className="p-4 text-sm text-slate-600">{d.phone}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        d.status === 'Available' ? 'bg-green-100 text-green-700' :
                        d.status === 'Busy' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"><FaEdit /></button>
                      <button className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Doctors;