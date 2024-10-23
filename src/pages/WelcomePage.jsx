
import '../styles/WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-title">Bine ați venit!</h1>
                <p className="welcome-text">
                    Aceasta este o pagină modernă de întâmpinare creată cu React și Vite.
                </p>
                <button className="welcome-button">Explorați</button>
            </div>
        </div>
    );
};

export default WelcomePage;
