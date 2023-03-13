import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthProvider from './context/authProvider'
import BreakpointProvider from 'context/breakpointProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <AuthProvider>
        <BreakpointProvider>
          <App />
        </BreakpointProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
