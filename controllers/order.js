const Order = require("../models/Order");

function createOrder(req, res) {
  const order = new Order(req.body);
  res.status(201).send(order);
}

function updateOrder(req, res) {
  var order1 = new Order(Number(req.params.id), '[{"productoId":2, "cantidad":2},{"productoId":2, "cantidad":2}]', "CDMX", "Paypal", 
                        900, 100, true, "27/02/2021", true,
                        "28/02/2021", "27/02/2021", "27/02/2021");

  var modificaciones = req.body;
  order1 = { ...order1, ...modificaciones };
  res.send(order1);
}

function getOrders(req, res) {
  var order1 = new Order(1, '[{"productoId":6, "cantidad":2},{"productoId":6, "cantidad":3}]', "CDMX", "Paypal", 
                        900, 100, true, "27/02/2021", true,
                        "28/02/2021", "27/02/2021", "27/02/2021");
  var order2 = new Order(2, '[{"productoId":3, "cantidad":1},{"productoId":4, "cantidad":4}]', "Puebla", "Transferencia", 
                        800, 200, true, "27/02/2021", true,
                        "28/02/2021", "27/02/2021", "27/02/2021");
  res.send([order1, order2]);
}

function getOrderbyID(req, res){
var orderID = req.params.id;

Order.findById(orderID).exec((err, nota) => {
  if(err) return res.status(500).send({ message: "Error en el servidor" });
      if(Order){
          return res.status(200).send({ Order });
      }else{
          return res.status(404).send({ message: "No existe la orden" });
      }
   
});
}

function deleteOrder(req, res) {
  res.status(200).send(`Orden ${req.params.id} eliminada`);
}

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getOrderbyID,
  deleteOrder
}
