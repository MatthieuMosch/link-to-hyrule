import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.jsx'
import AuthContextProvider from "./context/AuthProvider.jsx";

import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </StrictMode>
)
