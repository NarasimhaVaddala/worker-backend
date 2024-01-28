const express = require('express')
const app = express()
const cors = require('cors')
const bd = require('body-parser')
const PORT = 3000;
const db = require('./db')

app.use(bd({extended:true}))
app.use(cors())


app.use('/api/worker' , require('./routes/worker'))
app.use('/api/auth' , require('./routes/auth'))

app.get('/' , (req,res)=>{
    res.json({hi:"Hello"})
})


app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
})
