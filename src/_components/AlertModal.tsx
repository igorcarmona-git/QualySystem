import React from "react";
import { Modal, Backdrop } from "@mui/material";
import { useRouter } from "next/navigation";
import { AlertModalProps } from "@/types/modals/AlertModalProps";
import SuccessAnimation from "./animations/statusAnimation";

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, success, message, redirectPath }) => {
  const router = useRouter();

  /**
   * Called when the animation completes and redirects to the specified path if there is one
   * @returns void
   * @onClose Function to close the modal
   */
  const handleAnimationComplete = () => {
    if (success && redirectPath) {
      router.push(redirectPath);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}  //Here we don't want to close the modal
      disableEscapeKeyDown  //Here we don't want to close the modal by key press ESC
    >
      <Backdrop
        open={open}
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
          pointerEvents: "none", // Bloqueia interação com o modal
        }}
      >
        <SuccessAnimation
          optionsProps={{
            loop: false,
            autoplay: true,
            onAnimationComplete: handleAnimationComplete,
            message: message,
            status: success,
          }}
        />
      </Backdrop>
    </Modal>
  );
};

export default AlertModal;
