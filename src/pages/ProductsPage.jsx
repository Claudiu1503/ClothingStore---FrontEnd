import { useEffect, useState } from 'react';
import '../styles/products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/get-all', {
                method: 'GET',
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

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Products Page</h1>
            <p>Explore our product categories and find what you need!</p>

            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={`/productimages/${product.id}.png`}
                                alt={product.name}
                                onError={(e) => { e.target.src = '/productimages/default.png'; }}
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Gender: {product.gender}</p>
                            <p>Color: {product.color}</p>
                            <p>Price: ${product.price}</p>
                            <p>{product.shortDescription}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
