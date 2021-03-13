const express = require('express');
const router = express.Router();
const {
   getAllProducts,
   getProductById,
   createProduct,
   updateProduct,
   deleteProduct
} = require('../controllers/product');

const Product = require('../models/Product');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.get('/', advancedQueryResults(Product), getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;