// main.jsx
import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from './authprovider.jsx'; 

// Get the root element
const root = document.getElementById("root");
// Create a React root
const reactRoot = createRoot(root);

// Render the application
reactRoot.render(
  <React.StrictMode>
    {/* Wrap the entire application with ThemeProvider and AuthProvider */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider> 
        <Toaster />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
