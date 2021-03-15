const express = require('express');
const router = express.Router();
const {
   createOrder,
   getOrders,
   getOrderbyId,
   getMyOrders,
   updateOrderToDelivered
} = require('../controllers/order');

const Order = require('../models/Order');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderbyId);
router.get('/', protect, authorize('admin'), advancedQueryResults(Order, 'user'), getOrders);
router.put('/:id/deliver', protect, authorize('admin'), updateOrderToDelivered);

module.exports = router;