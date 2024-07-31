import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import styles from './ResetPassWord.module.scss';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { CustomButton, CustomVisibilityIcon, CustomVisibilityOffIcon, StyledTextField } from '../../assets/theme/theme';
import { resetImage } from '../../assets/images';
import { ResetFormDto } from '../../utilities/models';
import { validateFormData } from '../../utilities/helpers';
import { VisibilityOff, Visibility } from '@mui/icons-material';
const ResetPassWord: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token;
    const INITIAL_RESET_FORM_DATA: ResetFormDto = {
        email:{ value: "", isRequired: true, disable: true, readonly: true, validator: "email", error: "", },
        confirmPassword:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        password: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        token:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
   }
    const [resetData, setResetData] = useState<ResetFormDto>(INITIAL_RESET_FORM_DATA);
    const [helperText, setHelperText] = useState(true);
    const [resetBtnLoading, setResetBtnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

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
                    },
                    token:{
                        ...resetData.token,
                        value:token
                    }
                }));
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, [token]);
    
    const handleResetPassword = async() => {
        setResetBtnLoading(true)
        setHelperText(true);
        console.log("form",resetData)
       
        const [validateData, isValid] = await validateFormData(resetData);
        setResetData(validateData);
        if(resetData.password.value!==resetData.confirmPassword.value){
            console.log("insede",resetData.password.value!==resetData.confirmPassword.value)
            setResetData({
                ...resetData,
                confirmPassword:{
                    ...resetData.confirmPassword,
                    error:"Password and Confirm Password Should match"
                }
            })
            setResetBtnLoading(false)
            
            return
        }
        setResetBtnLoading(false)
    };

    const onInputHandleChange=(property:string,value:string)=>{
        setResetData({
            ...resetData,
            [property]: {
              ...resetData[property as keyof typeof resetData],
              value: value,
              error: null,
            },
          });
    }
    const handleInputFocus=(property:string)=>{
        setResetData({
            ...resetData,
            [property]: {
              ...resetData[property as keyof typeof resetData],
              error: null,
            },
          });
    }

const handleTogglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
const handleTogglePasswordVisibility2=()=>{
    setShowPassword2(!showPassword2);
};


    return (
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
             fullWidth
             label="Email"
             placeholder='Enter Email'
             size='small'
             margin='dense'
             value={resetData.email.value}
             error={!!resetData.email.error}
             disabled={resetData.email.disable}
             required={resetData.email.isRequired}
             helperText={helperText && resetData.email.error}
             onFocus={() => handleInputFocus('email')}
             onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('email', event.target.value)}
                
            />
        <StyledTextField
              label="Enter New Password"
              type={showPassword2 ? 'text' : 'password'}
              variant="outlined"
             margin='dense'
              fullWidth
              placeholder='Enter Password'
              size='small'
              value={resetData.password.value}
              error={!!resetData.password.error}
              disabled={resetData.password.disable}
              required={resetData.password.isRequired}
              helperText={helperText && resetData.password.error}
              onFocus={() => handleInputFocus('password')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('password', event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                     sx={{color:"#437EF7"}}
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility2}
                      edge="end"
                    >
                      {showPassword2 ? <CustomVisibilityOffIcon /> : <CustomVisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
        <StyledTextField
              label="Enter Confirm Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin='dense'
              fullWidth
              placeholder='Enter Confirm Password'
              size='small'
              value={resetData.confirmPassword.value}
              error={!!resetData.confirmPassword.error}
              disabled={resetData.confirmPassword.disable}
              required={resetData.confirmPassword.isRequired}
              helperText={helperText && resetData.confirmPassword.error}
              onFocus={() => handleInputFocus('confirmPassword')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('confirmPassword', event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                     sx={{color:"#437EF7"}}
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <CustomVisibilityOffIcon /> : <CustomVisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
        
        <CustomButton
                 variant="contained"
                 type="submit"
                 className={styles.button}
                 fullWidth
                 loading={resetBtnLoading}
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
