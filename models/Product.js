const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingresa un nombre'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        default: 'General',
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Ingresa un precio']
    },
    inStock: {
        type: Number,
        required: [true, 'Ingresa una cantidad en stock'],
        min: 0,
        max: 500
    },
    image: {
        type: String,
        trim: true,
        default: 'https://i.ibb.co/Jv17Vfy/default.jpg'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);