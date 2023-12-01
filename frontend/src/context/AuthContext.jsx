import React, { createContext, useState, useEffect } from 'react';

// Creating the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Check for an existing authentication token in local storage when the app loads
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, []);

  // Function to update the context state and local storage when a user logs in
  const setUserAuthInfo = (data) => {
    setAuthData(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  // Function to clear the context state and local storage when a user logs out
  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, setUserAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
