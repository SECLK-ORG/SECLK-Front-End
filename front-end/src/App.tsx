import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { PrimaryTheme } from './assets/theme/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={PrimaryTheme}>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    limit={2}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />

    <AppRoutes/>
   
   </ThemeProvider>
 
  );
}

export default App;
