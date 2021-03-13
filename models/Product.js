const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Ingresa un nombre']
    },
    brand: {
        type: String,
        required: [true, 'Ingresa una Marca']
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        default: 'General'
    },
    price: {
        type: Number,
        default: 0.00
    },
    inStock: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);