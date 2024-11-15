import '../styles/appbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '/img/profileicon.png';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext';

const AppBar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    const user_id = localStorage.getItem("id") || null;
    const user_role = localStorage.getItem("role");
    const profileImage = localStorage.getItem('profileImage');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleCheckout = () => {
        if (user_id) {
            navigate('/checkout');
            setShowCartDropdown(false);
        } else {
            setAuthMessage('You must be authenticated before placing an order!');
        }
    };

    return (
        <>
            <header className="app-bar">
                <div className="category-selector">
                    <span
                        onClick={() => handleCategoryClick('men')}
                        className={selectedCategory === 'men' ? 'selected' : ''}
                    >
                        Bărbați
                    </span>
                    <span
                        onClick={() => handleCategoryClick('women')}
                        className={selectedCategory === 'women' ? 'selected' : ''}
                    >
                        Femei
                    </span>
                    <span
                        onClick={() => handleCategoryClick('unisex')}
                        className={selectedCategory === 'unisex' ? 'selected' : ''}
                    >
                        Unisex
                    </span>
                </div>
                <div className="app-name" onClick={() => navigate('/')}>
                    ClothingStore
                </div>
                <div className="action-container">
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
                            <span
                                onMouseEnter={() => setShowOptions(true)}
                                onMouseLeave={() => setShowOptions(false)}
                                className="user-icon">
                                <img
                                    src={profileImage || profileIcon}
                                    alt="User Icon"
                                    className="user-icon-img"
                                />
                                {user.username}
                            </span>
                            {showOptions && (
                                <div onMouseEnter={() => setShowOptions(true)}
                                     onMouseLeave={() => setShowOptions(false)}
                                     className="user-options">
                                    {user_role === "ADMIN" && (
                                        <button onClick={() => navigate('/admin/products')}>
                                            ADMIN Dashboard
                                        </button>
                                    )}
                                    <button onClick={() => navigate('/userorders')}>View Orders</button>
                                    <button onClick={() => navigate('/profile')}>View Profile</button>
                                    <button onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="login-button" onClick={() => navigate('/login')}>Login / Register</button>
                    )}
                </div>
            </header>
            <div className="categories-bar">
                <ul className="categories-list">
                    <li>Tshirts</li>
                    <li>Jeans</li>
                    <li>Shorts</li>
                    <li>Pants</li>
                    <li>Bags</li>
                    <li>Tops</li>
                    <li>Blouses</li>
                    <li>Hats</li>
                    <li>Jackets</li>
                    <li>Dress</li>
                    <li>Sneakers</li>
                    <li>Accessories</li>
                </ul>
                <span className="search-bar-container">
                    <input type="text" placeholder="Search..." className="search-bar" />
                </span>
            </div>
        </>
    );
};

AppBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    onSignOut: PropTypes.func.isRequired,
};

export default AppBar;
