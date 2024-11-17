import '../styles/sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ gender }) => {  // Accept gender as a prop
    const navigate = useNavigate();

    const categories = [
        { name: 'Tricouri', value: 'TSHIRTS' },
        { name: 'Jeans', value: 'JEANS' },
        { name: 'Shorts', value: 'SHORTS' },
        { name: 'Blugi', value: 'PANTS' },
        { name: 'Genti', value: 'BAGS' },
        { name: 'Topuri', value: 'TOPS' },
        { name: 'Bluze', value: 'BLOUSES' },
        { name: 'Palarii', value: 'HATS' },
        { name: 'Geci', value: 'JACKETS' },
        { name: 'Rochii', value: 'DRESS' },
        { name: 'Incaltaminte sport', value: 'SNEAKERS' },
        { name: 'Accesorii', value: 'ACCESSORIES' },
    ];

    const handleCategoryClick = (categoryValue) => {
        // Now we use the gender prop in the URL
        navigate(`/products?gender=${gender}&category=${categoryValue}`, { replace: true });
    };

    return (
        <div className="sidebar">
            <ul>
                {categories.map((category) => (
                    <li
                        key={category.value}
                        onClick={() => handleCategoryClick(category.value)}
                        className="sidebar-item"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
