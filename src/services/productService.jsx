import axios from 'axios';

const API = 'http://localhost:5000/api/products';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllProducts = async (token) => {  // Added token parameter
    const res = await axios.get(API, token ? getAuthHeader() : {});
    return res.data;
};

export const createProduct = async (product, token) => {
    const res = await axios.post(API, product, getAuthHeader());
    return res.data;
};

export const updateProduct = async (id, product, token) => {
    const res = await axios.put(`${API}/${id}`, product, getAuthHeader());
    return res.data;
};

export const deleteProduct = async (id, token) => {
    await axios.delete(`${API}/${id}`, getAuthHeader());
    return id;  // Return the deleted ID for state update
};