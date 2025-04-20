// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.jsx'
import AuthContextProvider from "./context/AuthProvider.jsx";

import './index.css'

createRoot(document.getElementById('root')).render(
    // commented StrictMode because it causes request cancels with AbortControlleer on the Overview page
    // <StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    // </StrictMode>
)
