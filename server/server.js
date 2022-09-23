const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/db')

const Property = require('./Property');
const User = require('../client/src/User');



/*
corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
}
*/

//app.use(cors(corsOptions))
app.use(cors())
app.post('/api',(req,res)=>{
    const property = new Property({price: req.body.propertyPrice, beds:req.body.propertyBeds, baths: req.body.propertyBaths, status: req.body.propertyStatus,image:req.body.propertyImage})
    property.save().then(()=>console.log('property saved '+ property))
})  

app.get('/query',(req,res)=>{
    Property.find().then((properties)=>res.json(properties));
})
app.listen(3001)