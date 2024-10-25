// src/components/AppBar.js

import '../styles/appbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '/img/profileicon.png'; // Import the image

const AppBar = ({ isAuthenticated, userName, onSignOut }) => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const handleUserClick = () => {
        setShowOptions(!showOptions);
    };

    return (
        <header className="app-bar">
            <div className="app-name" onClick={() => navigate('/')}>ClothingStore</div>
            <div className="search-bar-container">
                <input type="text" className="search-bar" placeholder="Search for products..."/>
            </div>
            {isAuthenticated ? (
                <div className="user-info">
                    <span onClick={handleUserClick} className="user-icon">
                        <img src={profileIcon} alt="User Icon" className="user-icon-img" /> {/* Add class here */}
                        {userName}
                    </span>
                    {showOptions && (
                        <div className="user-options">
                            <button onClick={() => navigate('/profile')}>View Profile</button>
                            <button onClick={onSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="login-button-container">
                    <button className="login-button" onClick={() => navigate('/login')}>Login / Register</button>
                </div>
            )}
        </header>
    );
};

AppBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    onSignOut: PropTypes.func.isRequired,
};

export default AppBar;
