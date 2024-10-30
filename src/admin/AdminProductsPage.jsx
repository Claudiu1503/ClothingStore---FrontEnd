import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/adminProducts.css';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: 0 });
    const [image, setImage] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        // Verificăm dacă utilizatorul are rolul de admin
        if (role !== 'ADMIN') {
            alert('Access Denied! Only admins can access this page.');
            navigate('/login');
            return;
        }
        fetchProducts();
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/get-all', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${btoa(`${user.email}:${user.password}`)}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('category', newProduct.category);
            formData.append('price', newProduct.price);
            formData.append('quantity', newProduct.quantity);
            formData.append('image', image);

            const response = await fetch('http://localhost:8080/product/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${user.email}:${user.password}`)}`,
                },
                body: formData,
            });

            if (response.ok) {
                setNewProduct({ name: '', category: '', price: '', quantity: 0 });
                setImage(null);
                fetchProducts();
                alert('Product added successfully!');
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="admin-products-page">
            <h2>Admin Products</h2>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        {product.image && <img src={`/images/${product.image}`} alt={product.name} />}
                    </div>
                ))}
            </div>

            <form className="add-product-form" onSubmit={handleAddProduct}>
                <h3>Add New Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminProductsPage;
