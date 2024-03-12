const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "N@R@$!MH@"
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const adminmodel = require('../models/admin')

const otpStore = {}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function sendOtp(email , otp) {

    try {
        const transporter = nodemailer.createTransport({

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'pcmobt@gmail.com',
            pass: 'bdds qyep cuhh rkii'
        }
    });
    const info = await transporter.sendMail({
        from: {
            name: "Worker Management",
            address: "pcmobt@gmail.com"
        },
        to: {
            address: email
        },
        subject: 'Verify Account',
        html: `<h1>Your Otp to verify account of worker management is ${otp}</h1>`
    })
    if (info) {
        console.log(info.messageId);
        return true
    }
    } catch (error) {
        return error.message;
    }

    
}



router.post('/signup', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).send({success:false , error:"Enter valid details"})
        }
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await adminmodel.create({ name: capitalizeFirstLetter(name), email: email, mobile: mobile, password: hash })

        const token = jwt.sign(user.id, secret)
        return res.status(200).send({ token: token, success: true, name: user.name })
    }
    catch (e) {
        console.log(e.message);
        console.log(e.code);
        if (e.code === 11000) {
            return res.status(402).send({ error: "User already exists", success: false })
        }
        else {

            return res.status(500).send({ error: "Internal Server Error", success: false })
        }
    }

})
router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;
        let user = await adminmodel.findOne({ mobile: mobile })
        if (user === null) {
            return res.status(401).send({ error: "You Donot Have Account Please Sign Up", success: false })
        }
        const success = bcrypt.compareSync(password, user.password)
        if (success) {
            const token = jwt.sign(user.id, secret);
            return res.status(200).send({ token: token, success: true, name: user.name })
        }
        else {
            return res.status(401).send({ error: "Please Enter correct details", success: false })
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }

})


router.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        let user = await adminmodel.findOne({ email})
        console.log("user",user);
        if (!user) {
            return res.status(401).send({ error: "It seems like the email is wrong or you donot have an account!", success: false })
        }
        else {
            let otp = otpGenerator.generate(4 , {upperCaseAlphabets:false , lowerCaseAlphabets:false , specialChars:false , digits:true})
            console.log(otp , email);
            otpStore[email] = otp;
            let success = await sendOtp(email , otp)
            console.log(success);
            if (success==true) {
                return res.status(200).send({success:"Otp Sent to email"})
            }
            else{
                return res.status(400).send({error:"Please enter valid email or try again after sometime"})
            }
    }
           
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }
})


router.post('/verifyotp' , async(req,res)=>{
    try {
        const {email , otp  , password} = req.body;
        console.log(otpStore[email]);  
        if (!email || !otp || !password) {
            return res.status(400).send({error:"please enter Email and Otp" , success:false})
        }
        else if(otpStore[email]!=otp){
            return res.status(401).send({error:"Otp Doesnot Match" , success:false})
        }
        else if (otpStore[email]==otp) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const newpas = await adminmodel.updateOne({email:email} , {password:hash})
            delete otpStore[email]
            return res.status(200).send({success:true , data:"Password changed Sucessfully"})
        }
       else{
            return res.status(400).send({error:"some error occured" , success:false})
        }

    } catch (error) {
        return res.status(500).send({error:"Internal server error"})
    }
    

})


router.post('/justemail' , async(req,res)=>{
        const {email} = req.body;

        try {
            let user = await adminmodel.findOne({ email})
            if (user) {
                return res.status(200).send({success:false , error:"email already exists"})
            }
            let otp = otpGenerator.generate(4 , {upperCaseAlphabets:false , lowerCaseAlphabets:false , specialChars:false , digits:true})
            console.log(otp , email);
            otpStore[email] = otp;
            let success = await sendOtp(email , otp)
            console.log(success);
            if (success==true) {
                return res.status(200).send({success:true , data:"otp send to mail"})
            }
            else{
                return res.status(400).send({error:"Please enter valid email or try again after sometime"})
            }
        } catch (e) {
            return res.status(500).send({error:"Internal server error"})
        }
})

router.post('/justverify' , async(req,res)=>{
    
    try {

            const {email , otp  } = req.body;
            console.log(otpStore[email]);  
            if (!email || !otp ) {
                return res.status(400).send({error:"please enter Email and Otp" , success:false})
            }
            else if(otpStore[email]!=otp){
                return res.status(401).send({error:"Otp Doesnot Match" , success:false})
            }
            else if (otpStore[email]==otp) {
                delete otpStore[email]
                return res.status(200).send({success:true , data:"Otp Verified Sucessfully"})
            }
        } catch (e) {
            return res.status(500).send({error:"Internal server error"})
        }
})

module.exports = router