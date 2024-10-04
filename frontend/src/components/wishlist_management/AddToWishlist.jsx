import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../user_management/UsersService';
import { addItemToWishlist } from './WishlistService';

const AddToWishlist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false); // Ref to track if the fetch function has been called

    useEffect(() => {
        const fetchUserAndAddToWishlist = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Token is missing');
                setLoading(false);
                return;
            }

            try {
                const user = await UserService.getUserByToken(token);
                const userId = user.ourUsers.id;

                await addItemToWishlist(userId, id);

                
                navigate(-1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (!hasFetched.current) {
            fetchUserAndAddToWishlist();
            hasFetched.current = true; // Set the ref to true after the function runs
        }
    }, [id, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>Item added to wishlist successfully!</div>;
};

export default AddToWishlist;
