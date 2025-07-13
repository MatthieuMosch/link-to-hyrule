import "./App.css";
import {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthProvider.jsx";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/authenticate/register/Register.jsx";
import Login from "./pages/authenticate/login/Login.jsx";
import Profile from "./pages/authenticate/profile/Profile.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Overview from "./pages/overview/Overview.jsx";
import Detail from "./pages/detail/Detail.jsx";
import Quiz from "./pages/quiz/Quiz.jsx";

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
                <Route path="/overview/:category" element={isAuth ? <Overview/> : <Navigate to="/login"/>}/>
                <Route path="/detail/:category/:id" element={isAuth ? <Detail/> : <Navigate to="/login"/>}/>
                <Route path="/quiz/:category" element={isAuth ? <Quiz/> : <Navigate to="/login"/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default App;
