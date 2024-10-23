import { useState, useEffect } from 'react';
import '../styles/profilepage.css';

const ProfilePage = () => {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            const response = await fetch('http://localhost:8080/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
        const response = await fetch('http://localhost:8080/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token
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

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-container">
                <div className="profile-info">
                    {Object.entries(user).map(([key, value]) => (
                        <div key={key} className="profile-field">
                            <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                            {isEditing ? (
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
