const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type:String,
        required: [true, "Ingrese un método de pago"],
    },
    totalPrice: { 
        type: Number,
        required: true,
        default: 0.0
     },
    shippingPrice: { 
        type: Number,
        required: true
     },
    isPaid: { 
        type: Boolean,
        default: false
     },
    paidAt: {
        type: Date,
        default: ''
    },
    isDelivered: { 
        type: Boolean,
        required: true,
        default: false
     },
    deliveredAt: {
        type: Date,
        default: ''
    },
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);