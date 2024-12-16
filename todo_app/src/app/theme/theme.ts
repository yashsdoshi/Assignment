'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
    },
  },
});

export default theme;
