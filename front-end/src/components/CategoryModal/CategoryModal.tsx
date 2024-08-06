import React, { useState } from 'react';
import {
  Modal, Box, Button, Typography, Divider, Grid
} from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, onSave }) => {
  const [category, setCategory] = useState<string>('');

  const handleSave = () => {
    onSave(category);
    setCategory(''); // Clear the input field
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="category-modal-title"
      aria-describedby="category-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <h2 id="category-modal-title"> Add Category </h2>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box
          sx={{
            paddingInline: 4,
            paddingBottom: 4,
          }}
        >
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>Category Details</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="right">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              <CustomButton onClick={handleSave} variant="contained">
                Save
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
