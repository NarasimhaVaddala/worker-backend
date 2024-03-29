const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bd = require('body-parser')
const db = require('./db')
const nodemailer = require('nodemailer')
const PORT = process.env.PORT;

app.use(bd({extended:true}))
app.use(cors())


app.use('/api/worker' , require('./routes/worker'))
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/payment' , require('./routes/paymentlog'))

router.get('/' , (req,res)=>{
    res.json({hi:"Hello"})
})




app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
})


