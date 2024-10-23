import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage'; // Import products page
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetpasswordPage';

const App = () => {
    const location = useLocation();

    // Conditionally render AppBar for "/" and "/products"
    const showAppBar = location.pathname === '/' || location.pathname === '/products';

    return (
        <div>
            {showAppBar && <AppBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<ProductsPage />} /> {/* Add products route */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

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
