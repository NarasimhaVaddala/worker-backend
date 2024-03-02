const mongoose = require('mongoose')

const admin = mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        mobile:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
                type:String,
                required:true,
        }
})

const adminmodel = new mongoose.model('admins' , admin)



module.exports = adminmodel ;


