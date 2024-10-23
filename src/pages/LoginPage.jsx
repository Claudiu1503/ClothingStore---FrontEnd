import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            <button className="home-button" onClick={() => navigate('/')}>
                Home
            </button>
            <div className="login-container">
                <h2>Login</h2>
                <form>
                <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" required/>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-links">
                    <p onClick={() => navigate('/reset-password')}>Forgot Password?</p>
                    <p onClick={() => navigate('/register')}>Don't have an account? Create one!</p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
