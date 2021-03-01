const Product = require("../models/Order");

function createProduct(req, res) {
  const product = new Product(req.body);
  res.status(201).send(product);
}

function updateProduct(req, res) {
  var product1 = new Product(1, "Monitor Gaming", "Lenovo", "21.5 pulgadas", "Monitor", 1000, 5, "37786487t3.jpg", "28/02/2021", "28/02/2021");
  var modificaciones = req.body;
  product1 = { ...product1, ...modificaciones };
  res.send(product1);
}

function getProducts(req, res) {
  var product1 = new Product(1, "Monitor Gaming", "Lenovo", "21.5 pulgadas", "Monitor", 1000, 5, "37786487t3.jpg", "28/02/2021", "28/02/2021");
  var product2 = new Product(2, "MOUSE GAMER", "REDlemon", "Mouse  Óptico De 7200 Dpi", "Mouse", 210, 15, "23768763478.jpg", "28/02/2021", "28/02/2021");
  res.send([product1, product2]);
}

function deleteProduct(req, res) {
  res.status(200).send(`Producto ${req.params.id} eliminado`);
}

module.exports = {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct
}
