import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import styles from './ResetPassWord.module.scss';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import { resetImage } from '../../assets/images';
import { ResetFormDto } from '../../utilities/models';
const ResetPassWord: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token;
    const ResetData: ResetFormDto = {
        email:{ value: "", isRequired: true, disable: true, readonly: true, validator: "email", error: "", },
        confirmPassword:{ value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
        password: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
   }
    const [resetData, setResetData] = useState<ResetFormDto>(ResetData);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);
                setResetData(prevState => ({
                    ...prevState,
                    email: {
                        value: decodedToken?.email||" ",
                        isRequired: true,
                        disable: true,
                        readonly: true,
                        validator: "text",
                        error: ""
                    }
                }));
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, [token]);
    
    const handleResetPassword = () => {
        // Implement your password reset logic here
    };

    return (
        // <div>
        //     <h1>Reset Password</h1>
        //     <div>Decoded Token: {JSON.stringify(resetData, null, 2)}</div>
        //     <button onClick={handleResetPassword}>Reset Password</button>
        // </div>
        <div className={styles.container}>

        <Grid container >
        <Grid item xs={12} md={6} className={styles.imageSection}>
          <img src={resetImage} alt="Laptop" className={styles.image} />
        </Grid>
             <Grid item xs={12} md={6} className={styles.loginSection}>
                <Box className={styles.loginBox}>
                  <Typography className={styles.subtitle}>
                 Reset Password
                  </Typography>
        <StyledTextField
              value={resetData.email.value}
              label="Enter Email"
              variant="outlined"
              fullWidth
              margin="normal"
              size='medium'
              required={resetData.email.readonly}
             disabled={resetData.email.disable}
                
            />
        <StyledTextField
              label="Enter Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
        <StyledTextField
              label="Enter Confirm Password"
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
                 onClick={handleResetPassword}
                  >
                 Reset Password
                  </CustomButton>
                </Box>
             </Grid>
              

        </Grid>
         </div>
    );
};

export default ResetPassWord;
