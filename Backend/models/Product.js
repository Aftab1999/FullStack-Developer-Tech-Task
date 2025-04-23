const { DataTypes } = require('sequelize');
const db = require('../conflig/db');
const User = require('./User'); // make sure this exists and is properly exported

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING
    },
    specs: {
        type: DataTypes.JSONB
    },
    UserId: { // 👈 Add this
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Define association
Product.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Product, { foreignKey: 'UserId' });

module.exports = Product;
