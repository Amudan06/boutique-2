const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');

router.post('/', designController.createDesign);
router.get('/', designController.getDesigns);

module.exports = router;
