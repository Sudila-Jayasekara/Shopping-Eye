import axios from 'axios';

const API_URL = 'http://localhost:1010/api/payments';

export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(API_URL, paymentData);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the payment!", error);
        throw error;
    }
};

export const getAllPayments = async () => {
    return await axios.get(API_URL);
};

export const deletePayment = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};