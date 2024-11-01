import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/singleProduct.css';

const SingleProductPage = () => {
    const { id } = useParams(); // obține ID-ul produsului din URL
    const [product, setProduct] = useState(null);

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

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="single-product-page">
            <img src={`/productimages/${product.id}.png`} alt={product.name} onError={(e) => { e.target.src = '/productimages/default.png'; }} />
            <div className="product-details">
                <h1>{product.name}</h1>
                <p>Category: {product.category}</p>
                <p>Gender: {product.gender}</p>
                <p>Color: {product.color}</p>

                 {/*am pus intr-un div ca sa pot sa boldez textul!!!*/}
                <div className="product-price-text">
                    Price: ${product.price}
                </div>

                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default SingleProductPage;
