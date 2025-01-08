import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";
import { AlertModalProps } from "@/types/modals/AlertModalProps";

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, success, message, redirectPath }) => {
  const router = useRouter();

  const handleClose = () => {
    onClose(); 
    if (success && redirectPath) {
      router.push(redirectPath); 
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="alert-modal-title" aria-describedby="alert-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {success ? (
          <CheckIcon fontSize="large" color="success" sx={{ mb: 2 }} />
        ) : (
          <ErrorIcon fontSize="large" color="error" sx={{ mb: 2 }} />
        )}
        <Typography id="alert-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {success ? "Sucesso!" : "Erro!"}
        </Typography>
        <Typography id="alert-modal-description" sx={{ mb: 4 }}>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClose}>
          {success && redirectPath ? "Continuar" : "Fechar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;
