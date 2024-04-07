const mongoose = require('mongoose');

const TeacherSocketSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        socketID:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("teacherSocket",TeacherSocketSchema)