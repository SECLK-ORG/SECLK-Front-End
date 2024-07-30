import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import styles from './Login.module.scss';
import background from '../../assets/images/background.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import {logo} from '../../assets/images';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import { Rectangle1,Rectangle2 } from '../../assets/images';
const Login: React.FC = () => {
const navigate =useNavigate();

    const handleLogin=()=>{
        navigate('/projects');
    }

  return (
    <div className={styles.container}>

      <Grid container >
        
        <Grid item xs={12} md={6} className={styles.loginSection}>
        <Box className={styles.shape1}>
        <img src={Rectangle1} alt="" />
        </Box>
            <Box className={styles.shape2}>
            <img src={Rectangle2} alt="" />
            </Box>
         <Box className={styles.loginBox}>
            <img src={logo} alt="" style={{width:"10rem"}} />
          <Typography  className={styles.subtitle}>
            Welcome Back!
          </Typography>
        
            <StyledTextField
              label="Enter Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <StyledTextField
              label="Enter Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <CustomButton
              variant="contained"
              type="submit"
              className={styles.button}
              fullWidth
              onClick={() => handleLogin()}
            >
              Login
            </CustomButton>
            <Box  className={styles.forgotPassword}>
            <Typography variant="body2">
              Forgot Password?</Typography>
              </Box>
            
            </Box>
    
        </Grid>
        
        <Grid item xs={12} md={6} className={styles.imageSection}>
          <img src={background} alt="Laptop" className={styles.image} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
