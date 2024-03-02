const mongoose = require('mongoose')

const paymentlog = mongoose.Schema({
    adminid:{type:String ,  required:true},
    name:{type:String ,required:true},
    id:{type:String, required:true},
    mobile:{type:String, required:true},
    date:{type:String, required:true},
    paidamount:{type:Number , required:true},
    workedamount:{type:Number , required:true},
    advance:{type:Number , required:true},
    fromdate :{type:String },
     todate:{type:String },
})

module.exports = mongoose.model('paymentlog' , paymentlog)