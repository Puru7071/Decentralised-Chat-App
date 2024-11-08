import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatAppProvider from './context/ChatAppContext.js';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChatAppProvider>
      <App />
      <Toaster/>
    </ChatAppProvider>
  </BrowserRouter>

);

