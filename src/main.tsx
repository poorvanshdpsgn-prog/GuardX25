import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SmartBagProvider } from './context/SmartBagContext';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmartBagProvider>
        <App />
      </SmartBagProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
