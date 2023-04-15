const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')

const afilliate = {
   cnpj:{
    required:true,
    type:Number
   },
   endereco:{
    lat:{
        required:true,
        type:Number
        },
    lng:{
        required:true,
        type:Number
        }
   },
   nome:{
    required:true,
    type:String
   },
   telefone:{
    required:true,
    type:Number
   },
   email:{
    required:true,
    type:String
   },
   funcionarios:{
    required:true,
    type:mogoose.Schema.Types.ObjectId,
    ref:"User"
   },
   products:{
    required:true,
    type:mogoose.Schema.Types.ObjectId,
    ref:"Products"
   }
   
}

const afilliateSchema = new mongoose.Schema(Afilliate)

const Afilliates = mongoose.model(afilliateSchema)

module.exports = Afilliates