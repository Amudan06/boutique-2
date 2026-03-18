const db = require('../config/db');

exports.createAppointment = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await db.execute(
            `INSERT INTO appointments 
            (customer_id, appointment_type, appointment_date, appointment_time, duration_minutes, staff_id, status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.customer_id, data.appointment_type, data.appointment_date, data.appointment_time, data.duration_minutes || 30, data.staff_id || null, data.status || 'scheduled', data.notes || '']
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM appointments ORDER BY appointment_date, appointment_time ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};
