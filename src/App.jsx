import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Billing from './pages/Billing';
import PatientDetail from './pages/PatientDetail';
// 🔴 Capital 'R' ka dhyan rakhna
import ProtectedRoute from './component/Protectedroute.jsx'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page (Sabke liye open) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 🔴 Dashboard (Sab dekh sakte hain) */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Receptionist']}>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* 🔴 Patients List (Sab dekh sakte hain) */}
        <Route path="/patients" element={
          <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Receptionist']}>
            <Patients />
          </ProtectedRoute>
        } />

        {/* 🔴 Patient Detail (Sab dekh sakte hain) */}
        <Route path="/patients/:id" element={
          <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Receptionist']}>
            <PatientDetail />
          </ProtectedRoute>
        } />

        {/* 🔴 Appointments (Sab dekh sakte hain) */}
        <Route path="/appointments" element={
          <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Receptionist']}>
            <Appointments />
          </ProtectedRoute>
        } />

        {/* 🔴 Doctors (SIRF ADMIN dekh sakta hai) */}
        <Route path="/doctors" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <Doctors />
          </ProtectedRoute>
        } />

        {/* 🔴 Billing (SIRF ADMIN aur RECEPTIONIST dekh sakte hain) */}
        <Route path="/billing" element={
          <ProtectedRoute allowedRoles={['Admin', 'Receptionist']}>
            <Billing />
          </ProtectedRoute>
        } />

        {/* Fallback: Agar koi galat URL dale toh dashboard pe bhej do */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;