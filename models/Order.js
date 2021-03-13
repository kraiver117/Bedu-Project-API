const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    OrderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    address: {
        type: String,
        required: [true, 'Ingresa tu direccion']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Ingresa un metodo de pago']
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isPaidAt: {
        type: Date,
        default: Date.now()
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    }
    
});

module.exports = mongoose.model('Order', OrderSchema)

// class Order {
//     constructor(User, OrderItems, ShippingAddress, paymentMethod, 
//                 totalPrice, shippingPrice, isPaid, paidAt, isDelivered,
//                 deliveredAt, createdAt, updatedAt)
//     {
//         this.User = User;
//         this.OrderItems = OrderItems;
//         this.ShippingAddress = ShippingAddress;
//         this.paymentMethod = paymentMethod;
//         this.totalPrice = totalPrice;
//         this.shippingPrice = shippingPrice;
//         this.isPaid = isPaid;
//         this.paidAt = paidAt;
//         this.isDelivered = isDelivered;
//         this.deliveredAt = deliveredAt;
//         this.createdAt = createdAt; // no
//         this.updatedAt = updatedAt;// no
//     }

//     createOrder() {}
//     deleteOrder() {}
//     updateOrder() {}
//     getOrders() {}
    
// }

// module.exports = Order;