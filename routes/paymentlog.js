const express = require('express')
const router = express.Router()
const isLogin = require('../middleware/isLogin')
const paymentLog = require('../models/paymentlog')

router.post('/paymentlog' , isLogin , async(req,res)=>{
    try {
        const {name , id , mobile , date , paidamount , workedamount , advance , fromdate , todate} = req.body;
        const paymentlog =  await paymentLog.create({name , id , mobile , date , paidamount , workedamount , advance, fromdate , todate})
        return res.status(200).send({success:true , paymentlog:paymentlog})


    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: "Internal Server Error", success: false })
        
    }
    

})

router.get('/paymenthistory' , isLogin , async(req,res)=>{
    try {
        const paymentlog = await paymentLog.find({});
        return res.status(200).send({success:true , paymentlog:paymentlog})
    } catch (error) {
        
        console.log(error.message);
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }
})

module.exports = router;