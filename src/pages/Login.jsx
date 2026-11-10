import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserMd, FaUserShield, FaUser } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // 🔴 1. Import kiya
import { useAuth } from '../context/Authcontext'; // 🔴 2. Import kiya
import { useDispatch } from 'react-redux'; // 🔴 Redux hook import karo
import { loginUser } from '../redux/authSlice';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate(); // 🔴 3. Hook use kiya
  const { login } = useAuth();    // 🔴 4. Hook use kiya
  const dispatch = useDispatch()
  const roles = [
    { name: 'Admin', icon: <FaUserShield /> },
    { name: 'Doctor', icon: <FaUserMd /> },
    { name: 'Receptionist', icon: <FaUser /> },
  ];

  // 🔴 5. Login handle karne ka function
  const handleLogin = (e) => {
    e.preventDefault(); // Page refresh hone se rokna
      dispatch(loginUser({ role: role, name: "Test User" })); 
    navigate('/dashboard'); // Dashboard pe bhej dena
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* ─── LEFT SIDE: Image & Transparent Layer ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQodEeSXly0r7UR6npCohqtBt9SNBhmp_1cTUOLOn-Gg&s=10" 
          alt="Hospital" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 animate-[pulse_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-blue-900/30"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 p-16 flex flex-col justify-end h-full text-white">
          <div className="mb-12 animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
              Hospital <br /> Management System
            </h1>
            <p className="text-lg text-blue-100 flex items-center gap-3 font-medium drop-shadow-md">
              Better Care. A Healthier Tomorrow.
              <svg className="w-16 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h4l3-8 4 16 3-8h4"></path>
              </svg>
            </p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT SIDE: Login Form ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-20">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 animate-[fadeInRight_0.8s_ease-out]">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white mb-6 shadow-lg shadow-blue-500/30 animate-bounce">
              <MdHealthAndSafety className="w-9 h-9" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Login to your account</p>
          </div>

          <div className="flex bg-slate-100/80 rounded-2xl p-1.5 mb-8 relative border border-slate-200/60">
            {roles.map((r) => (
              <button
                type="button" // 🔴 Important: Yeh button form submit na kare
                key={r.name}
                onClick={() => setRole(r.name)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 z-10 ${
                  role === r.name 
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50 scale-[1.02]' 
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {r.icon} <span className="hidden sm:block">{r.name}</span>
              </button>
            ))}
          </div>

          {/* 🔴 Form tag mein onSubmit={handleLogin} add kiya */}
          <form className="space-y-5" onSubmit={handleLogin}>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 text-slate-700 font-medium placeholder:font-normal"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <FaLock className="w-4 h-4" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 text-slate-700 font-medium placeholder:font-normal"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2.5 text-slate-500 font-medium group-hover:text-slate-800 transition-colors">Remember Me</span>
              </label>
              <a href="#" className="font-bold text-blue-600 hover:text-blue-800 transition-all hover:underline decoration-2 underline-offset-2">
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className="w-full mt-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 group"
            >
              Login as {role}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </form>

          <div className="text-center mt-10 text-xs font-medium text-slate-400">
            &copy; 2026 Hospital Management System. All rights reserved.
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}} />
    </div>
  );
};

export default Login;