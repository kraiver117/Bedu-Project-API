const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Ingresa un nombre'],
        trim:true,
        unique: true
    },
    brand: {
        type: String,
        required: [true, 'Ingresa una Marca'],
        trim:true
    },
    description: {
        type: String,
        trim:true 
    },
    category: {
        type: String,
        default: 'General',
        trim:true
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
        type: String,
        default: 'https://i.ibb.co/Jv17Vfy/default.jpg'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);