const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price:String,
    description:String,
    rating:String,
    images : [
        {
            image:String
        }
    ],
    category:String,
    seller:String,
    stock:String,
    numofreviews:String,
    createat:Date
})
const productmodel = mongoose.model('Product',productSchema)
 module.exports=productmodel;