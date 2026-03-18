const db = require('../config/db');

exports.addInventory = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await db.execute(
            `INSERT INTO fabric_inventory 
            (fabric_code, fabric_name, fabric_type, color, pattern, supplier_id, quantity_available, unit, price_per_unit, minimum_stock_level, reorder_quantity, location_rack, last_restocked) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.fabric_code, data.fabric_name, data.fabric_type, data.color, data.pattern, data.supplier_id || null, data.quantity_available, data.unit, data.price_per_unit, data.minimum_stock_level, data.reorder_quantity, data.location_rack, data.last_restocked || new Date()]
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add inventory entry' });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM fabric_inventory ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};
