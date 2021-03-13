const express = require('express');
const router = express.Router();
const {
   createOrder,
   // updateOrder,
   getOrders,
   // deleteOrder
} = require('../controllers/order');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect ,createOrder);
router.get('/', protect, getOrders);
// router.put('/:id',protect,  updateOrder);
// router.delete('/:id', deleteOrder);

module.exports = router;