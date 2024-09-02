import React from 'react';
import { Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, TextField } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { ExpenseFormDto, userList } from '../../utilities/models';
import moment from 'moment';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface AddExpenseModalProps {
  mode: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  expenseForm: ExpenseFormDto;
  categories: string[];
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: any) => void;
  employeeList: userList[];
  isExpensesLoading?: boolean;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isExpensesLoading,
  open,
  onClose,
  onSave,
  expenseForm,
  categories,
  helperText,
  handleInputFocus,
  onInputHandleChange,
  employeeList,
  mode,
}) => {
  const isOtherCategory = expenseForm?.category?.value === 'Other';

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
          {SCREEN_MODES.CREATE===mode &&   <Typography id="add-expense-modal-title" variant="h6">Add Expense</Typography>}
          {SCREEN_MODES.VIEW===mode &&   <Typography id="add-expense-modal-title" variant="h6">View Expense</Typography>}
          {SCREEN_MODES.EDIT===mode &&   <Typography id="add-expense-modal-title" variant="h6">Update Expense</Typography>}

          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        
        <Box sx={{ padding: '16px' }}>
        <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            General Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={expenseForm.category.value}
                  required={expenseForm.category.isRequired}
                  disabled={expenseForm.category.disable}
                  error={!!expenseForm.category.error}
                  onChange={(event) => onInputHandleChange('category', event.target.value)}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category} >
                      {category}
                    </MenuItem>
                  ))}
               </Select>
               {helperText && expenseForm.category.error && (
                 <FormHelperText sx={{ color: "#FF0001" }}>{expenseForm.category.error}</FormHelperText>
               )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              {isOtherCategory ? (
                <StyledTextField
                  fullWidth
                  label="Vendor"
                  value={expenseForm.vendor.value}
                  onFocus={() => handleInputFocus('vendor')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('vendor', event.target.value)}
                  error={!!expenseForm.vendor.error}
                  required={expenseForm.vendor.isRequired}
                  disabled={expenseForm.vendor.disable}
                  helperText={helperText && expenseForm.vendor.error}
                />
              ) : (
                <Autocomplete
                fullWidth
                options={employeeList}
                getOptionLabel={(option) => option.name || ''}
                value={
                  employeeList.find((employee) => employee._id === expenseForm.employeeID?.value?._id) || null
                }
                onChange={(event, newValue) => {
                  onInputHandleChange('employeeID', newValue || {}); // Pass the entire object to store in employeeID
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vendor"
                    variant="outlined"
                    error={!!expenseForm.employeeID.error}
                    helperText={helperText && expenseForm.employeeID.error}
                    onFocus={() => handleInputFocus('employeeID')}
                  />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />

              )}
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type='number'
                label="Amount"
                value={expenseForm.amount.value}
                onFocus={() => handleInputFocus('amount')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('amount', event.target.value)}
                error={!!expenseForm.amount.error}
                required={expenseForm.amount.isRequired}
                disabled={expenseForm.amount.disable}
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
                required={expenseForm.description.isRequired}
                disabled={expenseForm.description.disable}
                helperText={helperText && expenseForm.description.error}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={moment(expenseForm.date.value).format('YYYY-MM-DD')}
                onFocus={() => handleInputFocus('date')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('date', event.target.value)}
                error={!!expenseForm.date.error}
                required={expenseForm.date.isRequired}
                disabled={expenseForm.date.disable}
                helperText={helperText && expenseForm.date.error}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <CustomButton onClick={onClose} sx={{ marginRight: '8px' }}>Cancel</CustomButton>
            {SCREEN_MODES.CREATE === mode && <CustomButton onClick={onSave} loading={isExpensesLoading}>Save</CustomButton>}
            {SCREEN_MODES.EDIT === mode && <CustomButton onClick={onSave} loading={isExpensesLoading}>Update</CustomButton>}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddExpenseModal;
