import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#58a6ff',
        },
        background: {
            default: '#0d1117',
            paper: '#161b22',
        },
        text: {
            primary: '#e6edf3',
            secondary: '#8b949e',
        }
    },  
    shape: {
        borderRadius: 8,
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
)