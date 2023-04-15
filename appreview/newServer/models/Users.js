const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address:{
        type:String,
    },
    age:{
        type:Number
    },
    income:{
        type:String,
        enum:["nao informar","ate 2000","ate 5000","ate 10000","ate 20000","mais de 20000"],
        default:"nao informar"
    }
})  

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema)


module.exports = User
