const express = require('express');
const router = express.Router();
const {
   createProduct,
   updateProduct,
   getProducts,
   deleteProduct
} = require('../controllers/product');

router.post('/',createProduct);
router.get('/',getProducts);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;