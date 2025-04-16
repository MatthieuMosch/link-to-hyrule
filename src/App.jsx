import "./App.css";
import {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {AuthContext} from "./context/AuthProvider.jsx";

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <header>logo and navigation</header>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer>disclaimer</footer>
        </>
    )
}

export default App;