const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: Number,
  status: String,
}, { timestamps: true });

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
