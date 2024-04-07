const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        branch:{
            type:String,
        },
        clientHistory:{

        },
        callingId:{
            
        }
    }
)

module.exports = mongoose.model("Student",StudentSchema)