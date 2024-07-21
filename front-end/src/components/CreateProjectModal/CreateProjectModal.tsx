import React from 'react';
import {
  Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid,
  Divider,
  Typography
} from '@mui/material';
import { CustomButton } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-project-modal-title"
      aria-describedby="create-project-modal-description"
    >
    <Box  sx={{
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
          <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem"}}>
           <h2 id="create-project-modal-title"> Create Project </h2>
           <CloseIcon sx={{ cursor:"pointer"}} onClick={onClose}/>
           </Box>
           <Divider />
      <Box
        sx={{

          paddingInline: 4,
          paddingBottom: 4,
        }}
      >
         <Typography sx={{ fontWeight :"600",marginBlock:"1rem",fontSize:"14px",
         }}> General Details </Typography>
      
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Project Name"
              required
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}md={4}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue="Active"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              label="Client Contact Number"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              label="Client Contact Email"
            />
          </Grid>
          <Grid item xs={12}md={4}>
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                label="Payment Type"
                defaultValue="USD"
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="right">
            <CustomButton onClick={onClose} variant="contained"  sx={{background:"white",color:"#437EF7", marginInline:"1rem"}}>
              Cancel
            </CustomButton>
            <CustomButton onClick={onClose} variant="contained">
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
