import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthProvider from './context/providers/authProvider';
import BreakpointProvider from 'context/providers/breakpointProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/auniverse">
    <AuthProvider>
      <BreakpointProvider>
        <App />
      </BreakpointProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);