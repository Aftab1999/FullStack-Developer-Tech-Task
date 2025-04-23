const Product = require('../models/Product');
const User = require('../models/User');


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: User,
                attributes: ['email']
            }
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new product (admin only)
exports.createProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can create products' });
        }

        const product = await Product.create({
            ...req.body,
            UserId: req.user.id // ✅ This works if association is set
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['email']
            }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can update products' });
        }

        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can delete products' });
        }

        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
