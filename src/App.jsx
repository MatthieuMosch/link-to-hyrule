import "./App.css";
import {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {AuthContext} from "./context/AuthProvider.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Overview from "./pages/overview/Overview.jsx";
import Detail from "./pages/detail/Detail.jsx";

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
                    <Route path="/overview" element={isAuth ? <Overview/> : <Navigate to="/login"/>}/>
                    <Route path="/detail" element={isAuth ? <Detail/> : <Navigate to="/login"/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App;