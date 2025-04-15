import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";

function App() {
    return (
        <>
            <header>logo and navigation</header>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer>disclaimer</footer>
        </>
    )
}

export default App
