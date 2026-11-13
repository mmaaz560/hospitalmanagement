import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { FaPlus, FaCheck, FaTimes, FaTrash, FaCalendarPlus, FaClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateAppointmentStatus, 
  deleteAppointment, 
  bookAppointment, 
  rescheduleAppointment 
} from '../redux/appointmentSlice';
import { addPatients } from '../redux/patientSlice'; 

const Appointments = () => {
  const dispatch = useDispatch();
  
  // Redux se data
  const { appointments } = useSelector((state) => state.appointments);
  const { patients } = useSelector((state) => state.patients); 
  const { doctors } = useSelector((state) => state.doctors); 

  // 🔴 States for Book Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', date: '', time: '',
    age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '', address: ''
  });

  // 🔴 States for Reschedule Modal
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ id: '', date: '', time: '' });

  // Form Inputs handle karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔴 Form Submit (Book Appointment)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Check karo patient pehle se list mein hai ya nahi
   const patientExists = patients.find(
     (p) => p.name && p.name.toLowerCase() === formData.patient.toLowerCase()
    );

    // 2. Agar naya patient hai, toh patients list mein add karo
    if (!patientExists) {
      const newPatient = {
        id: `P-${Math.floor(Math.random() * 1000) + 100}`,
        name: formData.patient,
        age: formData.age || 'N/A',
        gender: formData.gender || 'N/A',
        bloodGroup: formData.bloodGroup || 'N/A',
        phone: formData.phone || 'N/A',
        email: formData.email || 'N/A',
        address: formData.address || 'N/A',
        status: 'Outpatient', 
        medicalHistory: { allergies: 'None', conditions: 'None', pastSurgeries: 'None' },
        recentAppointments: []
      };
      dispatch(addPatients(newPatient)); 
    }

    // 3. Appointment Book karo
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
    setFormData({ patient: '', doctor: '', date: '', time: '', age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '', address: '' }); 
  };

  // 🔴 Reschedule Modal Open karne ka function
  const openRescheduleModal = (apt) => {
    setRescheduleData({ id: apt.id, date: apt.date, time: apt.time });
    setIsRescheduleOpen(true);
  };

  // 🔴 Reschedule Form Submit
  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    dispatch(rescheduleAppointment(rescheduleData));
    setIsRescheduleOpen(false);
    alert('✅ Appointment Rescheduled successfully!');
  };

  // Status Functions
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
                        
                        {/* Approve Button (Sirf Pending pe) */}
                        {a.status === 'Pending' && (
                          <button onClick={() => handleApprove(a.id)} className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition" title="Approve"><FaCheck /></button>
                        )}

                        {/* 🔴 Reschedule Button */}
                        <button onClick={() => openRescheduleModal(a)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Reschedule"><FaClock /></button>

                        {/* Cancel Button */}
                        <button onClick={() => handleCancel(a.id)} className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition" title="Cancel"><FaTimes /></button>

                        {/* Delete Button */}
                        <button onClick={() => handleDelete(a.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔴 1. BOOK APPOINTMENT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaCalendarPlus className="text-blue-600" /> Book Appointment
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
                
                {/* Patient Input (Datalist) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Patient Name</label>
                  <input 
                    type="text" 
                    name="patient" 
                    list="patient-list" 
                    placeholder="Select existing or type new patient..."
                    value={formData.patient} 
                    onChange={handleChange} 
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <datalist id="patient-list">
                    {patients && patients.map(p => (
                      <option key={p.id} value={p.name} />
                    ))}
                  </datalist>
                </div>

                {/* Naye Patient ki Details (Optional) */}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                  <p className="text-xs font-semibold text-blue-600 mb-2">Fill below details only if this is a NEW patient</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Age</label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 35" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="0300-1234567" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="patient@email.com" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House 12, Street 1..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>
                </div>

                {/* Doctor Dropdown */}
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
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4 shrink-0">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/30 transition">Book Now</button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* 🔴 2. RESCHEDULE APPOINTMENT MODAL */}
        {isRescheduleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaClock className="text-blue-600" /> Reschedule Appointment
                </h3>
                <button type="button" onClick={() => setIsRescheduleOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleRescheduleSubmit} className="p-5 space-y-4">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">New Date</label>
                  <input 
                    type="date" 
                    value={rescheduleData.date} 
                    onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })} 
                    required 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">New Time</label>
                  <input 
                    type="time" 
                    value={rescheduleData.time} 
                    onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })} 
                    required 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsRescheduleOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/30 transition">Update Schedule</button>
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