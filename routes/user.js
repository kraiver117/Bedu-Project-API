const express = require('express');
const router = express.Router();
const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser
} = require('../controllers/user');

const User = require('../models/User');

const advancedQueryResults = require('../middleware/advancedQueryResults');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, advancedQueryResults(User), authorize('admin'), getAllUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.post('/', protect, authorize('admin'), createUser);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;