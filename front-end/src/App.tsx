import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { PrimaryTheme } from './assets/theme/theme';
function App() {
  return (
    <ThemeProvider theme={PrimaryTheme}>
    <AppRoutes/>
   
   </ThemeProvider>
 
  );
}

export default App;
