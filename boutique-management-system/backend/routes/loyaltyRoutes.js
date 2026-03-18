const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');

router.get('/:customerId', loyaltyController.getLoyaltyPoints);
router.post('/add', loyaltyController.addLoyaltyPoints);

module.exports = router;
