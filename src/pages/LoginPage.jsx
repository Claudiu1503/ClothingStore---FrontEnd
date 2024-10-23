import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            console.log(response.status);

            if (response.ok) {
                // Autentificare cu succes
                const data = await response.json();
                console.log('Login successful:', data.message);
                navigate('/'); // Redirecționează utilizatorul către pagina principală
            } else {
                // Eroare de autentificare
                const errorMessage = await response.json();
                setError(errorMessage.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };


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
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-links">
                    <p onClick={() => navigate('/reset-password')}>Forgot Password?</p>
                    <p onClick={() => navigate('/register')}> NO account? Create one! </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
