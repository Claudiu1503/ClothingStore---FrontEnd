import '../styles/appbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '/img/profileicon.png';
import { useAuth } from '../contexts/AuthContext.jsx';
import Sidebar from "./Sidebar.jsx";

const AppBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const profileImage = localStorage.getItem('profileImage');

    return (
        <header className="app-bar">
            <button className="button-sidebar" onClick={() => setShowSideBar(!showSideBar)}>|||</button>
            <div className="app-name-container">
                <div className="app-name" onClick={() => navigate('/')}>ClothingStore</div>
            </div>
            {user ? (
                <div className="user-info">
                    <span onMouseEnter={() => setShowOptions(true)}
                          onMouseLeave={() => setShowOptions(false)} className="user-icon">
                        <img
                            src={profileImage || profileIcon} // Use user's profile image or fallback to default
                            alt="User Icon"
                            className="user-icon-img"
                        />
                        {user.username}
                    </span>
                    {showOptions && (
                        <div className="user-options" onMouseEnter={() => setShowOptions(true)}
                             onMouseLeave={() => setShowOptions(false)}>
                            <button onClick={() => navigate('/profile')}>View Profile</button>
                            <button onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="login-button-container">
                    <button className="login-button" onClick={() => navigate('/login')}>Login / Register</button>
                </div>
            )}

            {showSideBar && (
                <div className="dropdown-sidebar">
                    <Sidebar/>
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
