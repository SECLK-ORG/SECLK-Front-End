import React from 'react';
import Box from '@mui/material/Box';
import Header from '../components/shared/Header/Header';
import SideNav from '../components/shared/SideNav/SideNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', }}
      >
        <Header />
        <Box sx={{ marginTop:"80px" }}>
        {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
