const mongoose = require('mongoose')


const schema = {
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    designation:{
            type:String,
            required:true,
    },
    rate:{
        type:Number,
        required:true,
    },
    attendance:{
            type:Array,
            default:[]
    }
    

}
const workerSchema = mongoose.Schema(schema)

module.exports = mongoose.model('workers' , workerSchema)