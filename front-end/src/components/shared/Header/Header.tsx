import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import styles from './Header.module.scss';
import Box from '@mui/material/Box';
import { jwtDecode } from 'jwt-decode';
const drawerWidth = 240;

const Header: React.FC = () => {

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   
   const [userData, setUserData] = useState<any>()

   let token
  useEffect(() => {
    token= localStorage.getItem('accessToken')
    if(token){
     const data= jwtDecode(token)
     console.log("data",data)
     setUserData(data)
    }

  }, [])
  
  return (
    <AppBar position="fixed"
    className={`${styles.appBar} ${scrolled ? styles.appBarScrolled : ''}`}
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <IconButton color="inherit">
          <Avatar alt= {userData?.name} src="/static/images/avatar/1.jpg" />
        </IconButton>
        <Box className={styles.profileBox}>
            <Typography variant="h6" noWrap>
            {userData?.name}
            </Typography>
            <Typography variant="caption" noWrap>
              {userData?.role}
            </Typography>
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
