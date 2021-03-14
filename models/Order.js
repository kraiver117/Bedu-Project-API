const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const uniqueValidator = require("mongoose-unique-validator");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        lowercase: true,
        required: [true, "No puede estar vacío"],
        index = true,
    },
    OrderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "No puede estar vacío"],

    },
    ShippingAddress: {
        type: String,
        required: [true, "Ingresar direccion"], 
    },
    paymentMethod: {
        required: [true, "No puede estar vacío"],
    },
    totalPrice: { Number },
    shippingPrice: { Number },
    isPaid: { Boolean },
    paidAt: {
        //
    },
    isDelivered: { Boolean },
    deliveredAt: {
        //
    },
    createdAt: {
        //timestamps
    },
    updatedAt: {
        //timestamps
    },
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);


OrderSchema.methods.publicData = function(){
    return{
        User = this.User,
        OrderItems = this.OrderItems,
        ShippingAddress = this.ShippingAddress,
        paymentMethod = this.paymentMethod,
        totalPrice = this.totalPrice,
        shippingPrice = this.shippingPrice,
        isPaid = this.isPaid,
        paidAt = this.paidAt,
        isDelivered = this.isDelivered,
        deliveredAt = this.deliveredAt,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
    };
};
