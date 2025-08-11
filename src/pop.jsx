import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const LandingPopup = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleResponse = (response) => {
    handleClose();
    if (response === "yes") {
      navigate("/Booking");
    } else {
      navigate("/BookingsExternal");
    }
  };

  // Custom styles for the TEDx button
  const tedxButtonStyle = {
    backgroundColor: '#EB0028',
    borderRadius: '12px',
    padding: '8px 24px',
    fontWeight: 'bold',
    color: '#ffffff',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#c30020',
      transform: 'translateY(-3px)',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(25, 25, 25, 0.65)', 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          borderRadius: "20px",
          textAlign: "center",
          padding: "20px",
          color: '#ffffff',
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", color: 'inherit', pt: 1 }}>
        Have you ever been a part of HITAM (Student/Staff)?
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" variant="body1" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
          Select an option below to continue.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          onClick={() => handleResponse("yes")}
          sx={tedxButtonStyle}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => handleResponse("no")}
          sx={tedxButtonStyle}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LandingPopup;