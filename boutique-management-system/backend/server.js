const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes import
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const designRoutes = require('./routes/designRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Routes usage
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/measurements', measurementRoutes);
app.use('/designs', designRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/loyalty', loyaltyRoutes);
app.use('/notifications', notificationRoutes);
app.use('/analytics', analyticsRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Boutique Management Backend API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
