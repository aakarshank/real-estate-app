const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    price:String,
    beds:Number,
    baths:Number,
    status: String,
    image:String
})

module.exports = mongoose.model('Property',propertySchema)  