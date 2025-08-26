const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Farmer = mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer;
