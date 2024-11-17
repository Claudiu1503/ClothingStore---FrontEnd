import { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../styles/products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [filterOpen, setFilterOpen] = useState({
        category: true,
        color: true,
        gender: true,
        price: true,
    });
    const itemsPerPage = 12;
    const location = useLocation();
    const { gender, category } = location.state || {};

    useEffect(() => {
        if (gender) setSelectedGender([gender]);
        if (category) setSelectedCategories([category]);
    }, [gender, category]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
        setCurrentPage(1);
    }, [searchTerm, selectedCategories, selectedColors, selectedGender, priceRange, products, selectedGender]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/get-all', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCheckboxChange = (e, setFunction, currentSelections) => {
        const { value, checked } = e.target;
        setFunction(checked
            ? [...currentSelections, value]
            : currentSelections.filter((item) => item !== value)
        );
    };

    const handlePriceInputChange = (index, value) => {
        const newValue = parseInt(value, 10);
        if (!isNaN(newValue) && newValue >= 0) {
            setPriceRange((prevRange) => {
                const updatedRange = [...prevRange];
                updatedRange[index] = newValue;
                return updatedRange;
            });
        } else {
            setPriceRange((prevRange) => {
                const updatedRange = [...prevRange];
                updatedRange[index] = '';
                return updatedRange;
            });
        }
    };

    const filterProducts = () => {
        let filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) => selectedCategories.includes(product.category));
        }

        if (selectedColors.length > 0) {
            filtered = filtered.filter((product) => selectedColors.includes(product.color));
        }

        if (selectedGender.length > 0) {
            filtered = filtered.filter((product) => selectedGender.includes(product.gender));
        }

        filtered = filtered.filter((product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleFilterOpen = (filterType) => {
        setFilterOpen((prev) => ({ ...prev, [filterType]: !prev[filterType] }));
    };

    return (
        <div className="products-page">
            <aside className="filter-menu">
                <h3>Filter by</h3>

                <h4 onClick={() => toggleFilterOpen('category')}>
                    Category <span>{filterOpen.category ? '-' : '+'}</span>
                </h4>
                {filterOpen.category && (
                    <div className="filter-group">
                        {["TSHIRTS", "JEANS", "SHORTS", "PANTS", "BAGS", "TOPS", "BLOUSES", "HATS", "JACKETS", "DRESS", "SNEAKERS", "ACCESSORIES"].map((category) => (
                            <label key={category} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={category}
                                    onChange={(e) => handleCheckboxChange(e, setSelectedCategories, selectedCategories)}
                                />
                                {category.charAt(0) + category.slice(1).toLowerCase()}
                            </label>
                        ))}
                    </div>
                )}

                <h4 onClick={() => toggleFilterOpen('color')}>
                    Color <span>{filterOpen.color ? '-' : '+'}</span>
                </h4>
                {filterOpen.color && (
                    <div className="filter-group">
                        {["WHITE", "BLACK", "BLUE", "RED", "GREEN", "YELLOW", "PURPLE", "PINK", "ORANGE", "BROWN", "GREY"].map((color) => (
                            <label key={color} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={color}
                                    onChange={(e) => handleCheckboxChange(e, setSelectedColors, selectedColors)}
                                />
                                <span className={`color-box ${color.toLowerCase()}`}></span>
                                {color.charAt(0) + color.slice(1).toLowerCase()}
                            </label>
                        ))}
                    </div>
                )}

                <h4 onClick={() => toggleFilterOpen('gender')}>
                    Gender <span>{filterOpen.gender ? '-' : '+'}</span>
                </h4>
                {filterOpen.gender && (
                    <div className="filter-group">
                        {["MALE", "FEMALE", "UNISEX"].map((gender) => (
                            <label key={gender} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={gender}
                                    onChange={(e) => handleCheckboxChange(e, setSelectedGender, selectedGender)}
                                />
                                {gender.charAt(0) + gender.slice(1).toLowerCase()}
                            </label>
                        ))}
                    </div>
                )}

                <h4 onClick={() => toggleFilterOpen('price')}>
                    Price <span>{filterOpen.price ? '-' : '+'}</span>
                </h4>
                {filterOpen.price && (
                    <div className="price-inputs">
                        <input
                            type="text"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceInputChange(0, e.target.value)}
                            placeholder="Min"
                        />
                        <span> - </span>
                        <input
                            type="text"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceInputChange(1, e.target.value)}
                            placeholder="Max"
                        />
                    </div>
                )}
            </aside>

            <main className="products-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="product-list">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                                <img
                                    src={`/productimages/${product.id}-1.png`}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.src = '/productimages/default.png';
                                    }}
                                />
                                <h3>{product.name}</h3>
                                <p style={{fontWeight: 'bold', color: 'green'}}>Price: ${product.price}</p>
                                <p style={{fontWeight: 'bold'}}>Brand: {product.brand}</p>
                                <p>Category: {product.category}</p>
                            </Link>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>

                <div className="pagination">
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber + 1}
                            className={`page-button ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNumber + 1)}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>

                {showBackToTop && (
                    <button className="back-to-top" onClick={scrollToTop}>
                        ⬆️Top
                    </button>
                )}
            </main>
        </div>
    );
};

export default ProductsPage;
