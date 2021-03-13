const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('No estas autorizado para acceder a esta ruta', 401));
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Find the user with the id embeded on the token
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        return next(new ErrorResponse('No estas autorizado para acceder a esta ruta', 401));
    }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`El usuario con el rol ${req.user.role} no esta autorizado para acceder a esta ruta`));
        }
        next();
    };
};