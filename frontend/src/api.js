import axios from 'axios';

// Global API configuration
const API_URL = 'http://localhost:1010/api/items';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diejjxqts/image/upload'; // Your Cloudinary URL
const UPLOAD_PRESET = 'estate'; // Your Cloudinary upload preset

// Set default headers for JSON requests globally (this applies to all axios requests)
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

// Function to upload an image to Cloudinary
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' } // Explicit content-type for file upload
        });
        return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading the image to Cloudinary:", error.response?.data || error.message);
        throw error;
    }
};

// Function to create an item (including optional image)
export const createItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData);
        return response.data; // Return the created item data
    } catch (error) {
        console.error("Error creating the item:", error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch all items from the backend
export const getAllItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return all items fetched
    } catch (error) {
        console.error("Error fetching the items:", error.response?.data || error.message);
        throw error;
    }
};

// Function to delete an item by its ID
export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Return success message
    } catch (error) {
        console.error(`Error deleting the item with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Function to update an existing item by its ID
export const updateItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedItem);
        return response.data; // Return updated item data
    } catch (error) {
        console.error(`Error updating the item with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }

    
};
// Function to update the quantity of an item in the backend
// Function to update the quantity of an item in the backend
export const updateItemQuantity = async (id, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/quantity`, { quantity });
        return response.data; // Return updated item data
    } catch (error) {
        console.error(`Error updating the item quantity with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};






