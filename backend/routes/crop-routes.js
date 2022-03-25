const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require("../models/crop");
const Crop = require('../models/crop');
const User = require('../models/user');


// get read 
router.get('/getAllCrops',async(req,res)=>{
    console.log("getCrop");
    const uid=req.user._id;
    console.log(uid);
    Crop.find({userId:uid},(err,data)=>{
        if(err)throw error;
        res.json(data);
        // console.log(data);
    });
});



// post create 
router.post('/createCrop',(req,res)=>{
    
    console.log(req.body);
    console.log("in create");
    const {cropname,s1,s2,s3,prodPer5} = req.body;
    const userId = req.user._id;

    
    var tmp=Array(366).fill(0);
    const newCrop = new Crop({
		userId:userId,
        cropname:cropname,
        s1:s1,
        s2:s2,
        s3:s3,
        prodPer5:prodPer5,
        demand:tmp,
        supply:tmp,
	});

    console.log(newCrop);
    newCrop.save();


    User.findById(userId,(err,user)=>{
        user.crops.push(newCrop._id);
        console.log(newCrop._id);
        user.save();
    });
});



// post delete 
router.post('/deleteCrop/:cropId',(req,res)=>{
    const NID = req.params.cropId;
    console.log(NID);
    Crop.findOneAndDelete({_id:NID},(err,data)=>{
        if(err)res.json(err);
        data.save();
        const userId=data.userId;
        User.findById(userId, (err, user)=> {
            if (err){
                console.log(`user - ${err}`);
            }else{
                user.crops.pull(NID);
                user.save();
            }
        })
        res.json(`DELETED ${NID}`);
    });
    console.log('hit delete api');
});

module.exports = router ;