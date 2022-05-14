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
    const {cropname,s1,s2,s3,prodPer5,areaPer5} = req.body;
    const userId = req.user._id;

    
    var tmp=Array(366).fill(0);
    const newCrop = new Crop({
		userId:userId,
        cropname:cropname,
        s1:s1,
        s2:s2,
        s3:s3,
        prodPer5:prodPer5,
        areaPer5:areaPer5,
        demand:tmp,
        supply:tmp,

	});

    console.log(newCrop);
    newCrop.save();


    User.findById(userId,(err,user)=>{
        user.crops.push(newCrop._id);
        console.log(newCrop._id);
        user.save();
        res.json(`added`);
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





// add demand 
router.post('/addDemand',(req,res)=>{
    
    console.log(req.body);
    console.log("in add demand");
    const {date1,date2,cropId,q} = req.body;

    Crop.findById(cropId,(err,crop)=>{
      
        var dateD = new Date ("Jan 01, 2000, 00:00:01");  


        const [year1,month1,day11] = date1.split('-');
        var date11=new Date([month1, day11, year1].join('/'));
        const [year2,month2,day22] = date2.split('-');
        var date22=new Date([month2, day22, year2].join('/'));


        //calculate total number of seconds between two dates
        console.log(date11);  
        console.log(dateD);  

        var total_seconds = Math.abs(date11 - dateD) / 1000;  
        console.log(total_seconds);
        //calculate days difference by dividing total seconds in a day  
        var day1 = Math.floor (total_seconds / (60 * 60 * 24));  
        day1%=366;

        console.log(day1);
       



        total_seconds = Math.abs(date22 - dateD) / 1000;  
        //calculate days difference by dividing total seconds in a day  
        var day2 = Math.floor (total_seconds / (60 * 60 * 24));  
        day2%=366;
        console.log(day2);

        if(day1<=day2)
        {
            for(var i=day1;i<=day2;i++)
            {
                var x=crop.demand[i];
                x=parseInt(x);
                var z=parseInt(q);
                x=x+z;
                crop.demand[i]=x;
            }
        }
        else
        {
            var x=crop.demand[i];
            x=parseInt(x);
            var z=parseInt(q);
            x=x+z;
            for(var i=day1;i<=365;i++)
                crop.demand[i]=x;
            for(var i=0;i<=day2;i++)
                crop.demand[i]=x;

        }
        crop.save();
        console.log("demand added successfully");
        res.json(`demand added`);
    });
});



module.exports = router ;