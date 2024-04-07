const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        subjects:{
            type:Array,
            required:true
        },
        rating:{
            type:Number
        },
        ratingCount:{
            type:Number
        },
        clientHistory:{
            type:Array
        },
        available:{
            type:Boolean,
        }
        ,
        callingId:{
            type:String
        }
    }
)

module.exports = mongoose.model("Mentor",MentorSchema)