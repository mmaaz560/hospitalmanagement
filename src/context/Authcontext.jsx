import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User state (shuru mein null, matlab koi login nahi hai)
  const [user, setUser] = useState(null);

  // Login function
  const login = (role) => {
    // Yahan hum role save kar rahe hain
    setUser({ role: role, name: "Test User" });
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);