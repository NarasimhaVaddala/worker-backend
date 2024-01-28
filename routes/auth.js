const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "N@R@$!MH@"

const adminmodel = require('../models/admin')

router.post('/signup', async (req, res) => {
    try {
        const { name, mobile, password } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await adminmodel.create({ name: name, mobile: mobile, password: hash })
     
        const token = jwt.sign(user.id, secret)
        return res.status(200).send({ token: token, success: true })
    }
    catch (e) 
    {
        console.log(e.message);
        console.log(e.code);
        if (e.code === 11000) {
            return res.status(402).send({ error: "User already exists", success: true })
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
        if (user === null) 
        {
            return res.status(401).send({ error: "You Donot Have Account Please Sign Up", success: true })
        }
        const success = bcrypt.compareSync(password, user.password)
        if (success) {
            const token = jwt.sign(user.id, secret);
            return res.status(200).send({ token: token, success: true })
        }
        else {
            return res.status(401).send({ error: "Please Enter correct details", success: true })
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }

})

module.exports = router