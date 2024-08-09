import React from 'react';
import { Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { EmployeeFormDto } from '../../utilities/models';

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  employeeForm: EmployeeFormDto;
  positions: string[];
  employees: string[];
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  open,
  onClose,
  onSave,
  employeeForm,
  positions,
  employees,
  helperText,
  handleInputFocus,
  onInputHandleChange,
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
        width: '50%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <Typography id="add-employee-modal-title" variant="h6">Add Employee</Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Employee Name</InputLabel>
                <Select
                  label="Employee Name"
                  value={employeeForm.employeeName.value}
                  onChange={(event) => onInputHandleChange('employeeName', event.target.value)}
                >
                  {employees.map((employee, index) => (
                    <MenuItem key={index} value={employee}>
                      {employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Email"
                value={employeeForm.email.value}
                onFocus={() => handleInputFocus('email')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('email', event.target.value)}
                error={!!employeeForm.email.error}
                helperText={helperText && employeeForm.email.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  label="Position"
                  value={employeeForm.position.value}
                  onChange={(event) => onInputHandleChange('position', event.target.value)}
                >
                  {positions.map((position, index) => (
                    <MenuItem key={index} value={position}>
                      {position}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Project Started Date"
                InputLabelProps={{ shrink: true }}
                value={employeeForm.projectStartedDate.value}
                onFocus={() => handleInputFocus('projectStartedDate')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('projectStartedDate', event.target.value)}
                error={!!employeeForm.projectStartedDate.error}
                helperText={helperText && employeeForm.projectStartedDate.error}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <CustomButton onClick={onClose} sx={{ marginRight: '8px' }}>Cancel</CustomButton>
            <CustomButton onClick={onSave}>Save</CustomButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
