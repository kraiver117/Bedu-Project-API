const express = require('express');
const router = express.Router();
const {
   createOrder,
   getOrders,
} = require('../controllers/order');

const Order = require('../models/Order');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect ,createOrder);
router.get('/', protect, authorize('admin'), advancedQueryResults(Order), getOrders);

module.exports = router;