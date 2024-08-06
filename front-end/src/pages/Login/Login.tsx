import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import styles from './Login.module.scss';
import background from '../../assets/images/background.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import {logo} from '../../assets/images';
import { CustomButton, CustomVisibilityIcon, CustomVisibilityOffIcon, StyledTextField } from '../../assets/theme/theme';
import { Rectangle1,Rectangle2 } from '../../assets/images';
import { loginFormDto, loginPayloadDto } from '../../utilities/models';
import { validateFormData } from '../../utilities/helpers';
import { UserService } from '../../services/user.service';

import { showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';

import { useDispatch, useSelector } from 'react-redux';
import { loginClear, loginRequest } from '../../redux/userSlice/userSlice'; 
import { RootState } from '../../redux/store';
import { APP_ACTION_STATUS } from '../../utilities/constants/app.constants';
const Login: React.FC = () => {

    const loginState = useSelector((state: RootState) => state.user.login);

    const INITIAL_RESET_FORM_DATA: loginFormDto = {
      email:{ value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
      password: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    }
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const [loginForm,setLoginForm]=useState<loginFormDto>(INITIAL_RESET_FORM_DATA);
    const [helperText, setHelperText] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const onInputHandleChange=(property:string,value:string)=>{
      setLoginForm({
          ...loginForm,
          [property]: {
            ...loginForm[property as keyof typeof loginForm],
            value: value,
            error: null,
          },
        });
  }
  const handleInputFocus=(property:string)=>{
      setLoginForm({
          ...loginForm,
          [property]: {
            ...loginForm[property as keyof typeof loginForm],
            error: null,
          },
        });
  }

  useEffect(() => {
    if (loginState.status === APP_ACTION_STATUS.SUCCESS) {
        setIsBtnLoading(false)
        localStorage.setItem('accessToken',loginState.data.data)
       
        navigate('/projects')

    } else if (loginState.status === APP_ACTION_STATUS.ERROR) {
 
      setIsBtnLoading(false)
    }
  }, [loginState, dispatch]);


  const handleLogin=async ()=>{
 
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(loginForm);
    setLoginForm(validateData)
    if(isValid){
      setIsBtnLoading(true)
      const payload:loginPayloadDto={
        email: loginForm.email.value,
        password: loginForm.password.value
      }
      dispatch(loginRequest(payload));
      // UserService.login(payload).then((result:any)=>{
      //   localStorage.setItem('accessToken',result.data.data)
      //   localStorage.setItem('isLogin',"true")
      //   showSuccessToast(result.data.message)
      //   setIsBtnLoading(false)
      //   navigate('/projects')
      // }).catch((error:any)=>{
      // showErrorToast(error)
      // setIsBtnLoading(false)
      // })

    }
    
      
  }


  const handleForgotPassWord=()=>{
    navigate('/forgotPass')
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
              margin='dense'
              placeholder='Enter Email'
              size='small'
              value={loginForm.email.value}
              error={!!loginForm.email.error}
              disabled={loginForm.email.disable}
              required={loginForm.email.isRequired}
              helperText={helperText && loginForm.email.error}
              onFocus={() => handleInputFocus('email')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('email', event.target.value)}
            />
             <StyledTextField
              label="Enter  Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
               margin='dense'
              fullWidth
              placeholder='Enter Password'
              size='small'
              value={loginForm.password.value}
              error={!!loginForm.password.error}
              disabled={loginForm.password.disable}
              required={loginForm.password.isRequired}
              helperText={helperText && loginForm.password.error}
              onFocus={() => handleInputFocus('password')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('password', event.target.value)}
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
              loading={isBtnLoading}
              onClick={() => handleLogin()}
            >
              Login
            </CustomButton>
            <Box  className={styles.forgotPassword}>
            <Typography onClick={()=>{handleForgotPassWord()}} variant="body2" >
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
