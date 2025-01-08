import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import successAnimation from ;
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
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {success ? (
          <Lottie animationData={successAnimation} loop={false} style={{ width: 150, height: 150 }} />
        ) : (
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            ❌ Erro!
          </Typography>
        )}
        <Typography id="alert-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {success ? "Sucesso!" : "Erro!"}
        </Typography>
        <Typography id="alert-modal-description" sx={{ mb: 4 }}>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClose}>
          {success ? (redirectPath ? "Redirecionando..." : "OK") : "Fechar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;