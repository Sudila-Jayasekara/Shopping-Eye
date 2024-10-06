import axios from 'axios';

// Base URL for the shared wishlist API
const BASE_URL = 'http://localhost:1010/adminuser/shared-wishlist'; // Update if necessary

// Function to create a new shared wishlist
export const createSharedWishlist = async (sharedWishlistDTO, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, sharedWishlistDTO, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the created shared wishlist data
    } catch (error) {
        console.error('Error creating shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to delete a shared wishlist by ID
export const deleteSharedWishlist = async (id, token) => {
    try {
        await axios.delete(`${BASE_URL}/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error deleting shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to get a shared wishlist by ID
export const getSharedWishlistById = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the fetched shared wishlist data
    } catch (error) {
        console.error('Error fetching shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};


// Function to get all members for a shared wishlist
export const getAllMembersForSharedWishlist = async (wishlistId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/shared-wishlists/${wishlistId}/members`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the fetched members data
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to add an item to a shared wishlist
export const addItemToSharedWishlist = async (id, itemId, token) => {
    try {
        await axios.put(`${BASE_URL}/${id}/add-item/${itemId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error adding item to shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to remove an item from a shared wishlist
export const removeItemFromSharedWishlist = async (id, itemId, token) => {
    try {
        await axios.delete(`${BASE_URL}/${id}/remove-item/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error removing item from shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to add a member to a shared wishlist
export const addMemberToSharedWishlist = async (id, userId, token) => {
    try {
        await axios.post(`${BASE_URL}/${id}/add-member/${userId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error adding member to shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to remove a member from a shared wishlist
export const removeMemberFromSharedWishlist = async (id, userId, token) => {
    try {
        await axios.delete(`${BASE_URL}/${id}/remove-member/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error removing member from shared wishlist:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

// Function to get all shared wishlists for a user
export const getAllSharedWishlistsForUser = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the fetched shared wishlists data
    } catch (error) {
        console.error('Error fetching shared wishlists for user:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};
