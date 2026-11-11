import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({ children , allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
console.log("🔍 ProtectedRoute User:", user); // 🔴 Yeh add karo

  //Agar user login nahi hai -> Login page par bhejo
  if (!user) {
    return <Navigate to="/" replace />;
  }

  //Agar user ki role allowed roles mein nahi hai -> Unauthorized/Home page par bhejo
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; 
    // Ya ek "Access Denied" page bana lo
  }

  return children;
};

export default ProtectedRoute;