const Order = require("../models/Order");
const asyncHandler = require('../middleware/async');

// @desc      Create order
// @route     POST /v1/orders
// @access    public
exports.createOrder = asyncHandler(async (req, res) =>  {

    const order = await Order.create(req.body);
    order.user = req.user.id;

    res.status(201).json({
      success: true,
      data: order
    });
    
})

// @desc      Get Orders
// @route     GET /v1/orders
// @access    private/admin
exports.getOrders = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});
