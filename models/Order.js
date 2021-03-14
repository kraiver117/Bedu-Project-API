const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
// const uniqueValidator = require("mongoose-unique-validator");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    shippingAddress: {
        type: String,
        required: [true, "Ingrese su direccion"], 
    },
    paymentMethod: {
        type:String,
        required: [true, "Ingrese un metodo de pago"],
    },
    totalPrice: { 
        type: Boolean
     },
    shippingPrice: { 
        type: Number
     },
    isPaid: { 
        type: Number
     },
    paidAt: {
        type: Date,
        default: Date.now()
    },
    isDelivered: { 
        type: Boolean,
        default: false
     },
    deliveredAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);