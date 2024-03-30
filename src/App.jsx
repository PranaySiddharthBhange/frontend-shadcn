import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './authprovider'; // Import AuthContext

import Homepage from './homepage';
import Signup from './signup';
import Login from './login';
import Dashboard from './dashboard';

function App() {
  const { isAuthenticated } = useContext(AuthContext); 

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Homepage />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
