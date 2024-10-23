import Sidebar from '../components/Sidebar';
import '../styles/homepage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">
                <img src="../../public/img/homepic.jpg" alt="homepic" className="fashion-image" />
            </div>
        </div>
    );
};

export default HomePage;
