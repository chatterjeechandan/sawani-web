import React from 'react';
import Routes from './routes/Routes';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/css/styles.css';
import { AuthProvider } from './utils/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;