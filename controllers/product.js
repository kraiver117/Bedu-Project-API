const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all products
// @route    GET /v1/products
// @access   Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.limit) || undefined;
  let page = Number(req.query.page) || 1;
  const category = req.query.category ? {
      name: {
        $regex: req.query.category,
        $options: 'i'
      }
    } : {};

  const count = await Product.countDocuments({ ...category });
  let totalPages = Math.ceil(count / pageSize);

  if (!pageSize) {
    totalPages = 1;
  }

  if (page > totalPages) page = 1;

  const data = await Product.find({ ...category }).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ data, page, totalPages })
});

// @desc     Get N Random products
// @route    GET /v1/random
// @access   Public
exports.getRandomProducts = asyncHandler(async (req, res, next) => {
  Product.aggregate([
    {
      $sample: { size: 5 }
    }
  ], function(err, result) {
    if (err){
      res.status(404).json('No se encontraron productos');
    } else {
      res.status(200).json(result);
    }
  });
});

// @desc    Get single product
// @route    GET /v1/products/:id
// @access   Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'user', model: 'User'} });
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

// @desc  Create new product review
// @route POST /v1/products/:id/reviews
// @access Private
exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { title, comment, rating } = req.body;

  const product = await Product.findById(req.params.id).exec();

  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400).json({ message: 'Ya has agregado una review a este producto' });
    } else {
      const review = {
        name: req.user.fullName,
        title,
        comment,
        rating: Number(rating),
        user: req.user._id
      }
  
      product.reviews.push(review);
      product.numReviews = Number(product.reviews.length);
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  
      await product.save();
  
      res.status(201).json({ message: 'Review Agregada'});
    }
  } else {
    res.status(404).json({ message: 'No se encontró el producto' });
  }
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
