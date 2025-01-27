const { uniq } = require('lodash');
const mongoose=require('mongoose');
const User=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        validate:{
        validator:function(v){
            return /^\d{10}$/.test(v);
        },
        message:"Invalid phone number!",
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:{
        validator:function(v){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
        },
        message:"Invalid email address!",
        },
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    termsAccepted:{
        type:Boolean,
        required:true,
        default:false,
    },
});
const UserModel=mongoose.model('User',User);
module.exports=UserModel;