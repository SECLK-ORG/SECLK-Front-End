import React from 'react';
import {
  Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import { createEmployeeFormDto, Positions } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import moment from 'moment';

interface CreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  employeeForm: createEmployeeFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
  mode: string;
  positions: Positions[]; // Update to array of Positions
  isLoading?: boolean;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  isLoading,
  mode,
  open,
  onClose,
  onSave,
  employeeForm,
  helperText,
  handleInputFocus,
  onInputHandleChange,
  positions // Pass the positions array as a prop
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-employee-modal-title"
      aria-describedby="create-employee-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          borderRadius: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          border: '1px solid #e0e0e0',
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          {mode === SCREEN_MODES.CREATE && <Typography id="create-employee-modal-title" variant="h6">Create Employee</Typography>}
          {mode === SCREEN_MODES.EDIT && <Typography id="create-employee-modal-title" variant="h6">Update Employee</Typography>}
          {mode === SCREEN_MODES.VIEW && <Typography id="create-employee-modal-title" variant="h6">View Employee</Typography>}
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            General Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Employee Name"
                value={employeeForm.name.value}
                onFocus={() => handleInputFocus('name')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('name', event.target.value)}
                error={!!employeeForm.name.error}
                helperText={helperText && employeeForm.name.error}
                required={employeeForm.name.isRequired}
                disabled={employeeForm.name.disable}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={moment(employeeForm.startDate.value).format('YYYY-MM-DD')}
                onFocus={() => handleInputFocus('startDate')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('startDate', event.target.value)}
                error={!!employeeForm.startDate.error}
                helperText={helperText && employeeForm.startDate.error}
                required={employeeForm.startDate.isRequired}
                disabled={employeeForm.startDate.disable}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  label="Position"
                  value={employeeForm.position.value}
                  onFocus={() => handleInputFocus('position')}
                  onChange={(event: any) => onInputHandleChange('position', event.target.value as string)}
                  disabled={employeeForm.position.disable}
                >
                  {positions.map((pos) => (
                    <MenuItem key={pos._id} value={pos.positions}>
                      {pos.positions}
                    </MenuItem>
                  ))}
                </Select>
                {helperText && employeeForm.position.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{employeeForm.position.error}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                fullWidth
                label="Work Location"
                value={employeeForm.workLocation.value}
                onFocus={() => handleInputFocus('workLocation')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('workLocation', event.target.value)}
                error={!!employeeForm.workLocation.error}
                helperText={helperText && employeeForm.workLocation.error}
                required={employeeForm.workLocation.isRequired}
                disabled={employeeForm.workLocation.disable}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  value={employeeForm.role.value}
                  onFocus={() => handleInputFocus('role')}
                  onChange={(event: any) => onInputHandleChange('role', event.target.value as string)}
                  disabled={employeeForm.role.disable}
                  defaultValue="User" // Set default value as "User"
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
                {helperText && employeeForm.role.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{employeeForm.role.error}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={employeeForm.status.value}
                  onFocus={() => handleInputFocus('status')}
                  onChange={(event: any) => onInputHandleChange('status', event.target.value as string)}
                  disabled={employeeForm.status.disable}
                  defaultValue="Active" // Set default value as "Active"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                {helperText && employeeForm.status.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{employeeForm.status.error}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ marginBlock: "1rem" }} />
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            Contact Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Contact Email"
                value={employeeForm.email.value}
                onFocus={() => handleInputFocus('email')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('email', event.target.value)}
                error={!!employeeForm.email.error}
                helperText={helperText && employeeForm.email.error}
                required={employeeForm.email.isRequired}
                disabled={employeeForm.email.disable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Contact Number"
                value={employeeForm.contactNumber.value}
                onFocus={() => handleInputFocus('contactNumber')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('contactNumber', event.target.value)}
                error={!!employeeForm.contactNumber.error}
                helperText={helperText && employeeForm.contactNumber.error}
                required={employeeForm.contactNumber.isRequired}
                disabled={employeeForm.contactNumber.disable}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              {mode === SCREEN_MODES.CREATE && <CustomButton onClick={onSave} loading={isLoading} variant="contained" color="primary">Save</CustomButton>}
              {mode === SCREEN_MODES.EDIT && <CustomButton onClick={onSave} loading={isLoading} variant="contained" color="primary">Update</CustomButton>}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateEmployeeModal;
