import axios from 'axios';

// Base URL for the wishlist API
const BASE_URL = 'http://localhost:1010/adminuser/wishlist'; // Update if necessary

// Function to get the wishlist by user ID
export const getWishlistByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the fetched wishlist data
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to add an item to a wishlist
export const addItemToWishlist = async (userId, itemId) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
        await axios.put(`${BASE_URL}/${userId}/add-item/${itemId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to remove an item from a wishlist
export const removeItemFromWishlist = async (userId, itemId) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
        await axios.delete(`${BASE_URL}/${userId}/remove-item/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};
