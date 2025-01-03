import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StepIconProps } from '@mui/material/StepIcon';

const CompactConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.grey[400],
    borderRadius: 1,
  },
}));

const CompactStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active
    ? theme.palette.primary.main
    : 'transparent',
  color: ownerState.active ? '#fff' : theme.palette.grey[500],
  zIndex: 1,
  width: 32,
  height: 32,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border: ownerState.active ? 'none' : `1px solid ${theme.palette.grey[400]}`,
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

function CompactStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <SendIcon fontSize="small" />,
    2: <SearchIcon fontSize="small" />,
    3: <CheckCircleIcon fontSize="small" />,
  };

  return (
    <CompactStepIconRoot ownerState={{ completed, active }}>
      {icons[String(icon)]}
    </CompactStepIconRoot>
  );
}

interface CustomizedSteppersProps {
  steps: string[];
  activeStep: number;
}

export default function CustomizedSteppers({ steps, activeStep }: CustomizedSteppersProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={1}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CompactConnector />}
        sx={{
          '& .MuiStepLabel-label': {
            fontSize: '0.8rem',
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CompactStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
