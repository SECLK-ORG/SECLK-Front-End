import React from 'react';
import { Modal, Box, Typography, Divider, Grid, Autocomplete, TextField } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { EmployeeFormDto, userList } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface AddEmployeeModalProps {
  mode: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  employeeForm: EmployeeFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: any) => void;
  employeeList: userList[];
  isEmployeeLoading?: boolean;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isEmployeeLoading,
  mode,
  open,
  onClose,
  onSave,
  employeeForm,

  helperText,
  handleInputFocus,
  onInputHandleChange,
  employeeList,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-employee-modal-title"
      aria-describedby="add-employee-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
       {SCREEN_MODES.VIEW===mode &&   <Typography id="add-employee-modal-title" variant="h6">View Employee</Typography>}
       {SCREEN_MODES.CREATE===mode &&   <Typography id="add-employee-modal-title" variant="h6">Add Employee</Typography>}

          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
        <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            General Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
               <Autocomplete
                fullWidth
                options={employeeList}
                getOptionLabel={(option) => option.name || ''}
                disabled={employeeForm.employeeID.disable}
                value={
                  employeeList.find((employee) => employee._id === employeeForm.employeeID?.value?._id) || null
                }
                onChange={(event, newValue) => {
                  onInputHandleChange('employeeID', newValue || {}); 
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee Name"
                    variant="outlined"
                    error={!!employeeForm.employeeID.error}
                    helperText={helperText && employeeForm.employeeID.error}
                    onFocus={() => handleInputFocus('employeeID')}
                  />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />

            
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Email"
                value={employeeForm.email.value}
                disabled={employeeForm.email.disable}
                required={employeeForm.email.isRequired}
                onFocus={() => handleInputFocus('email')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('email', event.target.value)}
                error={!!employeeForm.email.error}
                helperText={helperText && employeeForm.email.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <StyledTextField
                fullWidth
                label="Position"
                value={employeeForm.position.value}
                disabled={employeeForm.position.disable}
                required={employeeForm.position.isRequired}
                onFocus={() => handleInputFocus('position')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('position', event.target.value)}
                error={!!employeeForm.position.error}
                helperText={helperText && employeeForm.position.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Project Started Date"
                InputLabelProps={{ shrink: true }}
                value={employeeForm.projectStartedDate.value}
                disabled={employeeForm.projectStartedDate.disable}
                required={employeeForm.projectStartedDate.isRequired}
                onFocus={() => handleInputFocus('projectStartedDate')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('projectStartedDate', event.target.value)}
                error={!!employeeForm.projectStartedDate.error}
                helperText={helperText && employeeForm.projectStartedDate.error}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <CustomButton onClick={onClose} sx={{ marginRight: '8px' }}>Cancel</CustomButton>
            {SCREEN_MODES.CREATE === mode && <CustomButton onClick={onSave} loading={isEmployeeLoading}>Save</CustomButton>}
            {/* {SCREEN_MODES.EDIT === mode && <CustomButton onClick={onSave}>Update</CustomButton>} */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
