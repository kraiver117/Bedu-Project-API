class Order {
    constructor(User, OrderItems, ShippingAddress, paymentMethod, 
                totalPrice, shippingPrice, isPaid, paidAt, isDelivered,
                deliveredAt, createdAt, updatedAt)
    {
        this.User = User;
        this.OrderItems = OrderItems;
        this.ShippingAddress = ShippingAddress;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.shippingPrice = shippingPrice;
        this.isPaid = isPaid;
        this.paidAt = paidAt;
        this.isDelivered = isDelivered;
        this.deliveredAt = deliveredAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    createOrder() {}
    deleteOrder() {}
    updateOrder() {}
    getOrders() {}
    
}

module.exports = Order;