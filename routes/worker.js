const express = require('express')
const router = express.Router()
const isLogin = require('../middleware/isLogin')
const workermodel = require('../models/worker')
router.post('/addnewworker', isLogin, async (req, res) => {
    try {
        const { name, mobile, designation, rate } = req.body;
        const newWorker = await workermodel.create({ name, mobile, designation, rate })
        return res.status(200).send({ success: true, workerid: newWorker.id })
    }
    catch (e) {
        console.log(e.message);
        console.log(e.code);
        if (e.code === 11000) {
            return res.status(402).send({ error: "Worker already exists", success: true })
        }
        else {

            return res.status(500).send({ error: "Internal Server Error", success: false })
        }
    }

})



router.get('/fetchallworkers', isLogin, async (req, res) => {
    try {
        const workerlist = await workermodel.find();
        return res.status(200).send({ workerlist, success: true })
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }

})


router.delete('/deleteworker', isLogin, async (req, res) => {
    try {
        const { id } = req.body;
        const deletedworker = await workermodel.deleteOne({ _id: id })

        return res.status(200).send({ success: true, deletedworker })
    } catch (e) {
        console.log(e.message);
        return res.status(400).send({ error: "Something went wrong", success: false })
    }
})

router.put('/editworker', isLogin, async (req, res) => {
    try {
        const { id, name, designation, mobile, rate } = req.body;
        const editedWorker = await workermodel.findByIdAndUpdate(id, { name, designation, mobile, rate });
        return res.status(200).send({ success: true, editedWorker })
    } catch (e) {
        console.log(e.message);
        return res.status(400).send({ error: "Something went wrong", success: false })
    }

})

router.put('/takeattendance/:id' , isLogin , async(req,res)=>{
        try {
            const {time , advance , date} = req.body;
            const id = req.params.id;
            
            const editedWorker = await workermodel.updateOne({_id:id}, {$push:{attendance:{time , advance , date}}});
            return res.status(200).send({ success: true, editedWorker })
        } catch (e) {
            console.log(e.message);
            return res.status(400).send({ error: "Something went wrong", success: false })
        }
})

module.exports = router