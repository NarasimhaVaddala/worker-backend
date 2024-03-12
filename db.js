const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.DB_SECRET).then(()=>console.log("Connected To Database")).catch((e)=>console.log(e.message))

module.exports = mongoose



