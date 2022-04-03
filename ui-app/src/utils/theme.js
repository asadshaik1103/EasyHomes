import { createTheme } from '@mui/material/styles';

import { CUSTOM_THEME_HEX, CUSTOM_THEME_HEX_SECONDARY } from '../constants/constants';
export const customTheme = createTheme({
  palette: {
    primary: {
      main: CUSTOM_THEME_HEX,
    },
    secondary: {
      main: CUSTOM_THEME_HEX_SECONDARY,
    },
  },
});
