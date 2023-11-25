import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Components/Theme/Theme.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
