require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./conflig/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Models and Associations
const User = require('./models/User');
const Product = require('./models/Product');

// Associations (important to define them here too)
Product.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Product, { foreignKey: 'UserId' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Connect DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

db.sync({ force: false }) // Set to true only during dev reset
    // db.sync({ force: true })  // DANGER: This will DROP all tables and recreate them

    .then(() => console.log('Database tables synced'))
    .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
