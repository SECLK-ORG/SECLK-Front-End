import React from 'react';
import { Modal, Box, Typography, Divider, Grid, TextField, MenuItem, IconButton, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AddToProjectFormDto, ProjectList } from '../../utilities/models';
import { CustomButton } from '../../assets/theme/theme';

interface AddToProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  projectList: ProjectList[];
  addToProjectForm:AddToProjectFormDto
  handleInputChange: (field: string, value: any) => void;
  handleInputFocus: (property: string) => void;
  helperText?: boolean;
  isLoading?: boolean;
}

const AddToProjectModal: React.FC<AddToProjectModalProps> = ({
    helperText,
    isLoading,
  open,
  onClose,
  onSave,
  projectList,
  addToProjectForm,
  handleInputChange,
  handleInputFocus
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-to-project-modal-title"
      aria-describedby="add-to-project-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: 2,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="add-to-project-modal-title" variant="h6">
            Add To Project
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Project"
              value={addToProjectForm.project.value||''}
              onFocus={()=> handleInputFocus('project')}
              onChange={(e) => handleInputChange('project', e.target.value)}
              required={addToProjectForm.project.isRequired}
              disabled={addToProjectForm.project.disable}
              error={!!addToProjectForm.project.error}
              helperText={helperText && addToProjectForm.project.error}
            >
              {projectList.map((project:any) => (
                <MenuItem key={project._id} value={project}>
                  {project.projectName}
                </MenuItem>
              ))}
            </TextField>
            {helperText && addToProjectForm.project.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{addToProjectForm.project.error}</FormHelperText>
                )}
          </Grid>       
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={addToProjectForm.projectStartedDate.value}
              onFocus={()=> handleInputFocus('projectStartedDate')}
              onChange={(e) => handleInputChange('projectStartedDate', e.target.value)}
              required={addToProjectForm.projectStartedDate.isRequired}
              disabled={addToProjectForm.projectStartedDate.disable}
              error={!!addToProjectForm.projectStartedDate.error}
              helperText={helperText && addToProjectForm.projectStartedDate.error}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <CustomButton onClick={onClose} loading={isLoading} sx={{ marginRight: 1 }}>Cancel</CustomButton>
          <CustomButton variant="contained"  loading={isLoading}onClick={onSave}>Save</CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddToProjectModal;
