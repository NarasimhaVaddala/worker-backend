const express = require('express')
const app = express()
const cors = require('cors')
const bd = require('body-parser')
const PORT = 3000;
const db = require('./db')
const nodemailer = require('nodemailer')

app.use(bd({extended:true}))
app.use(cors())


app.use('/api/worker' , require('./routes/worker'))
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/payment' , require('./routes/paymentlog'))

app.get('/' , (req,res)=>{
    res.json({hi:"Hello"})
})


app.get('/mail' ,  async(req,res)=>{

const transporter = nodemailer.createTransport({
 
  service:'gmail',
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    user: 'pcmobt@gmail.com',
    pass: 'Enter Code'
  }
});
const info = await transporter.sendMail({
    from:{
        name:"Worker Management",
        address:"pcmobt@gmail.com"
    },
    to:{
        address:'vaishnavivaddala@gmail.com'
    },
    subject:'lkaslkjals',
    html:"<h1>Your Otp to verify worker management is 11478523</h1>"
})

console.log(info.messageId);
})


app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
})
