import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchTerm, selectedCategories, selectedColors, selectedGender, priceRange, products]);

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
        const newValue = parseInt(value) || 0;
        setPriceRange((prevRange) => {
            const updatedRange = [...prevRange];
            updatedRange[index] = newValue;
            return updatedRange;
        });
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

    return (
        <div className="products-page">
            <aside className="filter-menu">
                <h3>Filter by</h3>

                <h4>Category</h4>
                {["TSHIRTS", "JEANS", "SHORTS", "PANTS", "BAGS", "TOPS", "BLOUSES", "HATS", "JACKETS", "DRESS", "SNEAKERS", "ACCESSORIES"].map((category) => (
                    <label key={category} className="compact-checkbox">
                        {category.charAt(0) + category.slice(1).toLowerCase()}
                        <input
                            type="checkbox"
                            value={category}
                            onChange={(e) => handleCheckboxChange(e, setSelectedCategories, selectedCategories)}
                        />
                    </label>
                ))}

                <h4>Color</h4>
                {["WHITE", "BLACK", "BLUE", "RED", "GREEN", "YELLOW", "PURPLE", "PINK", "ORANGE", "BROWN", "GREY"].map((color) => (
                    <label key={color} className="compact-checkbox color-checkbox">
                        <span className={`color-box ${color.toLowerCase()}`}></span>
                        {color.charAt(0) + color.slice(1).toLowerCase()}
                        <input
                            type="checkbox"
                            value={color}
                            onChange={(e) => handleCheckboxChange(e, setSelectedColors, selectedColors)}
                        />
                    </label>
                ))}

                <h4>Gender</h4>
                {["MALE", "FEMALE", "UNISEX"].map((gender) => (
                    <label key={gender} className="compact-checkbox">
                        {gender.charAt(0) + gender.slice(1).toLowerCase()}
                        <input
                            type="checkbox"
                            value={gender}
                            onChange={(e) => handleCheckboxChange(e, setSelectedGender, selectedGender)}
                        />
                    </label>
                ))}

                <h4>Price</h4>
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                                <img
                                    src={`/productimages/${product.id}.png`}
                                    alt={product.name}
                                    onError={(e) => { e.target.src = '/productimages/default.png'; }}
                                />
                                <h3>{product.name}</h3>
                                <p>Category: {product.category}</p>
                                <p>Gender: {product.gender}</p>
                                <p>Color: {product.color}</p>
                                <p>Price: ${product.price}</p>
                                <p>{product.shortDescription}</p>
                            </Link>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductsPage;



