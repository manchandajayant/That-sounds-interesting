import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./Components/Home/Homepage";
import Navbar from "./Components/Navbar/Navbar";
// import Login from './Components/Login';
// import AddAPlace from './Components/AddAndUpload/AddAPlace';
import About from "./Components/About/About";

import "./App.css";

function App() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = (): void => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    });

    useEffect(() => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        }
    }, []);

    if (isMobile) {
        return (
            <div className="App">
                <div style={AppStyle}>This only works on the web right now</div>
            </div>
        );
    } else {
        return (
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        );
    }
}

const AppStyle = { marginTop: "50%" };

export default App;
