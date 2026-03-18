const db = require('../config/db');

exports.createNotification = async (req, res) => {
    try {
        const { user_id, customer_id, type, title, message, channel, scheduled_for } = req.body;
        const [result] = await db.execute(
            `INSERT INTO notifications (user_id, customer_id, type, title, message, channel, status, scheduled_for) 
            VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
            [user_id || null, customer_id || null, type, title, message, channel, scheduled_for || null]
        );
        res.status(201).json({ id: result.insertId, message: 'Notification scheduled' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM notifications ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};
