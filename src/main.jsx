import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Components/Theme/Theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={Routes} />
    </ThemeProvider>
  </React.StrictMode>,
)
