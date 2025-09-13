import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    primary: {
      main: '#238636',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#30363d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8b949e',
    },
    divider: '#30363d',
    info: {
      main: '#58a6ff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          '&:hover': {
            borderColor: '#238636',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f6feb',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1a5cd8',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
        },
        outlined: {
          borderColor: '#30363d',
          color: '#8b949e',
          '&:hover': {
            backgroundColor: '#30363d',
            borderColor: '#30363d',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#21262d',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#30363d',
          },
        },
      },
    },
  },
});
