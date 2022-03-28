import * as React from 'react';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { ThemeProvider } from '@mui/material/styles';

import SimpleDialog from '../property/PropertyForm';
import { customTheme } from '../../utils/theme';
const actions = [
  { icon: <HomeWorkIcon />, name: 'Add a property', id: 'add-property'},
  { icon: <MiscellaneousServicesIcon />, name: 'Add a service', id: 'add-service' },
];

export default function FabMenu() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {

    setOpen(false);

  }

  const handleOperation = (id) => {
    setDialogOpened(true);
  }

  const [dialogOpened, setDialogOpened] = React.useState(false);
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  // const [propertyType, setPropertyType] = React.useState('')
  //const [values, setValues] = React.useState(initialValues);

  // const handleClickOpen = () => {
  //   setDialogOpened(true);
  // };
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
      <SimpleDialog
        open={dialogOpened}
        onClose={handleClose}
        title="Add Property"
        setDialogOpenState={setDialogOpened}
      />
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
              onClick={() => {
                handleOperation(action.id);
              }}
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