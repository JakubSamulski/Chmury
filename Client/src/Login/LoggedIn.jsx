import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoggedIn.css';

const LoggedIn = () => {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate('/game');
    };

    const handleResults = () => {
        navigate('/results');
    };

    return (
        <div className="loggedin-container">
            <h1>Welcome!</h1>
            <button className="btn" onClick={handlePlay}>Play</button>
            <button className="btn" onClick={handleResults}>Results</button>
        </div>
    );
};

export default LoggedIn;