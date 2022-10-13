const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    price:String,
    beds:Number,
    baths:Number,
    status: String,
    image:String
})

const userSchema = new mongoose.Schema({
    username:String,
    userProperties:propertySchema
})


module.exports = mongoose.model('UserSchema',userSchema)  