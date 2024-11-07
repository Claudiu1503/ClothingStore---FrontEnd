import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/checkout.css';

const CheckoutPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        // Fetch product details to validate stock and display the first image
        const fetchProductDetails = async () => {
            try {
                const productDetailsPromises = cartItems.map(async (item) => {
                    const response = await fetch(`http://localhost:8080/product/view/${item.id}`);
                    if (response.ok) {
                        return response.json();
                    }
                    return null;
                });

                const details = await Promise.all(productDetailsPromises);
                setProductDetails(details.filter(Boolean)); // Filter out any failed responses
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchProductDetails();
        }
    }, [cartItems]);

    const handleOrderSubmit = () => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        navigate('/products');
    };

    const handleQuantityChange = (item, newQuantity) => {
        // Ensure newQuantity is within valid range (0 to item.stock)
        const validQuantity = Math.min(Math.max(newQuantity, 0), item.stock || Infinity); // Handle potential undefined stock
        updateQuantity(item.id, validQuantity);
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            {cartItems.length > 0 ? (
                <ul className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <li key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img
                                    src={`/productimages/${item.id}-1.png`} // First image for the product
                                    alt={item.name}
                                    className="product-image"
                                />
                            </div>
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Stock: {productDetails[index]?.stock || 0}</p>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                        disabled={item.quantity === 0}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                        min="0"
                                        max={productDetails[index]?.stock || item.quantity} // Update max based on stock
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        disabled={item.quantity >= (productDetails[index]?.stock || 0)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            {cartItems.length > 0 && (
                <button onClick={handleOrderSubmit} className="place-order-button">
                    Place Order
                </button>
            )}
        </div>
    );
};

export default CheckoutPage;