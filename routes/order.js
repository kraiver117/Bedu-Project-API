const express = require('express');
const router = express.Router();
const {
   createOrder,
   getOrders,
   getOrderbyId,
   getMyOrders,
   updateOrderToDelivered,
   deleteOrder,
   updateOrderToPay
} = require('../controllers/order');

const Order = require('../models/Order');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, authorize('admin'), getOrderbyId);
router.get('/', protect, authorize('admin'), advancedQueryResults(Order, 'user'), getOrders);
router.delete('/:id', protect, authorize('admin'), deleteOrder);
router.put('/:id/deliver', protect, authorize('admin'), updateOrderToDelivered);
router.put('/:id/pay', protect, authorize('admin'), updateOrderToPay);

module.exports = router;