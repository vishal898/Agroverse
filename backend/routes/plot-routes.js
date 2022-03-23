const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require("../models/plot");
const Plot = require('../models/plot');
const User = require('../models/user');
const Parcel = require('../models/parcel');


// get read 
router.get('/getAllPlots',async(req,res)=>{
    console.log("getplots");
    const uid=req.user._id;
    console.log(uid);
    Plot.find({userId:uid},(err,data)=>{
        if(err)throw error;
        res.json(data);
        // console.log(data);
    });
});



// post create 
router.post('/createPlot',(req,res)=>{
    
    console.log(req.body);
    console.log("in create");
    const {plotname,parcelCnt,parcelLength,parcelWidth} = req.body;
    const userId = req.user._id;

    
    const newPlot = new Plot({
		userId:userId,
        plotname:plotname,
        parcelCnt:parcelCnt,
        parcelLength:parcelLength,
        parcelWidth:parcelWidth,
	});

    newPlot.save();




    for(let i=0;i<parcelCnt;i++)
    {

        const newParcel = new Parcel({
            userId:userId,
            plotId:newPlot._id,
            parcelNo:i+1,
            till:new Date(),
        });
        
        newParcel.save();

        newPlot.parcels.push(newParcel._id);
        newPlot.save();
    }

    
    User.findById(userId,(err,user)=>{
        user.plots.push(newPlot._id);
        console.log(newPlot._id);
        user.save();
    });
});



// post delete 
router.post('/deletePlot/:plotId',(req,res)=>{
    const NID = req.params.plotId;
   
    console.log(NID);
    Plot.findOneAndDelete({_id:NID},(err,data)=>{
        if(err)res.send(err);
        res.send(`DELETED ${NID}`);
        data.save();
        const userId=data.userId;
        User.findById(userId, (err, user)=> {
            if (err){
                console.log(err);
              }
              else{
            user.plots.pull(NID);
            user.save();}
        })
    });
   
    console.log('hit delete api');
});

module.exports = router ;



