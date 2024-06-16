import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/index.scss'
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);