import { useEffect, useState } from 'react';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const user_id = localStorage.getItem("id") || null;
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    // Helper function to create authentication header
    const getAuthHeader = () => {
        if (email && password) {
            return {
                Authorization: 'Basic ' + btoa(`${email}:${password}`)
            };
        }
        return {};
    };

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8080/order/user-orders/userid/${user_id}/get-all`, {
                    headers: getAuthHeader(),
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOrders();
    }, [user_id]);

    if (!orders.length) {
        return <p className="loading">Loading orders...</p>;
    }

    return (
        <div className="user-orders-container">
            {orders.map((order) => (
                <div key={order.id} className="order-card">
                    <h3 className="order-header">Order #{order.id} - <span className="total-price">{order.total} USD</span></h3>
                    <h4 className="order-subheader">Products:</h4>
                    <div className="order-items">
                        {order.orderItems.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className="product-image">
                                    <img
                                        src={`/productimages/${item.product.id}-1.png`}
                                        alt={item.product.name}
                                        onError={(e) => (e.target.src = '/fallback-image.png')}
                                        // Added styles for responsive image
                                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="product-details">
                                    <p className="product-name">{item.product.name}</p>
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;