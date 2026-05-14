import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Automatically use the current domain in production (Vercel) or localhost in development
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
        <Toaster />
    </AuthProvider>
  </React.StrictMode>
);