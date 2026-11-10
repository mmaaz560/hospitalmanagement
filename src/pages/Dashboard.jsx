import React from 'react';
import { 
  FaUserInjured, FaUserMd, FaCalendarCheck, FaDollarSign, 
  FaEllipsisH, FaArrowUp
} from 'react-icons/fa';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Sidebar from '../component/Sidebar';

const Dashboard = () => {
  // 1. Stats Data (Cards ke liye)
  const stats = [
    { title: 'Total Patients', value: '1,250', increase: '+12%', icon: <FaUserInjured />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Doctors', value: '85', increase: '+5%', icon: <FaUserMd />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Appointments', value: '328', increase: '+18%', icon: <FaCalendarCheck />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Total Revenue', value: '$48,750', increase: '+12%', icon: <FaDollarSign />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  // 2. Chart Data (Graph ke liye)
  const chartData = [
    { name: 'Mon', appointments: 40 },
    { name: 'Tue', appointments: 65 },
    { name: 'Wed', appointments: 50 },
    { name: 'Thu', appointments: 80 },
    { name: 'Fri', appointments: 70 },
    { name: 'Sat', appointments: 95 },
    { name: 'Sun', appointments: 60 },
  ];

  // 3. Recent Activities Data
  const activities = [
    { title: 'New patient registered', time: '2 min ago', type: 'patient' },
    { title: 'Appointment booked', time: '5 min ago', type: 'appointment' },
    { title: 'Payment received', time: '10 min ago', type: 'payment' },
  ];

  return (
    // 🔴 Outer div mein bg-slate-50 aur min-h-screen add kiya
    <div className="flex bg-slate-50 min-h-screen">
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* 🔴 Main Content Area: lg:ml-64 lagaya taaki sidebar ke peeche na chhupe */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        {/* ─── Page Header ─── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm self-start sm:self-auto">
            + New Appointment
          </button>
        </div>

        {/* ─── 1. Stat Cards ─── */}
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

        {/* ─── 2. Charts & Activities ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Chart */}
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
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Area type="monotone" dataKey="appointments" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Recent Activities</h3>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800">View All</a>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              {activities.map((act, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-50 text-slate-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 
                    ${act.type === 'patient' ? 'text-blue-600 bg-blue-50' : ''} 
                    ${act.type === 'appointment' ? 'text-purple-600 bg-purple-50' : ''}
                    ${act.type === 'payment' ? 'text-emerald-600 bg-emerald-50' : ''}
                  `}>
                    {act.type === 'patient' && <FaUserInjured />}
                    {act.type === 'appointment' && <FaCalendarCheck />}
                    {act.type === 'payment' && <FaDollarSign />}
                  </div>
                  
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">{act.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;