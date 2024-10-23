import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/resetpasswordpage.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        setMessage('An email has been sent for password reset.');
        setCountdown(6); // Set countdown to 5 seconds
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            // Redirect after countdown
            if (countdown === 1) {
                navigate('/login'); // Redirect to login page
            }

            return () => clearInterval(timer);
        }
    }, [countdown, navigate]);

    return (
        <div className="reset-password-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            <button className="home-button" onClick={() => navigate('/')}>
                Home
            </button>
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="reset-button">
                        Send Reset Email
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
                {countdown > 0 && (
                    <p className="countdown">Redirecting in {countdown} seconds...</p>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
