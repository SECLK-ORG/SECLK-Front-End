import React from 'react';
import {
  Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid,
  Divider,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from '../../assets/theme/theme';

interface CreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ open, onClose }) => {
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
          width: '80%',
          bgcolor: 'background.paper',
          border: '1px solid #e0e0e0',
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <Typography id="create-employee-modal-title" variant="h6" component="h2">
            Create Employee
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box
          sx={{
            paddingInline: 4,
            paddingBottom: 4,
          }}
        >
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            General Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Employee Name"
                required
                defaultValue="Chaminda Silva"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                defaultValue="2024-12-05"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Position"
                required
                defaultValue="Software Engineer"
              />
            </Grid>
            <Grid item xs={6} md={3}>
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
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Hourly Rate"
                required
                defaultValue="50$"
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBlock: "1rem" }} />
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            Contact Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                required
                defaultValue="chaminda.silva@seclk.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                required
                defaultValue="+94 77 1234567"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work Location"
                required
                defaultValue="Colombo"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              <CustomButton onClick={onClose} variant="contained" color="primary">
                Save
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateEmployeeModal;
