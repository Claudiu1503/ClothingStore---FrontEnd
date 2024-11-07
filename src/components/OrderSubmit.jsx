import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const OrderSubmit = () => {
    const { cartItems, clearCart } = useCart();

    const handleSubmitOrder = async () => {
        const orderData = {
            userId: localStorage.getItem("id"),
            address: {
                street: '123 Main St',
                city: 'Anytown',
                zipCode: '12345'
            },
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        try {
            const response = await axios.post('http://localhost:8080/order/create', orderData);
            alert('Order placed successfully!');
            clearCart();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error placing order.');
        }
    };

    return (
        <button onClick={handleSubmitOrder}>Submit Order</button>
    );
};

export default OrderSubmit;
