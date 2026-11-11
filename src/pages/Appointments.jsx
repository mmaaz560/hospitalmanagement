import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { FaPlus, FaCheck, FaTimes, FaTrash, FaCalendarPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppointmentStatus, deleteAppointment, bookAppointment } from '../redux/appointmentSlice';
import { patientsData } from '../data/patientsData'; 
import { doctorsData } from '../data/doctorsData'; 
import { addPatients } from '../redux/patientSlice'; 
// 🔴 Doctors ka data import karo

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
const { patients } = useSelector((state) => state.patients); 
  const { doctors } = useSelector((state) => state.doctors); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '', // 🔴 Default khaali rakha taaki user select kare
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Check karo ki patient pehle se list mein hai ya nahi
    const patientExists = patients.find(
      (p) => p.name.toLowerCase() === formData.patient.toLowerCase()
    );

    // 2. Agar patient nahi hai, toh naya patient banao
    if (!patientExists) {
      const newPatient = {
        id: `P-${Math.floor(Math.random() * 1000) + 100}`, // Random ID
        name: formData.patient,
        age: 'N/A', // Kyunki form mein age nahi hai
        gender: 'N/A',
        bloodGroup: 'N/A',
        phone: 'N/A',
        email: 'N/A',
        address: 'N/A',
        status: 'Active',
        medicalHistory: { allergies: 'N/A', conditions: 'N/A', pastSurgeries: 'N/A' },
        recentAppointments: []
      };

      // 🔴 Patients list mein automatic add karo
      dispatch(addPatients(newPatient)); 
    }

    // 3. Ab Appointment Book karo
    const newAppointment = {
      id: `A-${Math.floor(Math.random() * 1000) + 100}`, 
      patient: formData.patient, 
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      status: 'Pending' 
    };

    dispatch(bookAppointment(newAppointment));
    
    // Form reset karo
    setIsModalOpen(false); 
    setFormData({ patient: '', doctor: '', date: '', time: '' }); 
  };

  const handleApprove = (id) => dispatch(updateAppointmentStatus({ id, status: 'Confirmed' }));
  const handleCancel = (id) => {
    if (window.confirm("Kya aap is appointment ko cancel karna chahte hain?")) {
      dispatch(updateAppointmentStatus({ id, status: 'Cancelled' }));
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Kya aap is appointment ko delete karna chahte hain?")) {
      dispatch(deleteAppointment(id));
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Appointments</h1>
            <p className="text-slate-500 text-sm mt-1">Manage patient bookings and schedules.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2"
          >
            <FaPlus /> Book Appointment
          </button>
        </div>

        {/* Table */}
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
                          <button onClick={() => handleApprove(a.id)} className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition" title="Approve"><FaCheck /></button>
                        )}
                        <button onClick={() => handleCancel(a.id)} className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition" title="Cancel"><FaTimes /></button>
                        <button onClick={() => handleDelete(a.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOOK APPOINTMENT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaCalendarPlus className="text-blue-600" /> Book Appointment
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                
                {/* Patient Input (Datalist) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Patient Name</label>
                  <input 
                    type="text" 
                    name="patient" 
                    list="patient-list" 
                    placeholder="Select or type new patient..."
                    value={formData.patient} 
                    onChange={handleChange} 
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <datalist id="patient-list">
                    {patientsData.map(p => (
                      <option key={p.id} value={p.name} />
                    ))}
                  </datalist>
                </div>

                {/* 🔴 Doctor Dropdown (Redux/Dynamic Data) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Select Doctor</label>
                  <select 
                     name="doctor" 
                     value={formData.doctor} 
                     onChange={handleChange} 
                     required
                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   >
                     <option value="">-- Choose a Doctor --</option>
                     {/* 🔴 Loop chalao Redux wale doctors pe */}
                     {doctors && doctors.map((doc) => (
                       <option key={doc.id} value={doc.name}>
                         {doc.name} ({doc.specialty})
                       </option>
                     ))}
                   </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Time</label>
                    <input 
                      type="time" 
                      name="time" 
                      value={formData.time} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/30 transition">Book Now</button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Appointments;