import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider  } from '@mui/material'
import { BrowserRouter } from "react-router-dom";


const theme = createTheme({typography:{fontFamily: "Roboto Slab, serif", allVariants: {color: "white"},},});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>
)
