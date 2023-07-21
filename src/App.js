import React from 'react';
import Routes from './routes/Routes';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/css/styles.css';
import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;