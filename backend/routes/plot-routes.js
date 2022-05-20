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




router.get('/getPlotById/:uid',async(req,res)=>{
    console.log("getPlot");
    uid=req.params.uid;
    console.log(uid);
    Plot.find({_id:uid},(err,data)=>{
        if(err)throw error;
        res.json(data);
        // console.log(data);
    });
});











const inf = -1000;
// let feild = [];
let feild = [0,4,1,5,2,4,3,2,1,3,2,1,5,2,4,3,2,1,3,2];
let dis = 0;

const  compareFun = (a1,a2) =>
{
    let s1 =  4 * a1.g + 2 * a1.y + 1 * a1.r ;
    let s2 =  4 * a2.g + 2 * a2.y + 1 * a2.r ;

    if (s1 > s2) {
        return a1;
    } else {
        return a2;
    }
}

const make_obj = (m,n,o,a) => {
    let obj = {g:m, y:m,r:o ,v:a};
    return obj;
}

const solve = (n,reqCnt,reqGap) => {
    if (n <= 0 && reqCnt > 0){
        return make_obj(inf,inf,inf,[]);
    }
    if (n <= 0){
        return make_obj(0,0,0,[]);
    }

    if (reqGap > 0 && feild[n] == 4){
        return make_obj(inf,inf,inf,[]);
    }

    if (reqCnt <= 0 && reqGap > 0){
        return solve(n - 1, reqCnt, reqGap - 1);
    }

    if (reqCnt <= 0){
        return make_obj(0,0,0,[]);
    }
    
    if (feild[n] == 4){
        return solve(n - 1, reqCnt, dis);
    }

    if (reqGap > 0 || feild[n] == 5){
        return solve(n - 1, reqCnt, Math.max(0, reqGap - 1));
    }

    let ans = make_obj(inf,inf,inf,[]);

    if (feild[n] == 3)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.r++;
        a1.v.push(n);
        ans = compareFun(a1, a2);
    }

    if (feild[n] == 2)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.y++;
        a1.v.push(n);
        ans = compareFun(a1, a2);
    }

    if (feild[n] == 1)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.g++;
        a1.v.push(n);
        ans = compareFun(a1, a2);

    }
    return ans;
}

const  main = (n,reqCnt,dis) =>{
    
    //let field = [4,1,5,2,4,3,2,1,3,2];
    // for (let i=0; i<n; i++) feild.push(0);
    console.log(...feild);
    
    let finalAns = solve(n, reqCnt, 0);
    
    console.log(finalAns);
    if (finalAns.g < 0 || finalAns.y < 0 || finalAns.r< 0)
        return 0;
        
    //console.log(...finalAns.v);
    return finalAns.v;
}









router.get('/getPermutation/:plotId/:todoId/:q',(req,res)=>{

    const NID = req.params.plotId;
    const todoId=req.params.todoId;
    console.log(NID);
    Plot.find({_id:NID},(err,plot)=>{

        
     const array=plot.parcels;
     const sz=plot.parcelCnt;
     var ans=[];
     ans.push(0);


     Todo.find({_id:todoId},(err,todo)=>{
        
        // console.log(data);
        var cropId=todo.cropId;
    
        var q=todo.quantity;



     for(var i=0;i<array.length;i++)
     {  
            var par=array[i];

            Parcel.find({_id:par},(err,parcel)=>{

                var prev1=parcel.prev1;
                var prev2=parcel.prev2;
                var till=parcel.till;

                if(till>=new Date())
                {
                    if(parcel.current==cropId)
                        ans.push(4);
                    else
                        ans.push(5);
                }
                else
                {
                    if(prev1!=cropId && prev2!=cropId)
                        ans.push(1);
                    else if(prev1!=cropId && prev2==cropId)
                        ans.push(2);
                    else
                        ans.push(3);
                }


            });
     }






        let reqCnt=4;





        var acAns=[];
        for(var j=0;j<feild.length;j++)
        {

                inf = -1000;
                
                feild =ans;
                dis = 0;

                const x=main(feild.length-1,reqCnt,acAns);

                for (let i = 0; i < x.length; i++) {
                    feild[x[i]]=6; 
                }
                acAns.push(feild);
        }


     
            res.send(acAns);
        });    
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

    // newPlot.save();




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
        res.json(`added`);
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



