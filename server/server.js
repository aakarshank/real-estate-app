const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/db')

const UserSchema = require('./Property');
const User = require('../client/src/User');
const { response } = require('express');



/*
corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
}
*/

//app.use(cors(corsOptions))
app.use(cors())
app.post('/api',(req,res)=>{
    const property = new UserSchema({username:req.body.currentUser,userProperties:{price: req.body.propertyPrice, beds:req.body.propertyBeds, baths: req.body.propertyBaths, status: req.body.propertyStatus,image:req.body.propertyImage}})
    property.save().then(()=>{
        console.log('property saved '+ property);
        res.send({
            status:'success'
        })
    })
})  

app.get('/query/:user',(req,res)=>{
    UserSchema.find({username:req.params.user}).then((properties)=>res.json(properties));
})
app.listen(3001)