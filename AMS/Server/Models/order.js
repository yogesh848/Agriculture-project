const express = require('express');
const { getProduct } = require('./productsDetails');
const { createOrder } = require('./orderDetails');
const router = express.Router();


router.route('/order').post(createOrder);
module.exports=router;
