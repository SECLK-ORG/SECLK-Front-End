import React from 'react';
import { Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { ExpenseFormDto } from '../../utilities/models';

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  expenseForm: ExpenseFormDto;
  categories: string[];
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  open,
  onClose,
  onSave,
  expenseForm,
  categories,
  helperText,
  handleInputFocus,
  onInputHandleChange,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-expense-modal-title"
      aria-describedby="add-expense-modal-description"
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
          <Typography id="add-expense-modal-title" variant="h6">Add Expense</Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={expenseForm.category.value}
                  onChange={(event) => onInputHandleChange('category', event.target.value)}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Vendor"
                value={expenseForm.vendor.value}
                onFocus={() => handleInputFocus('vendor')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('vendor', event.target.value)}
                error={!!expenseForm.vendor.error}
                helperText={helperText && expenseForm.vendor.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Amount"
                value={expenseForm.amount.value}
                onFocus={() => handleInputFocus('amount')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('amount', event.target.value)}
                error={!!expenseForm.amount.error}
                helperText={helperText && expenseForm.amount.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Description"
                value={expenseForm.description.value}
                onFocus={() => handleInputFocus('description')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('description', event.target.value)}
                error={!!expenseForm.description.error}
                helperText={helperText && expenseForm.description.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Invoice Number"
                value={expenseForm.invoiceNumber.value}
                onFocus={() => handleInputFocus('invoiceNumber')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('invoiceNumber', event.target.value)}
                error={!!expenseForm.invoiceNumber.error}
                helperText={helperText && expenseForm.invoiceNumber.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={expenseForm.date.value}
                onFocus={() => handleInputFocus('date')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('date', event.target.value)}
                error={!!expenseForm.date.error}
                helperText={helperText && expenseForm.date.error}
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

export default AddExpenseModal;
