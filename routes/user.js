const express = require('express');
const router = express.Router();
const {
   createUser,
   updateUser,
   getUsers,
   deleteUser
} = require('../controllers/user');

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id' ,deleteUser);

module.exports = router;