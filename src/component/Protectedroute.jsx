import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // 1. Agar user login nahi hai -> Login page par bhejo
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. Agar user ki role allowed roles mein nahi hai -> Unauthorized/Home page par bhejo
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; // Ya ek "Access Denied" page bana lo
  }

  // 3. Sab theek hai -> Page render karo
  return children;
};

export default ProtectedRoute;