import { useState, useEffect } from 'react';
import '../styles/profilepage.css';

const ProfilePage = () => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        createdAt: '',
        state: '',
        zip: '',
        country: '',
        city: '',
        addressLine: '',
        phone: ''
    });

    const [isEditing, setIsEditing] = useState(false);

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

    const handleSave = async () => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const basicAuth = btoa(`${email}:${password}`);

        const response = await fetch('http://localhost:8080/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert('Profile updated successfully!');
            setIsEditing(false);
        } else {
            alert('Failed to update profile.');
        }
    };

    const handleHomeNavigation = () => {
        history.push('/');
    };

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-container">
                <div className="profile-info">
                    {Object.entries(user).map(([key, value]) => (
                        <div key={key} className="profile-field">
                            <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                            {isEditing ? (
                                // Ascundem câmpurile `id`, `role`, `createdAt` în modul editare
                                key === 'id' || key === 'role' || key === 'createdAt' ? (
                                    <span>{value}</span>
                                ) : (
                                    <input
                                        type="text"
                                        name={key}
                                        value={value || ''}
                                        onChange={handleChange}
                                    />
                                )
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    ))}
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
                    <button className="home-button" onClick={handleHomeNavigation}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
