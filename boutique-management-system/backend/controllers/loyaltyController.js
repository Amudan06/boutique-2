const db = require('../config/db');

exports.getLoyaltyPoints = async (req, res) => {
    try {
        const { customerId } = req.params;
        const [rows] = await db.execute('SELECT * FROM loyalty_points WHERE customer_id = ?', [customerId]);
        if (rows.length === 0) return res.status(404).json({ message: 'No points found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch loyalty points' });
    }
};

exports.addLoyaltyPoints = async (req, res) => {
    try {
        const { customer_id, points_earned, description } = req.body;
        // Simple mock for adding points
        await db.execute('INSERT INTO loyalty_transactions (customer_id, points_earned, transaction_type, description) VALUES (?, ?, ?, ?)', [customer_id, points_earned, 'earn', description]);
        res.status(201).json({ message: 'Points added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add loyalty points' });
    }
};
