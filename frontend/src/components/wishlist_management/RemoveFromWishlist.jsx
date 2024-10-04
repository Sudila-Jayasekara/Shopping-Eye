import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import UserService from '../user_management/UsersService';
import { removeItemFromWishlist } from './WishlistService'; // Assuming you have this service

const RemoveFromWishlist = () => {
    const { id } = useParams(); // Get item ID from the URL
    const navigate = useNavigate(); // Initialize useNavigate
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false); // Ref to track if the fetch function has been called

    useEffect(() => {
        const fetchUserAndRemoveFromWishlist = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage

            if (!token) {
                setError('Token is missing');
                setLoading(false);
                return;
            }

            try {
                const user = await UserService.getUserByToken(token); // Get user by token
                const userId = user.ourUsers.id; // Extract user ID

                await removeItemFromWishlist(userId, id); // Remove item from wishlist
                
                navigate(-1); // Navigate to the wishlist page after successful removal
            } catch (err) {
                setError(err.message); // Handle any errors
            } finally {
                setLoading(false);
            }
        };

        if (!hasFetched.current) {
            fetchUserAndRemoveFromWishlist(); // Call the function to remove the item
            hasFetched.current = true; // Set the ref to true after the function runs
        }
    }, [id, navigate]); // Add navigate to the dependency array

    if (loading) {
        return <div>Loading...</div>; // Show loading message while removing the item
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error if there's an issue
    }

    return (
        <div>
            {/* Optionally add a button or other UI components here */}
        </div>
    );
};

export default RemoveFromWishlist;
