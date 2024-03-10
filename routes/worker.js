const express = require('express')
const router = express.Router()
const isLogin = require('../middleware/isLogin')
const workermodel = require('../models/worker')



router.post('/addnewworker', isLogin, async (req, res) => {
    try {
        const { name, mobile, designation, rate } = req.body;
        let adminid = req.user;
        const newWorker = await workermodel.create({ name, mobile, designation, rate , adminid })
        console.log("newWorker : " , newWorker);
        return res.status(200).send({ success: true, worker: newWorker })
    }
    catch (e) {
        console.log(e.message);
        console.log(e.code);
        if (e.code === 11000) {
            return res.status(400).send({ error: "Worker already exists", success: true })
        }
        else {

            return res.status(500).send({ error: "Internal Server Error", success: false })
        }
    }

})



router.get('/fetchallworkers', isLogin, async (req, res) => {
    try {
        let adminid = req.user;
        const workerlist = await workermodel.find({adminid});
        console.log(workerlist);
        return res.status(200).send({ workerlist, success: true })
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", success: false })
    }

})


router.delete('/deleteworker', isLogin, async (req, res) => {
    try {
        const { id } = req.body;
        let adminid = req.user;
        const deletedworker = await workermodel.deleteOne({ _id: id , adminid:adminid})
        console.log("deletedworker : ", deletedworker);
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
        console.log("editedWorker : ", editedWorker );
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
        console.log(editedWorker);
    } catch (e) {
        console.log(e.message);
        return res.status(400).send({ error: "Something went wrong", success: false })
    }
})

router.post('/getatt' , isLogin , async(req,res)=>{
try {
        const {id } = req.body;
        const attendance = await workermodel.findOne({_id : id})
        console.log(attendance.attendance);
       return res.status(200).send({success:true , attendance:attendance.attendance})
} catch (error) {
    return res.status(400).send({ error: "Something went wrong", success: false })
}
})


router.post('/deleteatt' , isLogin , async(req,res)=>{
    try {
        const {id } = req.body;
        const delatt = await workermodel.updateOne({_id:id}, {$pull:{attendance:{}}});
        console.log(delatt);
        res.status(200).send({success:true , delatt})
    } catch (e) {
        console.log(e.message);
        return res.status(400).send({ error: "Something went wrong", success: false })
    }
})
module.exports = router