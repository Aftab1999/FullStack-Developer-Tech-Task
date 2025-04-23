const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/prodcutController');
const { authenticate } = require('../middlewares/auth');
const { adminOnly } = require('../middlewares/role');


router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', authenticate, adminOnly, createProduct);

router.put('/:id', authenticate, adminOnly, updateProduct);

router.delete('/:id', authenticate, adminOnly, deleteProduct);

module.exports = router;