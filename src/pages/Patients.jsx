import React, { useState } from 'react';
import Sidebar from '../component/sidebar';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { patientsData } from '../data/patientsData';

const Patients = () => {
  const [search, setSearch] = useState('');

  // Dummy Data
  const patients = patientsData
  const navigate = useNavigate(); // ✅ Component ke andar hona chahiye

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Patients Directory</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all patient records here.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2">
            <FaPlus /> Add Patient
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium text-sm hover:bg-slate-50">
              <FaFilter /> Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Patient ID</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Age</th>
                  <th className="p-4 font-semibold">Gender</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.map((p) => (
                  <tr key={p.id}
                   onClick={() => navigate(`/patients/${p.id}`)} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-800">{p.id}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{p.name}</td>
                    <td className="p-4 text-sm text-slate-600">{p.age} Yrs</td>
                    <td className="p-4 text-sm text-slate-600">{p.gender}</td>
                    <td className="p-4 text-sm text-slate-600">{p.phone}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        p.status === 'Active' ? 'bg-green-100 text-green-700' :
                        p.status === 'Critical' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {p.status}
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

export default Patients;