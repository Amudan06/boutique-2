const db = require('../config/db');

exports.createDesign = async (req, res) => {
    try {
        const data = req.body;
        const style_tags = JSON.stringify(data.style_tags || []);
        const fabric_requirement = JSON.stringify(data.fabric_requirement || {});
        const accessories_required = JSON.stringify(data.accessories_required || []);
        const gallery_images = JSON.stringify(data.gallery_images || []);

        const [result] = await db.execute(
            `INSERT INTO designs 
            (design_code, design_name, category, sub_category, style_tags, difficulty_level, estimated_hours, base_price, fabric_requirement, accessories_required, thumbnail_url, gallery_images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.design_code, data.design_name, data.category, data.sub_category, style_tags, data.difficulty_level, data.estimated_hours, data.base_price, fabric_requirement, accessories_required, data.thumbnail_url, gallery_images]
        );
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create design' });
    }
};

exports.getDesigns = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM designs ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch designs' });
    }
};
