const { DataTypes } = require('sequelize');
const db = require('../conflig/db');
const bcrypt = require('bcryptjs');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer'),
        allowNull: false,
        defaultValue: 'customer'
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});

// 👇👇 Add this method here 👇👇
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
