import React from 'react';
import {
  Modal, Box, Typography, Divider, Grid
} from '@mui/material';
import { CustomButton, StyledTextField } from '../../assets/theme/theme';
import CloseIcon from '@mui/icons-material/Close';
import { PositionFormDto } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface PositionModalProps {
  open: boolean;
  mode: string;
  onClose: () => void;
  onSave: () => void;
  positionForm: PositionFormDto;
  helperText?: boolean;
  handleInputFocus: (property: string) => void;
  onInputHandleChange: (property: string, value: string) => void;
}

const PositionModal: React.FC<PositionModalProps> = ({
  open,
  mode,
  onClose,
  onSave,
  positionForm,
  helperText,
  handleInputFocus,
  onInputHandleChange
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="position-modal-title"
      aria-describedby="position-modal-description"
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
          {mode === SCREEN_MODES.CREATE && (<h2 id="position-modal-title">Add Position</h2>)}
          {mode === SCREEN_MODES.EDIT && (<h2 id="position-modal-title">Update Position</h2>)}
          {mode === SCREEN_MODES.VIEW && (<h2 id="position-modal-title">View Position</h2>)}
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box
          sx={{
            paddingInline: 4,
            paddingBottom: 4,
          }}
        >
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>Position Details</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Position"
                value={positionForm.position.value}
                error={!!positionForm.position.error}
                disabled={positionForm.position.disable}
                required={positionForm.position.isRequired}
                helperText={helperText && positionForm.position.error}
                onFocus={() => handleInputFocus('position')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputHandleChange('position', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="right">
              <CustomButton onClick={onClose} variant="contained" sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}>
                Cancel
              </CustomButton>
              {mode === SCREEN_MODES.CREATE && (
                <CustomButton onClick={onSave} variant="contained">
                  Save
                </CustomButton>
              )}
              {mode === SCREEN_MODES.EDIT && (
                <CustomButton onClick={onSave} variant="contained">
                  Update
                </CustomButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default PositionModal;
