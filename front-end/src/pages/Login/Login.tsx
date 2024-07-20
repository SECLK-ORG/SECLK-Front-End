import React from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import styles from './Login.module.scss';
import background from '../../assets/images/background.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import {logo} from '../../assets/images';
import { CustomButton } from '../../assets/theme/theme';
const Login: React.FC = () => {
const navigate =useNavigate();

    const handleLogin=()=>{
        navigate('/projects');
    }

  return (
    <div className={styles.container}>
             <div className={styles.shape1}></div>
             <div className={styles.shape2}></div>
      <Grid container >
        <Grid item xs={12} md={6} className={styles.loginSection}>

         <Box className={styles.loginBox}>
            <img src={logo} alt="" style={{width:"10rem"}} />
          <Typography  className={styles.subtitle}>
            Welcome Back!
          </Typography>
        
            <TextField
              label="Enter Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
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
