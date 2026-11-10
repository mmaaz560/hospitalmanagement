import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import { 
  FaArrowLeft, FaEdit, FaTrash, FaUser, FaPhone, 
  FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaCalendarCheck, FaNotesMedical 
} from 'react-icons/fa';
import { patientsData } from '../data/patientsData';

const PatientDetail = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye
  const navigate = useNavigate();

  // 🔴 Abhi ke liye Dummy Data (Baad mein isko Redux/LocalStorage se uthana)
  const patient = patientsData.find(p => p.id ===id)
    if (!patient) {
    return <div className="p-10 text-center text-red-500 font-bold">Patient Not Found!</div>;
  }
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        {/* ─── Header ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/patients')} 
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition shadow-sm"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">Patient Details</h1>
              <p className="text-slate-500 text-sm mt-1">View and manage patient's complete profile.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition flex items-center gap-2 text-sm">
              <FaEdit className="text-blue-500" /> Edit
            </button>
            <button className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-red-100 transition flex items-center gap-2 text-sm">
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ─── LEFT COLUMN: Personal Info Card ─── */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <div className="h-24 bg-linear-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-6 pb-6 relative">
              <div className="w-24 h-24 bg-white rounded-full p-1 absolute -top-12 left-1/2 -translate-x-1/2 shadow-md">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                  {patient.name.charAt(0)}
                </div>
              </div>
              
              <div className="pt-16 text-center">
                <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
                <p className="text-sm text-slate-500 font-medium">ID: {patient.id}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  {patient.status}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><FaUser /></div>
                  <div>
                    <p className="text-slate-400 text-xs">Age & Gender</p>
                    <p className="font-semibold text-slate-700">{patient.age} Years, {patient.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg"><FaHeartbeat /></div>
                  <div>
                    <p className="text-slate-400 text-xs">Blood Group</p>
                    <p className="font-semibold text-slate-700">{patient.bloodGroup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><FaPhone /></div>
                  <div>
                    <p className="text-slate-400 text-xs">Phone</p>
                    <p className="font-semibold text-slate-700">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><FaEnvelope /></div>
                  <div>
                    <p className="text-slate-400 text-xs">Email</p>
                    <p className="font-semibold text-slate-700">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><FaMapMarkerAlt /></div>
                  <div>
                    <p className="text-slate-400 text-xs">Address</p>
                    <p className="font-semibold text-slate-700 leading-tight">{patient.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Medical History & Appointments ─── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Medical History Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaNotesMedical className="text-blue-500" /> Medical History
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Allergies</p>
                  <p className="text-sm text-slate-700 font-medium">{patient.medicalHistory.allergies}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Chronic Conditions</p>
                  <p className="text-sm text-slate-700 font-medium">{patient.medicalHistory.conditions}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Past Surgeries</p>
                  <p className="text-sm text-slate-700 font-medium">{patient.medicalHistory.pastSurgeries}</p>
                </div>
              </div>
            </div>

            {/* Recent Appointments Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaCalendarCheck className="text-blue-500" /> Recent Appointments
                </h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Book New</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">Doctor</th>
                      <th className="p-4 font-semibold">Date & Time</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {patient.recentAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 text-sm font-bold text-slate-800">{apt.doctor}</td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-slate-800">{apt.date}</div>
                          <div className="text-xs text-slate-500">{apt.time}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetail;