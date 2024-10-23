import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <button className="back-button" onClick={() => navigate('/')}>
                Home
            </button>
            <div className="login-container">
                <h2>Login</h2>
                {/* Your login form goes here */}
            </div>
        </div>
    );
};

export default LoginPage;
