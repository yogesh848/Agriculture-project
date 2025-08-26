const mongoose= require('mongoose');

 
const orderSchema= new mongoose.Schema({

    cartItems:Array,
    amount:Number,
    status:String,
    createdat:Date
})
const orderModel = mongoose.model('order',orderSchema)
module.exports=orderModel