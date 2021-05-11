const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },

    lastname:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        // match: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    },
    password:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },
    classnumber:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('teacherdb',signUpTemplate)