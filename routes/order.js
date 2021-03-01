const express = require('express');
const router = express.Router();
const {
   createOrder,
   updateOrder,
   getOrders,
   deleteOrder
} = require('../controllers/order');

router.post('/',createOrder);
router.get('/',getOrders);
router.put('/:id',updateOrder);
router.delete('/:id',deleteOrder);

module.exports = router;