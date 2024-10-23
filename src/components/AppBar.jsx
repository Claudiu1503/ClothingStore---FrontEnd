import '../styles/appbar.css';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
    const navigate = useNavigate();

    return (
        <header className="app-bar">
            <div className="app-name" onClick={() => navigate('/')}>ClothingStore</div>
            <input type="text" className="search-bar" placeholder="Search for products..." />
            <button className="login-button" onClick={() => navigate('/login')}>Login / Register</button>
        </header>
    );
};

export default AppBar;
