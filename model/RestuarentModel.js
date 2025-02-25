const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
})
const RestaurentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    menu:[MenuSchema]
})
 

module.exports = mongoose.model('Restaurent',RestaurentSchema)

