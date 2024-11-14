import '../styles/appbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '/img/profileicon.png';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext'; // Import CartContext
import Sidebar from "./Sidebar.jsx";

const AppBar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart(); // Access cart items from context
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [authMessage, setAuthMessage] = useState(''); // State for auth message
    const user_id = localStorage.getItem("id") || null;
    const user_role = localStorage.getItem("role");
    const profileImage = localStorage.getItem('profileImage');

    const handleCheckout = () => {
        if (user_id) {
            navigate('/checkout');
            setShowCartDropdown(false);
        } else {
            setAuthMessage('You must be authenticated before placing an order!');
        }
    };

    return (
        <header className="app-bar">
            <button className="button-sidebar" onClick={() => setShowSideBar(!showSideBar)}>|||</button>
            <div className="app-name-container">
                <div className="app-name" onClick={() => navigate('/')}>ClothingStore</div>
            </div>

            {/* Cart Button */}
            <div className="cart-container">
                <button className="cart-button" onClick={() => setShowCartDropdown(!showCartDropdown)}>
                    🛒 Cart ({cartItems.length})
                </button>
                {showCartDropdown && (
                    <div className="cart-dropdown">
                        {cartItems.length > 0 ? (
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Cart is empty</p>
                        )}
                        {authMessage && <p className="auth-message">{authMessage}</p>}
                        <button className="checkout-button" onClick={handleCheckout}>
                            Go to Checkout
                        </button>
                    </div>
                )}
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
                            {/* Show only if user_role is "ADMIN" */}
                            {user_role === "ADMIN" && (
                                <button onClick={() => navigate('/admin/products')}>ADMIN Dashboard</button>
                            )}
                            <button onClick={() => navigate('/userorders')}>View Orders</button>
                            <button onClick={() => navigate('/profile')}>View Profile</button>
                            <button onClick={() => {
                                logout();
                                navigate('/');
                            }}>Sign Out
                            </button>
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
                    <Sidebar />
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
