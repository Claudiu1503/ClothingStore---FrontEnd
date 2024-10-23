import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


const App = () => {
    const location = useLocation();

    return (
        <div>
            {/* Conditionally render AppBar only when not on the /login route */}
            {location.pathname !== '/login' && <AppBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
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
