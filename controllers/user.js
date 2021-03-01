const User = require("../models/User");

function createUser(req, res) {
  const user = new User(req.body);
  res.status(201).send(user);
}

function updateUser(req, res) {
  var user1 = new User(1, "Juan Perez", "juanperez@gmail.com", "juan1234", false, "28/02/2021", "28/02/2021");
  var modificaciones = req.body;
  user1 = { ...user1, ...modificaciones };
  res.send(user1);
}

function getUsers(req, res) {
  var user1 = new User(1, "Juan Perez", "juanperez@gmail.com", "juan1234", false, "28/02/2021", "28/02/2021");
  var user2 = new User(2, "Rodrigo Ruíz", "rodruiz@gmail.com", "rod1234", false, "28/02/2021", "28/02/2021");
  res.send([user1, user2]);
}

function deleteUser(req, res) {
  res.status(200).send(`Usuario ${req.params.id} eliminado`);
}

module.exports = {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
};
