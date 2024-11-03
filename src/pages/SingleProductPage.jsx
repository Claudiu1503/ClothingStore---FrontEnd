import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/singleProduct.css';

const SingleProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    const [imageError, setImageError] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const maxImageCount = 3; // Adjust based on the number of images per product

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/view/${id}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < maxImageCount ? prevIndex + 1 : 1));
        setImageError(false);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : maxImageCount));
        setImageError(false);
    };

    const toggleFavorite = () => setIsFavorite((prev) => !prev);

    const handleAddToCart = () => {
        if (selectedSize) {
            ///TODO
            // Aici trebuie implementata adaugarea in cos

            alert(`Added ${product.name} (Size: ${selectedSize}) to cart`);
        } else {
            alert('Please select a size');
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="single-product-page">
            <div className="product-image-carousel">
                <button onClick={handlePreviousImage} className="carousel-button">{"<"}</button>
                <img
                    src={`/productimages/${product.id}-${currentImageIndex}.png`}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    style={{ display: imageError ? 'none' : 'block' }}
                />
                {imageError && <p>Image not available</p>}
                <button onClick={handleNextImage} className="carousel-button">{">"}</button>
            </div>

            <div className="product-details">
                <h1>{product.name}</h1>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Gender: {product.gender}</p>
                <p>Color: {product.color}</p>
                <div className="product-price-text">
                    Price: ${product.price}
                </div>
                <p>{product.description}</p>

                <div className="product-size-select">
                    <label htmlFor="size">Select Size:</label>
                    <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="">Choose size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                <div className="product-buttons">
                    <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                    <button onClick={toggleFavorite} className="favorite-button">
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
