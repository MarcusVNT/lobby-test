import { createTheme } from '@mui/material/styles'
import { babelIncludeRegexes } from 'next/dist/build/webpack-config'

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
          borderRadius: 60,
          textTransform: 'none',
          backgroundColor: '#22007f',
          '&:hover': {
            backgroundColor: '#1e0066',
          },
        },
      },
    },

    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiOutlinedInput-root': {
              background: 'transparent',
              borderRadius: 16,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#a7cad1',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3fa6bb',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: '#a7cad1',
              },

            '& .MuiOutlinedInput-root.Mui-focused ': {
              color: '#a7cad1',
            },
            '& .MuiInputBase-input': {
              color: '#a7cad1',
            },
            '& .MuiInputLabel-root': {
              color: '#a7cad1',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#a7cad1',
            },
          },
        },
      ],
    },
  },
})
