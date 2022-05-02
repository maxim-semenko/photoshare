import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {unstable_createMuiStrictModeTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/styles";

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = unstable_createMuiStrictModeTheme();

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

