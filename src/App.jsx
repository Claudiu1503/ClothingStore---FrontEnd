import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetpasswordPage';
import ProfilePage from './pages/ProfilePage';
import { useState } from 'react';

const App = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = (name) => {
        setIsAuthenticated(true);
        setUserName(name);
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setUserName('');
    };

    const showAppBar = location.pathname === '/' || location.pathname === '/products';

    return (
        <div>
            {showAppBar && (
                <AppBar
                    isAuthenticated={isAuthenticated}
                    userName={userName}
                    onSignOut={handleSignOut}
                />
            )}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
