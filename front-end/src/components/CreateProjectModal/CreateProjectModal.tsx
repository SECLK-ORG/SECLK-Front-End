import React from 'react';
import {
  Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { ProjectFormDto } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface CreateProjectModalProps {
  open: boolean;
  mode: string;
  onClose: () => void;
  onSave: () => void;
  projectForm: ProjectFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  mode,
  onClose,
  onSave,
  projectForm,
  helperText,
  handleInputFocus,
  onInputHandleChange
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-project-modal-title"
      aria-describedby="create-project-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          {mode === SCREEN_MODES.CREATE && (<h2 id="create-project-modal-title">Create Project</h2>)}
          {mode === SCREEN_MODES.EDIT && (<h2 id="create-project-modal-title">Update Project</h2>)}
          {mode === SCREEN_MODES.VIEW && (<h2 id="create-project-modal-title">View Project</h2>)}
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box
          sx={{
            paddingInline: 4,
            paddingBottom: 4,
          }}
        >
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>General Details</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledTextField
                fullWidth
                label="Project Name"
                value={projectForm.projectName.value}
                error={!!projectForm.projectName.error}
                disabled={projectForm.projectName.disable}
                required={projectForm.projectName.isRequired}
                helperText={helperText && projectForm.projectName.error}
                onFocus={() => handleInputFocus('projectName')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('projectName', event.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <StyledTextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={projectForm.startDate.value}
                error={!!projectForm.startDate.error}
                disabled={projectForm.startDate.disable}
                required={projectForm.startDate.isRequired}
                helperText={helperText && projectForm.startDate.error}
                onFocus={() => handleInputFocus('startDate')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('startDate', event.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <StyledTextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={projectForm.endDate.value}
                error={!!projectForm.endDate.error}
                disabled={projectForm.endDate.disable}
                required={projectForm.endDate.isRequired}
                helperText={helperText && projectForm.endDate.error}
                onFocus={() => handleInputFocus('endDate')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('endDate', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={projectForm.status.value}
                  onChange={(event) => onInputHandleChange('status', event.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={projectForm.category.value}
                  onChange={(event) => onInputHandleChange('category', event.target.value)}
                >
                  <MenuItem value="uk">UK</MenuItem>
                  <MenuItem value="local">Local</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <StyledTextField
                fullWidth
                label="Client Contact Number"
                value={projectForm.clientContactNumber.value}
                error={!!projectForm.clientContactNumber.error}
                disabled={projectForm.clientContactNumber.disable}
                required={projectForm.clientContactNumber.isRequired}
                helperText={helperText && projectForm.clientContactNumber.error}
                onFocus={() => handleInputFocus('clientContactNumber')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('clientContactNumber', event.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <StyledTextField
                fullWidth
                label="Client Contact Email"
                value={projectForm.clientEmail.value}
                error={!!projectForm.clientEmail.error}
                disabled={projectForm.clientEmail.disable}
                required={projectForm.clientEmail.isRequired}
                helperText={helperText && projectForm.clientEmail.error}
                onFocus={() => handleInputFocus('clientEmail')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('clientEmail', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Payment Type</InputLabel>
                <Select
                  label="Payment Type"
                  value={projectForm.paymentType.value}
                  onChange={(event) => onInputHandleChange('paymentType', event.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="right">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              {mode === SCREEN_MODES.CREATE && (
                <CustomButton onClick={onSave} variant="contained">
                  Save
                </CustomButton>
              )}
              {mode === SCREEN_MODES.EDIT && (
                <CustomButton onClick={onSave} variant="contained">
                  Update
                </CustomButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
