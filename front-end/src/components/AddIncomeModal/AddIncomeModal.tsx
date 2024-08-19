import React from 'react';
import { Modal, Box, Typography, Divider, Grid } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { IncomeFormDto } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import moment from 'moment';

interface AddIncomeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  incomeForm: IncomeFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
  mode: string;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  mode,
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
        width: '70%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
         {(mode===SCREEN_MODES.CREATE) &&<Typography id="add-income-modal-title" variant="h6">Add Income</Typography>}
         {(mode===SCREEN_MODES.EDIT) &&<Typography id="add-income-modal-title" variant="h6">Update Income</Typography>}
         {(mode===SCREEN_MODES.VIEW) &&<Typography id="add-income-modal-title" variant="h6">View Income</Typography>}

          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ padding: '16px' }}>
        <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            General Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Amount (LKR)"
                type='number'
                value={incomeForm.amount.value}
                onFocus={() => handleInputFocus('amount')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('amount', event.target.value)}
                error={!!incomeForm.amount.error}
                helperText={helperText && incomeForm.amount.error}
                required={incomeForm.amount.isRequired}
                disabled={incomeForm.amount.disable}
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
                required={incomeForm.receivedBy.isRequired}
                disabled={incomeForm.receivedBy.disable}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={ moment(incomeForm.date.value ).format('YYYY-MM-DD')  }
                onFocus={() => handleInputFocus('date')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('date', event.target.value)}
                error={!!incomeForm.date.error}
                required={incomeForm.date.isRequired}
                disabled={incomeForm.date.disable}
                helperText={helperText && incomeForm.date.error}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <StyledTextField
                fullWidth
                label="Description"
                value={incomeForm.description.value}
                onFocus={() => handleInputFocus('description')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('description', event.target.value)}
                error={!!incomeForm.description.error}
                helperText={helperText && incomeForm.description.error}
                required={incomeForm.description.isRequired}
                disabled={incomeForm.description.disable}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <CustomButton onClick={onClose} sx={{ marginRight: '8px' }}>Cancel</CustomButton>
            {mode === SCREEN_MODES.CREATE && <CustomButton onClick={onSave}>Save</CustomButton>}
            {mode === SCREEN_MODES.EDIT && <CustomButton onClick={onSave}>Update</CustomButton>}

            
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddIncomeModal;
