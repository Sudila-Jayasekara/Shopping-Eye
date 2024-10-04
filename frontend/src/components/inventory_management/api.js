import axios from 'axios';

const API_URL = 'http://localhost:1010/api/items';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diejjxqts/image/upload'; // Your Cloudinary URL
const UPLOAD_PRESET = 'estate'; // Your Cloudinary upload preset
const FEEDBACK_API_URL = 'http://localhost:1010/api/feedback';

// Function to upload image to Cloudinary
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("There was an error uploading the image!", error);
        throw error;
    }
};

// Function to create an item with an image
export const createItem = async (itemData) => {
    try {
        // Make the API request to create the item
        const response = await axios.post(API_URL, itemData, {
            headers: { 'Content-Type': 'application/json' } // Ensure the correct content type
        });
        return response.data;
    } catch (error) {
        console.error("There was an error creating the item!", error);
        throw error;
    }
};

// Function to fetch all items
export const getAllItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the items!", error);
        throw error;
    }
};

// Function to delete an item
export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("There was an error deleting the item!", error);
        throw error;
    }
};

// Function to update an item
export const updateItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedItem, {
            headers: { 'Content-Type': 'application/json' } // Ensure the correct content type
        });
        return response.data;
    } catch (error) {
        console.error("There was an error updating the item!", error);
        throw error;
    }
};

// Function to fetch feedback by item ID
export const getFeedbackByItemId = async (itemId) => {
    try {
        const response = await axios.get(`${FEEDBACK_API_URL}/item/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching feedbacks!", error);
        throw error;
    }
};

// Function to submit feedback
export const submitFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(FEEDBACK_API_URL, feedbackData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting feedback!", error);
        throw error;
    }
};
