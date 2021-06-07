const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all products
// @route    GET /v1/products
// @access   Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single product
// @route    GET /v1/products/:id
// @access   Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorResponse('El producto no existe', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc      Create product
// @route     POST /v1/products
// @access    Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});


// @desc    Update product
// @route    PUT /v1/products/:id
// @access   Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  await product.save();

  res.status(200).json({
    success: true,
    data: product
  });
});


// @desc    Delete product
// @route    DELETE /v1/products/:id
// @access   Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc  Search products
// @route GET /v1/products/search/:keyword
// @access public

exports.searchProducts = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 3;
  const page = Number(req.query.page) || 1;
  const keyword = req.params.keyword ? {
    name: {
      $regex: req.params.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});
