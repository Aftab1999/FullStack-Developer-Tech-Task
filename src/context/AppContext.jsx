import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getAllProducts,
    createProduct as createProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
} from '../services/productService';

const AppContext = createContext();


export const useAuth = () => useContext(AppContext);


export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
    });

    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuth({ token, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth({ token: null, role: null });
    };


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts(auth.token);
            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };



    const createProduct = async (product) => {
        try {
            const newProduct = await createProductService(product, auth.token);
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            console.error('Create product error:', err);
            throw err;
        }
    };



    const updateProduct = async (id, updatedData) => {
        try {
            const updated = await updateProductService(id, updatedData, auth.token);
            setProducts(prev => prev.map(p => (p._id === id ? updated : p)));
            return updated;
        } catch (err) {
            console.error('Update product error:', err);
            throw err;
        }
    };



    const deleteProduct = async (id) => {
        try {
            await deleteProductService(id, auth.token);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error('Delete product error:', err);
            throw err;
        }
    };

    useEffect(() => {
        if (auth.token) {
            fetchProducts();
        }
    }, [auth.token]);

    return (
        <AppContext.Provider
            value={{
                ...auth,
                login,
                logout,
                products,
                loading,
                fetchProducts,
                createProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
