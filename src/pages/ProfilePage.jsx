// import { useState, useEffect } from 'react';
// import '../styles/profilepage.css';
//
// const ProfilePage = () => {
//     const [user, setUser] = useState({
//         id: '',
//         username: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         role: '',
//         createdAt: '',
//         addresses: []
//     });
//
//     const [isEditing, setIsEditing] = useState(false);
//
//     useEffect(() => {
//         const fetchUserData = async () => {
//             const email = localStorage.getItem('email');
//             const password = localStorage.getItem('password');
//             const basicAuth = btoa(`${email}:${password}`);
//
//             const response = await fetch(`http://localhost:8080/user/profile?email=${email}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Basic ${basicAuth}`,
//                 },
//             });
//
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data);
//             } else {
//                 alert('Failed to fetch user data');
//             }
//         };
//
//         fetchUserData();
//     }, []);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };
//
//     const handleSave = async () => {
//         const email = localStorage.getItem('email');
//         const password = localStorage.getItem('password');
//         const basicAuth = btoa(`${email}:${password}`);
//
//         const response = await fetch('http://localhost:8080/user/update', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Basic ${basicAuth}`,
//             },
//             body: JSON.stringify(user),
//         });
//
//         if (response.ok) {
//             alert('Profile updated successfully!');
//             setIsEditing(false);
//         } else {
//             alert('Failed to update profile.');
//         }
//     };
//
//     return (
//         <div className="profile-page">
//             <h2>User Profile</h2>
//             <div className="profile-container">
//                 <div className="profile-info">
//                     {Object.entries(user).map(([key, value]) => (
//                         <div key={key} className="profile-field">
//                             <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
//                             {isEditing && ['username', 'firstName', 'lastName', 'email'].includes(key) ? (
//                                 <input
//                                     type={key === 'email' ? 'email' : 'text'}
//                                     name={key}
//                                     value={value || ''}
//                                     onChange={handleChange}
//                                 />
//                             ) : (
//                                 <span>{value}</span>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="profile-actions">
//                     {isEditing ? (
//                         <>
//                             <button className="save-button" onClick={handleSave}>Save</button>
//                             <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
//                         </>
//                     ) : (
//                         <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;

import { useState, useEffect } from 'react';
import '../styles/profilepage.css';
import AddressForm from '../components/AddressForm';

const ProfilePage = () => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        createdAt: '',
        addresses: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState(null); // Adresa nouă doar pentru editare

    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            const basicAuth = btoa(`${email}:${password}`);

            const response = await fetch(`http://localhost:8080/user/profile?email=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${basicAuth}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                alert('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleAddAddress = () => {
        setNewAddress({
            state: '',
            zip: '',
            country: '',
            city: '',
            addressLine: '',
            phone: ''
        });
    };

    const handleSave = async () => {
        const updatedUser = { ...user };
        if (newAddress) {
            updatedUser.addresses = [...user.addresses, newAddress];
        }

        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const basicAuth = btoa(`${email}:${password}`);

        const response = await fetch('http://localhost:8080/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            alert('Profile updated successfully!');
            setIsEditing(false);
            setUser(updatedUser);
            setNewAddress(null); // Resetăm adresa nouă după salvare
        } else {
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-container">
                <div className="profile-info">
                    {Object.entries(user).map(([key, value]) => (
                        !['addresses', 'createdAt'].includes(key) && (
                            <div key={key} className="profile-field">
                                <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                                {isEditing && ['username', 'firstName', 'lastName', 'email'].includes(key) ? (
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        name={key}
                                        value={value || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span>{value}</span>
                                )}
                            </div>
                        )
                    ))}
                </div>

                <div className="address-section">
                    <h3>Addresses</h3>
                    {user.addresses.map((address, index) => (
                        <div key={index} className="address-display">
                            <p>{address.state}, {address.city}, {address.country}, {address.addressLine}, {address.zip}</p>
                            <p>Phone: {address.phone}</p>
                        </div>
                    ))}

                    {isEditing && (
                        <>
                            <button onClick={handleAddAddress} className="add-address-button">Add New Address</button>
                            {newAddress && (
                                <AddressForm address={newAddress} onChange={handleAddressChange} />
                            )}
                        </>
                    )}
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
