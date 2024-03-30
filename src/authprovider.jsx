// authprovider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on initial render
    checkAuth();
  }, []);

  // Function to check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    // If token exists, user is authenticated
    if (token) {
      setIsAuthenticated(true);
    } else {
      // No token found, user is not authenticated
      setIsAuthenticated(false);
    }
  };

  // Function to handle user login
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };




  // Provide AuthContext value to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
