const mongoose = require('mongoose')

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 



let UserSchema = new mongoose.Schema({
name:{type:String, required:true},
email:{type:String, required:true,validate:{validator:validateEmail,message:"invalid Email"}},
password:{type:String, required:true},
course:{type:String, default:"FSD"},
role:{type:String, default:"Student"},
status:{type:Boolean, default:true},
createAt:{type:Date,default:Date.now()}


},{versionKey:false})

let UserModel = mongoose.model('User',UserSchema)

module.exports={UserModel}