const mongoose  = require("mongoose")
const genarate = require("../helpers/generate")

const accountSchema = new mongoose.Schema(
  {
    fullname : String,
    email : String ,
    password : String,
    token : {
        type : String,
        default : genarate.generateRandomString(20)
    } ,
    phone : String ,
    avatar : String ,
    role_id :String,
    Status : String,
    deleted : {
      type : Boolean ,
      default : false
    },
    deletedAt : Date

  },{
    timestamps : {
      createdAt : true
    }
  }) ;
const Account = mongoose.model('Product', productSchema ,"accounts")

module.exports = Account