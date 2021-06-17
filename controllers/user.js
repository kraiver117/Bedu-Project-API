const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all users
//@route    GET /v1/users
//@access   Private/Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
//@route    GET /v1/users/:id
//@access   Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('El usuario no existe', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Create user
// @route     POST /v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
//@route    PUT /v1/users/:id
//@access   Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Reset Password
//@route    PUT /v1/user/resetPassword
//@access   Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({'email': email});

  if (!user) {
    return next(new ErrorResponse('Este correo electrónico no se encuentra registrado', 404));
  }

  user.password = password;

  await user.save();

  res.status(200).json({
    message: 'Te hemos enviado un correo electrónico, revisa los detalles para restablecer tu contraseña',
    success: true
  });
});

// @desc    Delete user
//@route    PUT /v1/users/:id
//@access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: user
  });
});
