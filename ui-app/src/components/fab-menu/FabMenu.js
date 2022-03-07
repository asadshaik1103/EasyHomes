import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { ThemeProvider } from '@mui/material/styles';

import { customTheme } from '../../utils/theme';
const actions = [
  { icon: <HomeWorkIcon />, name: 'Add a property' },
  { icon: <MiscellaneousServicesIcon />, name: 'Add a service' },
];

export default function FabMenu() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const fabMenuTheme = customTheme;

  const getSpeedDialBoxStyles = () => {
    return {
      position: 'absolute',
      right: '25px',
      bottom: '25px',
      transform: 'translateZ(0px)',
      flexGrow: 1
    }
  }

  return (
    <ThemeProvider theme={fabMenuTheme}>
      <Box sx={getSpeedDialBoxStyles()}>
        <SpeedDial
          ariaLabel="Add"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
              sx={{
                '& .MuiSpeedDialAction-staticTooltipLabel': {
                  width: '140px'
                }
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
}