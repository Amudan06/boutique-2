const db = require('../config/db');

exports.createMeasurementTemplate = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await db.execute(
            `INSERT INTO measurement_templates 
            (template_name, gender, size_category, chest, waist, hip, shoulder, sleeve_length, armhole, bicep, wrist, neck, back_width, front_length, back_length, inseam, outseam, thigh, knee, calf, ankle) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.template_name, data.gender, data.size_category, data.chest, data.waist, data.hip, data.shoulder, data.sleeve_length, data.armhole, data.bicep, data.wrist, data.neck, data.back_width, data.front_length, data.back_length, data.inseam, data.outseam, data.thigh, data.knee, data.calf, data.ankle]
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create measurement template' });
    }
};

exports.getMeasurementTemplates = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM measurement_templates ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
};

exports.createCustomerMeasurementHistory = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await db.execute(
            `INSERT INTO customer_measurements_history 
            (customer_id, measurement_date, chest, waist, hip, shoulder, sleeve_length, armhole, bicep, wrist, neck, back_width, front_length, back_length, inseam, outseam, thigh, knee, calf, ankle, body_type, notes, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.customer_id, data.measurement_date, data.chest, data.waist, data.hip, data.shoulder, data.sleeve_length, data.armhole, data.bicep, data.wrist, data.neck, data.back_width, data.front_length, data.back_length, data.inseam, data.outseam, data.thigh, data.knee, data.calf, data.ankle, data.body_type, data.notes, data.created_by]
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add measurement history' });
    }
};

exports.getCustomerMeasurementHistory = async (req, res) => {
    try {
        const { customerId } = req.params;
        const [rows] = await db.execute('SELECT * FROM customer_measurements_history WHERE customer_id = ? ORDER BY measurement_date DESC', [customerId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch customer history' });
    }
};
