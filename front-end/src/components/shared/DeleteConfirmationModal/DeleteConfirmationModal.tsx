import React from 'react';
import {
  Modal, Box, Typography, Divider, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from '../../../assets/theme/theme';

interface DeleteConfirmationModalProps {
  open: boolean;
  text: string;
  onClose: () => void;
  handleDeleteAction: (confirm: boolean,property:string) => void;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ text,open, onClose, handleDeleteAction ,isLoading}) => {



  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-modal-title"
      aria-describedby="delete-confirmation-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        borderRadius: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
        p: 1,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <Typography id="delete-confirmation-modal-title" variant="h6"> Delete {text} </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ paddingInline: 4, paddingBottom: 4, paddingTop: 2 }}>
          <Typography sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}>
            Are you sure you want to delete this {text}?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomButton
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ backgroundColor: "#f0f0f0", color: "#437EF7" }}
                loading={isLoading?isLoading:false}
                onClick={() => handleDeleteAction(true,text)}
              >
                Yes
              </CustomButton>
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                fullWidth
                variant="contained"
                onClick={() => handleDeleteAction(false,text)}
              >
                No
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
