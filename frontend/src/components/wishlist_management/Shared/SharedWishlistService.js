import axios from 'axios';

// Base URL for the shared wishlist API
const BASE_URL = 'http://localhost:1010/adminuser/shared-wishlist'; // Update if necessary

// Function to create a new shared wishlist
export const createSharedWishlist = async (wishlistData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}`, wishlistData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the created shared wishlist data
    } catch (error) {
        console.error('Error creating shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to add an item to a shared wishlist
export const addItemToSharedWishlist = async (wishlistId, itemData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/${wishlistId}/items`, itemData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the updated shared wishlist data
    } catch (error) {
        console.error('Error adding item to shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to remove an item from a shared wishlist
export const removeItemFromSharedWishlist = async (wishlistId, itemId, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${wishlistId}/items/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the updated shared wishlist data
    } catch (error) {
        console.error('Error removing item from shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to get all items in a shared wishlist
export const getWishlistItems = async (wishlistId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/${wishlistId}/items`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the list of items
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to add a member to a shared wishlist
export const addMemberToSharedWishlist = async (wishlistId, memberData, token) => {
    try {
        // Ensure memberData includes the correct structure, e.g., { email: memberEmail }
        const response = await axios.post(`${BASE_URL}/${wishlistId}/members`, memberData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the updated shared wishlist data
    } catch (error) {
        console.error('Error adding member to shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to get all shared wishlists of a user
export const getSharedWishlistsByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the list of shared wishlists
    } catch (error) {
        console.error('Error fetching shared wishlists:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to delete a shared wishlist
export const deleteSharedWishlist = async (wishlistId, token) => {
    try {
        await axios.delete(`${BASE_URL}/${wishlistId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error deleting shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};
