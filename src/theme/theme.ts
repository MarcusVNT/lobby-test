import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    background: {
      default: '#EFF6FF',
    },
    primary: {
      light: '#64748B',
      main: '#353535',
    },
    error: {
      light: '#FF7E7E',
      main: '#F75A68',
      dark: '#D12C2C',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontSize: '1.5rem',
    },
    h2: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': {
            fontFamily: `'Open Sans', sans-serif`,
          },
        },
        body: {
          backgroundAttachment: 'fixed',
          fontFamily: 'Open Sans, sans-serif',
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
          '@media (min-width:600px)': {
            padding: 0,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 20px',
          borderRadius: 60,
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: '#22007f',
            '&:hover': {
              backgroundColor: '#1e0066',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(34, 0, 127, 0.25)',
              color: '#ffffff',
              borderColor: '#D0D0D0',
            },
          },
          '&.MuiButton-outlined': {
            color: '#64748b',
            '&:hover': {
              borderColor: '#64748b',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(160, 160, 160, 0.25)',
              color: '#c5c5c5',
              borderColor: '#D0D0D0',
            },
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#64748b',
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B1B9C5',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B1B9C5',
              borderWidth: '2px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B1B9C5',
              borderWidth: '2px',
            },
          },

          '& .MuiInput-underline:after': {
            borderBottomColor: '#B1B9C5',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#B1B9C5',
          },

          '& .MuiInput-root:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#B1B9C5',
          },
          '& .MuiInput-underline.Mui-focused:after': {
            borderBottomColor: '#B1B9C5',
          },
          '& .MuiInput-underline.Mui-focused:before': {
            borderBottomColor: '#B1B9C5',
          },

          '& .MuiInputLabel-root': {
            color: '#B1B9C5',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#B1B9C5',
          },

          '& .MuiInputBase-input.Mui-disabled': {
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
          },
          '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#D0D0D0',
            },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: '#B1B9C5', // Cor do label quando desabilitado
          },
        },
      },
    },
  },
})
