const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/labour').then(()=>console.log("Connected To Database")).catch((e)=>console.log(e.message))

module.exports = mongoose



