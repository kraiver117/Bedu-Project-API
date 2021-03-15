const Order = require("../models/Order");
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get Orders
// @route     GET /v1/orders
// @access    private/admin
exports.getOrders = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Create order
// @route     POST /v1/orders
// @access    private
exports.createOrder = asyncHandler(async (req, res, next) =>  {
    const {
      orderItems,
      shippingAddress,
      paymentMethod
    }=req.body

    if(!orderItems && orderItems.length === 0){
      return next(new ErrorResponse('No existen productos en la orden', 400));
    }else{
      const shippingPrice = 150;
      const totalPrice = (orderItems.reduce((accumulator, item) => accumulator + item.qty * item.price, 0) + shippingPrice).toFixed(2);
      const isPaid = paymentMethod ? true : false;

      const order = new Order({
        orderItems, 
        user: req.user.id,
        shippingAddress,
        paymentMethod,
        isPaid,
        shippingPrice,
        totalPrice
      });

      const createdOrder = await order.save();

      res.status(201).json({
        success: true,
        data: createdOrder
    });
  }
})


// @desc      get order by ID 
// @route     GET /v1/orders
// @access    private
exports.getOrderbyID = asyncHandler(async (req, res, next) =>  {
  const order = await Order.findById(req.params.id).populate('user');
  
  if(order){
    res.status(200).json({
      success: true,
      data: order
    })
  }else{
    return next(new ErrorResponse('No se encontró la orden', 404));
  }
})

// @desc Get logged in user orders 
//@route Get /v1/orders/myorders 
//@access Private 
exports.getMyOrders = asyncHandler(async (req, res, next) =>  {
  const orders = await Order.find({ user: req.user.id });
  
  res.status(200).json({ success: true, data: orders});
})

// @desc Update order to delivered 
//@route PUT /v1/orders/:id/deliver 
//@access Private/admin 
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) =>  {
  const order = await Order.findById(req.params.id);

  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });    
  }else{
    return next(new ErrorResponse('No se encontró la orden', 404));
  }
})