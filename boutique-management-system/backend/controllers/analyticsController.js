const db = require('../config/db');

exports.getAnalyticsDashboard = async (req, res) => {
    try {
        // Mock analytics data for the advanced dashboard
        const data = {
            totalRevenue: 45000,
            revenueGrowth: 12.5,
            activeOrders: 24,
            customerSatisfaction: 4.8,
            revenueChart: [
                { name: 'Jan', value: 4000 },
                { name: 'Feb', value: 3000 },
                { name: 'Mar', value: 5000 },
                { name: 'Apr', value: 4500 },
                { name: 'May', value: 6000 },
                { name: 'Jun', value: 5500 },
            ]
        };
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};
