import React from "react";
import successAnimation from "@/lotties/CheckSuccess.json"; // Ajuste o caminho conforme necessário
import { Backdrop, Box } from "@mui/material";
import Lottie from "lottie-react";

interface SuccessAnimationProps {
  visible: boolean;
  onAnimationComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ visible, onAnimationComplete }) => {
  return (
    <Backdrop
      open={visible}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        bgcolor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 3,
        }}
      >
        <Lottie
          animationData={successAnimation}
          loop={false}
          onComplete={onAnimationComplete}
          style={{ width: 200, height: 200 }}
        />
      </Box>
    </Backdrop>
  );
};

export default SuccessAnimation;