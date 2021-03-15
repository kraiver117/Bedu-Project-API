const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    //Create user
    const user = await User.create({
        fullName,
        email,
        password
    });

    sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Por favor ingresa un email y password'), 400);
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Credenciales Inválidas'), 401);
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Credenciales Inválidas'), 401);
    }

    sendTokenResponse(user, 200, res);
});

// @desc      Update user details
// @route     PUT v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    if (req.body.role && !req.user.role !== 'admin') {
        return next(new ErrorResponse('Solo un administrador puede cambiar el rol de un usuario', 401));
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc      Update password
// @route     PUT v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});


//Get Token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};

// @desc    Get current logged user
// @route   GET /v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        data: user
    });
});