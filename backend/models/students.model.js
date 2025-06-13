const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college_roll:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    sem:{
        type: String,
        required:true
    },
    foodType: {
        type: String,
        required: true
    },

})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;