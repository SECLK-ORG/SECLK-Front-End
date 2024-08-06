import React, { useState } from 'react';
import {
  Modal, Box, Button, Typography, Divider, Grid
} from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryFormDto } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface CategoryModalProps {
  open: boolean;
  mode: string;
  onClose: () => void;
  onSave: () => void;
  categoryForm: CategoryFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ mode,open, onClose, onSave,categoryForm,helperText,handleInputFocus,onInputHandleChange }) => {


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
        {mode === SCREEN_MODES.CREATE && ( <h2 id="category-modal-title"> Add Category </h2>)}
        {mode === SCREEN_MODES.EDIT && ( <h2 id="category-modal-title"> Update Category </h2>)}
        {mode === SCREEN_MODES.VIEW && ( <h2 id="category-modal-title"> View Category </h2>)}
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
                value={categoryForm.category.value}
                error={!!categoryForm.category.error}
                disabled={categoryForm.category.disable}
                required={categoryForm.category.isRequired}
                helperText={helperText && categoryForm.category.error}
                onFocus={() => handleInputFocus('category')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>onInputHandleChange('category', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="right">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              {mode === SCREEN_MODES.CREATE && (
             <CustomButton onClick={onSave} variant="contained">
                Save
              </CustomButton>)}
              {mode === SCREEN_MODES.EDIT && (
             <CustomButton onClick={onSave} variant="contained">
                Update
              </CustomButton>)}
              
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
