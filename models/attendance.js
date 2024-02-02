const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    user_id: {
        type: String,
        required:true
    }
    ,
    advance: {
        type: Number,
        required:true,
        default: 0
    }
    ,
    time: {
        type: Number,
        default: 0,
        required:true
    }, 
    date:{
        type:String,
        // required:true,
        
        
    }
})

module.exports = new mongoose.model("attendance", attendanceSchema)