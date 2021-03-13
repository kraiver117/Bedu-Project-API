const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const uniqueValidator = require("mongoose-unique-validator");

const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "no puede estar vacío"],
        index = true,
    },
    OrderItems: {
        type: String,
        required: [true, "no puede estar vacío"],

    },
    ShippingAddress: {
        type: String,
        required: [true, "no puede estar vacío"], 
    },
    paymentMethod: {
        required: [true, "no puede estar vacío"],
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
