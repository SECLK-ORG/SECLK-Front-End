import React from 'react';
import { Modal, Box, Typography, Divider, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField } from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { PaymentFormDto, ProjectByUser } from '../../utilities/models';
import moment from 'moment';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface AddPaymentModalProps {
  mode: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  paymentForm: PaymentFormDto;
  categories: string[];
  projects: ProjectByUser[];
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: any) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  open,
  onClose,
  onSave,
  paymentForm,
  categories,
  projects,
  helperText,
  handleInputFocus,
  onInputHandleChange,
  mode,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-payment-modal-title"
      aria-describedby="add-payment-modal-description"
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
          {SCREEN_MODES.CREATE === mode && <Typography id="add-payment-modal-title" variant="h6">Add Payment</Typography>}
          {SCREEN_MODES.VIEW === mode && <Typography id="add-payment-modal-title" variant="h6">View Payment</Typography>}
          {SCREEN_MODES.EDIT === mode && <Typography id="add-payment-modal-title" variant="h6">Update Payment</Typography>}

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
                <InputLabel>Project</InputLabel>
                <Select
                  label="Project"
                  value={paymentForm.project.value || ''}
                  required={paymentForm.project.isRequired}
                  disabled={paymentForm.project.disable}
                  error={!!paymentForm.project.error}
                  onFocus={()=> handleInputFocus('project')}
                  onChange={(event) => onInputHandleChange('project', event.target.value)}
                >
                  {projects.map((project:any) => (
                    <MenuItem key={project._id} value={project} >
                      {project.projectName}
                    </MenuItem>
                  ))}
                </Select>
                {helperText && paymentForm.project.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{paymentForm.project.error}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={paymentForm.category.value}
                  required={paymentForm.category.isRequired}
                  disabled={paymentForm.category.disable}
                  error={!!paymentForm.category.error}
                  onChange={(event) => onInputHandleChange('category', event.target.value)}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category} >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {helperText && paymentForm.category.error && (
                  <FormHelperText sx={{ color: "#FF0001" }}>{paymentForm.category.error}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="number"
                label="Amount"
                value={paymentForm.amount.value}
                onFocus={() => handleInputFocus('amount')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('amount', event.target.value)}
                error={!!paymentForm.amount.error}
                required={paymentForm.amount.isRequired}
                disabled={paymentForm.amount.disable}
                helperText={helperText && paymentForm.amount.error}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                label="Description"
                value={paymentForm.description.value}
                onFocus={() => handleInputFocus('description')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('description', event.target.value)}
                error={!!paymentForm.description.error}
                required={paymentForm.description.isRequired}
                disabled={paymentForm.description.disable}
                helperText={helperText && paymentForm.description.error}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={moment(paymentForm.date.value).format('YYYY-MM-DD')}
                onFocus={() => handleInputFocus('date')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('date', event.target.value)}
                error={!!paymentForm.date.error}
                required={paymentForm.date.isRequired}
                disabled={paymentForm.date.disable}
                helperText={helperText && paymentForm.date.error}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <CustomButton onClick={onClose} sx={{ marginRight: '8px' }}>Cancel</CustomButton>
            {SCREEN_MODES.CREATE === mode && <CustomButton onClick={onSave}>Save</CustomButton>}
            {SCREEN_MODES.EDIT === mode && <CustomButton onClick={onSave}>Update</CustomButton>}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPaymentModal;
