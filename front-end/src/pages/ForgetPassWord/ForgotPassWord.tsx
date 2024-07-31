import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { CustomButton, CustomVisibilityIcon, CustomVisibilityOffIcon, StyledTextField } from '../../assets/theme/theme';
import { forgotImage, resetImage } from '../../assets/images';
import { ResetFormDto, ResetPayload } from '../../utilities/models';
import { validateFormData } from '../../utilities/helpers';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';
import styles from './ForgotPassWord.module.scss'

const ForgetPassWord = () => {
  const navigate= useNavigate()
  const INITIAL_FORGOT_FORM_DATA: any = {
    email:{ value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
  }
  const [resetData, setResetData] = useState<any>(INITIAL_FORGOT_FORM_DATA);
  const [helperText, setHelperText] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleResetPassword = async() => {
    setHelperText(true);
    setIsBtnLoading(true)
    const [validateData, isValid] = await validateFormData(resetData);
    setResetData(validateData);

    if(isValid){
      const payload:any={
        email: resetData.email.value,
      }
      UserService.resetPassword(payload).then((result)=>{
        showSuccessToast(result.data.message)
        navigate('/')

      }).catch((error)=>{
        showErrorToast(error)
      })

    }
    setIsBtnLoading(false)
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


  return (
    <div className={styles.container}>

    <Grid container >
   
         <Grid item xs={12} md={6} className={styles.loginSection}>
            <Box className={styles.loginBox}>
              <Typography className={styles.subtitle}>
             Forgot PassWord ?
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
  
    <CustomButton
             variant="contained"
           type="submit"
             className={styles.button}
             fullWidth
             loading={isBtnLoading}
             onClick={()=>handleResetPassword()}
              >
             Send Email
              </CustomButton>
            </Box>
         </Grid>
          
         <Grid item xs={12} md={6} className={styles.imageSection}>
      <img src={forgotImage} alt="Laptop" className={styles.image} />
    </Grid>
    </Grid>
     </div>
  )
}

export default ForgetPassWord