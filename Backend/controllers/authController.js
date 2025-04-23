const jwt = require('jsonwebtoken');
// const { User } = require('../models/User');
const User = require('../models/User');

const { Op } = require('sequelize');

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.create({ email, password, role });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
