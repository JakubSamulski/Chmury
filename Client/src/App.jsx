import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Game from './Game';
import Login from "./Login/Login.jsx";
import ButtonComponent from "./Table.jsx";
import LoggedIn from "./Login/LoggedIn.jsx";

const LoginWrapper = () => {

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        return <Login />;
    } else {
        return <LoggedIn />;
    }
};
const App = () => {
    return (
        <Router>
             <Routes>
                    <Route path="/" element={<LoginWrapper/>} />
                  <Route path="/login" element={<LoginWrapper/>} />
                  <Route path="/game" element={<Game />} />
                    <Route path="/results" element={<ButtonComponent />} />
            </Routes>
        </Router>
    );
};
export default App;