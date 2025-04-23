// import React, { useState, useEffect } from 'react';
// import { useApp } from '../context/AppContext';
// import ProductForm from '../components/ProductForm';
// import ProductList from '../components/ProductList';
// import { Typography, Container } from '@mui/material';

// const ProductsPage = () => {
//     const {
//         products,
//         loading,
//         createProduct,
//         updateProduct,
//         deleteProduct,
//         fetchProducts  // Make sure this is available from your context
//     } = useApp();

//     const [editProduct, setEditProduct] = useState(null);

//     const handleEdit = (product) => setEditProduct(product);
//     const handleCancelEdit = () => setEditProduct(null);

//     // Enhanced CRUD handlers with auto-reload
//     const handleCreate = async (productData) => {
//         await createProduct(productData);
//         await fetchProducts();  // Force reload after creation
//     };

//     const handleUpdate = async (id, productData) => {
//         await updateProduct(id, productData);
//         await fetchProducts();  // Force reload after update
//         setEditProduct(null);   // Exit edit mode
//     };

//     const handleDelete = async (id) => {
//         await deleteProduct(id);
//         await fetchProducts();  // Force reload after deletion
//     };

//     useEffect(() => {
//         fetchProducts();  // Initial load
//     }, []);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Product Management</Typography>

//             <ProductForm
//                 onSubmit={editProduct ? handleUpdate : handleCreate}
//                 product={editProduct}
//                 onCancel={handleCancelEdit}
//             />

//             <ProductList
//                 products={products}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//             />
//         </Container>
//     );
// };

// export default ProductsPage;


import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { Typography, Container } from '@mui/material';

const ProductsPage = () => {
    const {
        products,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        role // Get role from context
    } = useApp();

    const [editProduct, setEditProduct] = useState(null);
    const isAdmin = role === 'admin'; // Check if user is admin

    const handleEdit = (product) => setEditProduct(product);
    const handleCancelEdit = () => setEditProduct(null);

    const handleCreate = async (productData) => {
        await createProduct(productData);
        await fetchProducts();
    };

    const handleUpdate = async (id, productData) => {
        await updateProduct(id, productData);
        await fetchProducts();
        setEditProduct(null);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        await fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container>
            <Typography variant="h4" mt={2} mb={2}>
                {isAdmin ? 'Product Management' : 'Our Products'}
            </Typography>

            {isAdmin && (
                <ProductForm
                    onSubmit={editProduct ? handleUpdate : handleCreate}
                    product={editProduct}
                    onCancel={handleCancelEdit}
                />
            )}

            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
            />
        </Container>
    );
};

export default ProductsPage;