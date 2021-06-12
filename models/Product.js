const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

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
    reviews: [
        ReviewSchema
    ],
    numReviews: {
        type: String,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
        default: 0
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