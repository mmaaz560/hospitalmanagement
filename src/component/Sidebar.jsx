import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  FaHome, FaUserInjured, FaUserMd, FaCalendarAlt, 
  FaFileInvoiceDollar, FaChartBar, FaCog, FaSignOutAlt, 
  FaBars, FaTimes, 
} from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import { logoutUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Sidebar Navigation Links
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Patients', path: '/patients', icon: <FaUserInjured /> },
    { name: 'Doctors', path: '/doctors', icon: <FaUserMd /> },
    { name: 'Appointments', path: '/appointments', icon: <FaCalendarAlt /> },
    { name: 'Billing', path: '/billing', icon: <FaFileInvoiceDollar /> },
    { name: 'Reports', path: '/reports', icon: <FaChartBar /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // logout function
  const handlelogout = ()=>{
    const confirmlogout = window.confirm('Kya aap sach mein logout karna chahte hain?')
    if(confirmlogout){
      dispatch(logoutUser())
      navigate('/')
    }
  }
  return (
    <>
      {/* ─── Mobile Menu Button ─── */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMenu} 
          className="p-3 bg-white rounded-xl shadow-md text-blue-600 hover:bg-blue-50 transition-colors"
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* ─── Overlay (Mobile) ─── */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="p-2 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <MdHealthAndSafety className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              Hospital<span className="text-blue-600">HMS</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Main Menu
          </p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Mobile pe click karne pe band ho jaye
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Section (Profile & Logout) */}
        <div className="p-4 border-t border-slate-100">
          {/* Profile Card */}
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">Dr. Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@hms.com</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
          onClick={()=>handlelogout()}
           className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 font-semibold bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;