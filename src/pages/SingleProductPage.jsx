import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/singleProduct.css';

const SingleProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    const [imageError, setImageError] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState(5);

    const user_id = localStorage.getItem("id") || null;
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const maxImageCount = 3;

    const getAuthHeader = () => {
        if (email && password) {
            return {
                Authorization: 'Basic ' + btoa(`${email}:${password}`)
            };
        }
        return {};
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/view/${id}`, {
                    headers: getAuthHeader(),
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

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/product/${id}`, {
                    headers: getAuthHeader(),
                });
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error('Failed to fetch reviews');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const handleAddReview = async () => {
        if (user_id && reviewContent && reviewRating) {
            try {
                const response = await fetch(
                    `http://localhost:8080/reviews/add?user=${user_id}&productId=${id}&content=${encodeURIComponent(reviewContent)}&rating=${reviewRating}`,
                    {
                        method: 'POST',
                        headers: getAuthHeader(),
                    }
                );
                if (response.ok) {
                    const newReview = await response.json();
                    setReviews([...reviews, newReview]);
                    setReviewContent('');
                    setReviewRating(5);
                } else {
                    console.error('Failed to add review');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please add your review content and rating');
        }
    };

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
            <button className="back-to-products-button" onClick={() => navigate('/products')}>
                Back to Products
            </button>

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
                <div className="product-price-text">Price: ${product.price}</div>
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
                        <option value="XXL">XXL</option>
                    </select>
                </div>

                <div className="product-buttons">
                    <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                    <div className="favorite-button-container">
                        <button onClick={toggleFavorite} className="favorite-button">
                            {isFavorite ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>
                <div className="delivery-info">
                    <div className="delivery-card">🚚 Free delivery
                        <div className="delivery-card__info">FREE</div>
                    </div>
                    <div className="delivery-card">
                        <div className="delivery-text"> 🔄 100 days return policy</div>
                        <div className="delivery-info-container">
                            <div className="delivery-card-info">Fast delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>{review.user.username}:</strong> {review.content}</p>
                        <p>Rating: {review.rating} / 5</p>
                    </div>
                ))}
                <div className="add-review">
                    <h3>Add Your Review</h3>
                    <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="Write your review here..."
                    />
                    <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>
                                {rating} Star{rating > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
