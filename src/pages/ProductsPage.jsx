// const ProductsPage = () => {
//     return (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//             <h1>Products Page</h1>
//             <p>Explore our product categories and find what you need!</p>
//         </div>
//     );
// };
//
// export default ProductsPage;

import { useAuth } from '../contexts/AuthContext.jsx';

const ProductsPage = () => {
    const { user } = useAuth(); // Obține utilizatorul din context

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Products Page</h1>
            {user ? <p>Welcome, {user.username}!</p> : <p>Please log in.</p>}
            <p>Explore our product categories and find what you need!</p>
        </div>
    );
};

export default ProductsPage;
