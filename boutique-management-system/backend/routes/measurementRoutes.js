const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

router.post('/templates', measurementController.createMeasurementTemplate);
router.get('/templates', measurementController.getMeasurementTemplates);

router.post('/history', measurementController.createCustomerMeasurementHistory);
router.get('/history/:customerId', measurementController.getCustomerMeasurementHistory);

module.exports = router;
