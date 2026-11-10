import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Billing from './pages/Billing';
import PatientDetail from './pages/PatientDetail';
import ProtectedRoute from './component/Protectedroute'
const App = () => {
  return (
    <>
     <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/doctors" element={<Doctors/>}/>
            <Route path="/appointments" element={<Appointments/>}/>
            <Route path="/patients" element={<Patients/>}/>
            <Route path="/billing" element={<Billing/>}/>
            <Route path="/patients/:id" element={
              <ProtectedRoute allowedRoles={['Admin', 'Receptionist', 'Doctor']}>
                <PatientDetail />
              </ProtectedRoute>
            } />    
        </Routes>
     </Router>
    </>
  )
}

export default App