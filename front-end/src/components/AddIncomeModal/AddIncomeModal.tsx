import React from 'react';
import { Modal, Box, Typography, Divider, Grid } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { IncomeFormDto } from '../../utilities/models';

interface AddIncomeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  incomeForm: IncomeFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  open,
  onClose,
  onSave,
  incomeForm,
  helperText,
  handleInputFocus,
  onInputHandleChange,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-income-modal-title"
      aria-describedby="add-income-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <Typography id="add-income-modal-title" variant="h6">Add Income</Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Amount"
                value={incomeForm.amount.value}
                onFocus={() => handleInputFocus('amount')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('amount', event.target.value)}
                error={!!incomeForm.amount.error}
                helperText={helperText && incomeForm.amount.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Invoice Number"
                value={incomeForm.invoiceNumber.value}
                onFocus={() => handleInputFocus('invoiceNumber')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('invoiceNumber', event.target.value)}
                error={!!incomeForm.invoiceNumber.error}
                helperText={helperText && incomeForm.invoiceNumber.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Received By"
                value={incomeForm.receivedBy.value}
                onFocus={() => handleInputFocus('receivedBy')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('receivedBy', event.target.value)}
                error={!!incomeForm.receivedBy.error}
                helperText={helperText && incomeForm.receivedBy.error}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={incomeForm.date.value}
                onFocus={() => handleInputFocus('date')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('date', event.target.value)}
                error={!!incomeForm.date.error}
                helperText={helperText && incomeForm.date.error}
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

export default AddIncomeModal;
