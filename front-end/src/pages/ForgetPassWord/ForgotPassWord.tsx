import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import { forgotImage, messageSent } from '../../assets/images';
import { forgotPasswordPayload } from '../../utilities/models';
import { validateFormData } from '../../utilities/helpers';
import { UserService } from '../../services/user.service';
import { showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';
import styles from './ForgotPassWord.module.scss';

const ForgetPassWord = () => {
  const navigate = useNavigate();
  const INITIAL_FORGOT_FORM_DATA = {
    email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "" },
  };
  const [resetData, setResetData] = useState(INITIAL_FORGOT_FORM_DATA);
  const [helperText, setHelperText] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendmail = async () => {
    setHelperText(true);
   
    const [validateData, isValid] = await validateFormData(resetData);
    setResetData(validateData);

    if (isValid) {
      setIsBtnLoading(true);
      const payload: forgotPasswordPayload = { email: resetData.email.value };
      UserService.forgotPassword(payload)
        .then((result) => {
          showSuccessToast(result.data.message);
          setIsEmailSent(true);
          setIsBtnLoading(false);
        })
        .catch((error) => {
          showErrorToast(error);
          setIsBtnLoading(false);
        });
    }
  
  };

  const onInputHandleChange = (property: string, value: string) => {
    setResetData({
      ...resetData,
      [property]: {
        ...resetData[property as keyof typeof resetData],
        value: value,
        error: null,
      },
    });
  };

  const handleInputFocus = (property: string) => {
    setResetData({
      ...resetData,
      [property]: {
        ...resetData[property as keyof typeof resetData],
        error: null,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12} md={6} className={styles.loginSection}>
          <Box className={styles.loginBox}>
          {!isEmailSent &&<> <Typography className={styles.subtitle}>Forgot Password?</Typography>
              <StyledTextField
                fullWidth
                label="Email"
                placeholder="Enter Email"
                size="small"
                margin="dense"
                value={resetData.email.value}
                error={!!resetData.email.error}
                disabled={resetData.email.disable}
                required={resetData.email.isRequired}
                helperText={helperText && resetData.email.error}
                onFocus={() => handleInputFocus('email')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('email', event.target.value)}
              />
              <CustomButton
                variant="contained"
                type="submit"
                className={styles.button}
                fullWidth
                loading={isBtnLoading}
                onClick={handleSendmail}
              >
                Send Email
              </CustomButton>
              </>}
              {isEmailSent && <>
                <img src={messageSent} alt="Laptop" className={styles.image} />
                <Typography className={styles.text}>
           Email sent successfully. Please check your email to reset your password.
            </Typography>
              </>}
          </Box>
         
           
        </Grid>
  
        <Grid item xs={12} md={6} className={styles.imageSection}>
          <img src={forgotImage} alt="Laptop" className={styles.image} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgetPassWord;
