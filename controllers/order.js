const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) =>  {
  try {
    // const { OrderItems } = req.body;

    // const product = await Product.findById(OrderItems);
    const order = new Order(req.body);
    order.user = req.user.id;
    order.save();

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error en la orden')
  }
}

exports.getOrders = async (req, res) => {
  
  try {
    const orders = await Order.find({user: req.user.id});
    res.json({orders});
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener ordenes')
  }
}


// function updateOrder(req, res) {
//   var order1 = new Order(Number(req.params.id), '[{"productoId":2, "cantidad":2},{"productoId":2, "cantidad":2}]', "CDMX", "Paypal", 
//                         900, 100, true, "27/02/2021", true,
//                         "28/02/2021", "27/02/2021", "27/02/2021");

//   var modificaciones = req.body;
//   order1 = { ...order1, ...modificaciones };
//   res.send(order1);
// }

// function getOrders(req, res) {
//   var order1 = new Order(1, '[{"productoId":6, "cantidad":2},{"productoId":6, "cantidad":3}]', "CDMX", "Paypal", 
//                         900, 100, true, "27/02/2021", true,
//                         "28/02/2021", "27/02/2021", "27/02/2021");
//   var order2 = new Order(2, '[{"productoId":3, "cantidad":1},{"productoId":4, "cantidad":4}]', "Puebla", "Transferencia", 
//                         800, 200, true, "27/02/2021", true,
//                         "28/02/2021", "27/02/2021", "27/02/2021");
//   res.send([order1, order2]);
// }

// function deleteOrder(req, res) {
//   res.status(200).send(`Orden ${req.params.id} eliminada`);
// }

// module.exports = {
//   updateOrder,
//   getOrders,
//   deleteOrder
// }
