const Order = require("../models/Order");
const asyncHandler = require('../middleware/async');

// @desc      Create order
// @route     POST /v1/orders
// @access    public
exports.createOrder = asyncHandler(async (req, res) =>  {

    const order = await Order.create(req.body);
    order.user = req.user.id;
    console.log(order.user);

    res.status(201).json({
      success: true,
      data: order
    });
    
})

// @desc      Get order
// @route     GET /v1/orders
// @access    public
exports.getOrders = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});


// function updateOrder(req, res) {
//   var order1 = new Order(Number(req.params.id), '[{"productoId":2, "cantidad":2},{"productoId":2, "cantidad":2}]', "CDMX", "Paypal", 
//                         900, 100, true, "27/02/2021", true,
//                         "28/02/2021", "27/02/2021", "27/02/2021");

//   var modificaciones = req.body;
//   order1 = { ...order1, ...modificaciones };
//   res.send(order1);
// }


// function deleteOrder(req, res) {
//   res.status(200).send(`Orden ${req.params.id} eliminada`);
// }

// module.exports = {
//   updateOrder,
//   getOrders,
//   deleteOrder
// }
