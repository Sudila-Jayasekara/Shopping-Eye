import axios from 'axios';

const API_URL = 'http://localhost:1010/public/items';

export const createItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData);
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
        return response;
    } catch (error) {
        console.error("There was an error fetching the items!", error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("There was an error deleting the item!", error);
        throw error;
    }
};

export const updateItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedItem);
        return response;
    } catch (error) {
        console.error("There was an error updating the item!", error);
        throw error;
    }
};