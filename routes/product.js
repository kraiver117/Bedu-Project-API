const express = require('express');
const router = express.Router();
const {
   getAllProducts,
   getProductById,
   createProduct,
   updateProduct,
   searchProducts,
   createProductReview,
   deleteProduct
} = require('../controllers/product');

const Product = require('../models/Product');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.get('/', advancedQueryResults(Product), getAllProducts);
router.get('/:id', getProductById);
router.get('/search/:keyword', searchProducts);
router.post('/', protect, authorize('admin'), createProduct);
router.post('/:id/reviews', protect, createProductReview);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;