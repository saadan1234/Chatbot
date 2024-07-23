import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider  } from '@mui/material';
import { BrowserRouter } from "react-router-dom";


const theme = createTheme({typography:{fontFamily: "Roboto Slab, serif", allVariants: {color: "white"},},});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
      
        <App />
      
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);