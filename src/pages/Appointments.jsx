import React from 'react';
import Sidebar from '../component/sidebar';
import { FaPlus, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const Appointments = () => {
  // Dummy Data
  const appointments = [
    { id: 'A-101', patient: 'Muhammad Ali', doctor: 'Dr. Sarah Ahmed', date: '12 Nov 2026', time: '10:00 AM', status: 'Confirmed' },
    { id: 'A-102', patient: 'Ayesha Khan', doctor: 'Dr. Ahmed Khan', date: '12 Nov 2026', time: '11:30 AM', status: 'Pending' },
    { id: 'A-103', patient: 'Hassan Raza', doctor: 'Dr. Fatima Zafar', date: '13 Nov 2026', time: '09:00 AM', status: 'Confirmed' },
    { id: 'A-104', patient: 'Fatima Noor', doctor: 'Dr. Usman Ali', date: '13 Nov 2026', time: '11:00 AM', status: 'Completed' },
    { id: 'A-105', patient: 'Usman Tariq', doctor: 'Dr. Ayesha Malik', date: '14 Nov 2026', time: '02:00 PM', status: 'Cancelled' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Appointments</h1>
            <p className="text-slate-500 text-sm mt-1">Manage patient bookings and schedules.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2">
            <FaPlus /> Book Appointment
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Patient Name</th>
                  <th className="p-4 font-semibold">Doctor</th>
                  <th className="p-4 font-semibold">Date & Time</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-800">{a.patient}</td>
                    <td className="p-4 text-sm text-slate-600">{a.doctor}</td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-slate-800">{a.date}</div>
                      <div className="text-xs text-slate-500">{a.time}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        a.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        a.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                        a.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        {a.status === 'Pending' && (
                          <button className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition" title="Approve"><FaCheck /></button>
                        )}
                        <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Reschedule"><FaClock /></button>
                        <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Cancel"><FaTimes /></button>
                      </div>
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

export default Appointments;