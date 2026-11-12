import React, { useState } from 'react';
import { 
  FaUserInjured, FaUserMd, FaCalendarCheck, FaDollarSign, 
  FaEllipsisH, FaArrowUp, FaTimes, FaCalendarPlus
} from 'react-icons/fa';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Sidebar from '../component/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 🔴 Navigate ke liye
import { bookAppointment } from '../redux/appointmentSlice'; // 🔴 Action import
import { addPatients } from '../redux/patientSlice'; // 🔴 Action import

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔴 Navigate hook

  const { patients } = useSelector((state) => state.patients);
  const { doctors } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);
  const { invoices } = useSelector((state) => state.billing);

  // 🔴 Modal aur Form ki State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: ''
  });

  // 🔴 Safe Counts (Agar data undefined ho toh crash na ho)
  const totalPatients = patients ? patients.length : 0;
  const totalDoctors = doctors ? doctors.length : 0;
  const totalAppointments = appointments ? appointments.length : 0;
  
  // Total Revenue calculate karna (sirf Paid invoices ka)
  const totalRevenue = invoices 
    ? invoices.reduce((sum, inv) => inv.status === 'Paid' ? sum + Number(inv.amount) : sum, 0) 
    : 0;

  const stats = [
    { title: 'Total Patients', value: totalPatients, increase: '+12%', icon: <FaUserInjured />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Doctors', value: totalDoctors, increase: '+5%', icon: <FaUserMd />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Appointments', value: totalAppointments, increase: '+18%', icon: <FaCalendarCheck />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Total Revenue', value: `Rs. ${totalRevenue}`, increase: '+12%', icon: <FaDollarSign />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  // Chart Data Calculate
  const getChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    if (appointments) {
      appointments.forEach((apt) => {
        if (apt.date) {
          const dateObj = new Date(apt.date);
          const dayName = days[dateObj.getDay()];
          if (counts[dayName] !== undefined) {
            counts[dayName]++;
          }
        }
      });
    }

    return [
      { name: 'Mon', appointments: counts['Mon'] },
      { name: 'Tue', appointments: counts['Tue'] },
      { name: 'Wed', appointments: counts['Wed'] },
      { name: 'Thu', appointments: counts['Thu'] },
      { name: 'Fri', appointments: counts['Fri'] },
      { name: 'Sat', appointments: counts['Sat'] },
      { name: 'Sun', appointments: counts['Sun'] },
    ];
  };

  const chartData = getChartData();

  // Recent Activities Dummy Data
  const activities = [
    { title: 'New patient registered', time: '2 min ago', type: 'patient' },
    { title: 'Appointment booked', time: '5 min ago', type: 'appointment' },
    { title: 'Payment received', time: '10 min ago', type: 'payment' },
  ];

  // 🔴 Form Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check karo patient exist karta hai ya nahi
    const patientExists = patients.find(
      (p) => p.name.toLowerCase() === formData.patient.toLowerCase()
    );

    // Agar naya patient hai, toh usko add karo
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
        status: 'Outpatient', // 🔴 Default status Outpatient
        medicalHistory: { allergies: 'None', conditions: 'None', pastSurgeries: 'None' },
        recentAppointments: []
      };
      dispatch(addPatients(newPatient)); 
    }

    // Appointment Book karo
    const newAppointment = {
      id: `A-${Math.floor(Math.random() * 1000) + 100}`, 
      patient: formData.patient, 
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      status: 'Pending' 
    };
    dispatch(bookAppointment(newAppointment));
    
    // Form reset aur Modal band karo
    setIsModalOpen(false); 
    setFormData({ patient: '', doctor: '', date: '', time: '', age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '', address: '' }); 

    // 🔴 Appointment page par redirect karo
    navigate('/appointments');
  };

  return (
    <div className="flex bg-slate-50 min-h-screen relative">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          {/* 🔴 Button update kiya gaya */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm self-start sm:self-auto flex items-center gap-2"
          >
            <FaCalendarPlus /> New Appointment
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} opacity-40 group-hover:scale-110 transition-transform duration-500`}></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-extrabold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
                <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                  <FaArrowUp className="text-[10px]" /> {stat.increase}
                </span>
                <span className="text-slate-400 font-medium">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Appointments Overview</h3>
              <button className="text-slate-400 hover:text-slate-700"><FaEllipsisH /></button>
            </div>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' }} />
                  <Area type="monotone" dataKey="appointments" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Recent Activities</h3>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800">View All</a>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {activities.map((act, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-50 text-slate-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 
                    ${act.type === 'patient' ? 'text-blue-600 bg-blue-50' : ''} 
                    ${act.type === 'appointment' ? 'text-purple-600 bg-purple-50' : ''}
                    ${act.type === 'payment' ? 'text-emerald-600 bg-emerald-50' : ''}
                  `}>
                    {act.type === 'patient' && <FaUserInjured />}
                    {act.type === 'appointment' && <FaCalendarCheck />}
                    {act.type === 'payment' && <FaDollarSign />}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">{act.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔴 BOOK APPOINTMENT MODAL (Dashboard ke andar) */}
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
                
                {/* Patient Input */}
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

      </main>
    </div>
  );
};

export default Dashboard;