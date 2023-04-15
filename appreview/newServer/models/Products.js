var mongoose = require('mongoose')

const products = 
{
    price:{
        required:true,
        type:Number,
    },
    name:{
        required:true,
        type:String,
    },
    description:{
        required:true,
        type:String
    },
    quantity:{
        required:true,
        type:Number
    },
    category:{
        required:true,
        type:String,
        default:"SEM CATEGORIA",
        enum:["SEM CATEGORIA","dematologico","banho","pomada","capsula","bomba"]
    }
}

const productsSchema = new mongoose.Schema(products)


const Product = mongoose.model('Products',productsSchema)

module.exports = Product