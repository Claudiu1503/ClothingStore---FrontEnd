import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/homepage.css';

const HomePage = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Display the button after the text animation ends (3s delay)
        const timer = setTimeout(() => setShowButton(true), 750);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">
                <div className="image-container">
                    <img src="/img/homepic.jpg" alt="Fashion Design" className="fashion-image" />
                    <div className="overlay">
                        <h1 className="animated-text">Explore our Fashion Products</h1>
                        {showButton && (
                            <a href="/products" className="modern-button">
                                View Products
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
