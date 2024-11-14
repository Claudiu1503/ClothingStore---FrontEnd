import { useEffect, useState } from 'react';
import '../styles/userorders.css'; // Import the CSS file

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
                    <h3 className="order-header">
                        ORDER {order.id}
                        <span className="total-price">  Total: {order.total} $</span>
                    </h3>
                    <h4 className="order-subheader">Products:</h4>
                    <table className="order-table">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.orderItems.map((item) => (
                            <tr key={item.id} className="order-item">
                                <td className="product-image">
                                    <img
                                        src={`/productimages/${item.product.id}-1.png`}
                                        alt={item.product.name}
                                        onError={(e) => (e.target.src = '/fallback-image.png')}
                                    />
                                </td>
                                <td className="product-name">
                                    {item.product.name}
                                </td>
                                <td className="quantity">
                                    {item.quantity}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;
