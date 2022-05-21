const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require("../models/plot");
const Plot = require('../models/plot');
const User = require('../models/user');
const Parcel = require('../models/parcel');
const Todo = require('../models/todo');
const Crop = require('../models/crop');


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











let inf = -1000;
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

const  main = (n,reqCnt) =>{
    
    //let field = [4,1,5,2,4,3,2,1,3,2];
    // for (let i=0; i<n; i++) feild.push(0);
    console.log(...feild);
    
    let finalAns = solve(n, reqCnt, 0);
    
    console.log(finalAns);
    if (finalAns.g < 0 || finalAns.y < 0 || finalAns.r< 0)
        return [];
        
    //console.log(...finalAns.v);
    return finalAns.v;
}









router.get('/getPermutation/:plotId/:todoId/:qT',async(req,res)=>{

    const NID = req.params.plotId;
    const todoId=req.params.todoId;
    const qT=parseInt(req.params.qT);
    console.log("getPermutations");
    // console.log(NID);
    // console.log(todoId);
    // console.log(req.params.qT);
    Plot.findOne({_id:NID},(err,plot)=>{
    //console.log(plot);
        
     let arrayi=plot.parcels;
     //console.log(arrayi);
     let sz=plot.parcelCnt;
     //console.log(sz);
     let ansa=[];
     ansa.push(0);
        

     Todo.findOne({_id:todoId},async(err,todo)=>{
        
        // console.log(data);
        let cropId=todo.cropId;
        console.log(cropId);
        let q=parseInt(todo.quantity);


        for(let i=0;i<arrayi.length;i++)
        {  
                
                const parcel = await Parcel.findOne({_id:arrayi[i]})
                    console.log(arrayi[i]);
                    let prev1=parcel.prev1;
                    let prev2=parcel.prev2;
                    let till=parcel.till;
                    console.log(till);

                
                    var date11=new Date();

                    var total_seconds = (till-date11) / 1000;  
                    
                    //calculate days difference by dividing total seconds in a day  
                    var day1 = Math.floor (total_seconds / (60 * 60 * 24));  
                    console.log(day1);



                    if(day1>1)
                    {
                        console.log(parcel.current);
                        console.log(cropId);
                        if(parcel.current.equals(cropId._id))
                            ansa.push(4);
                        else
                            ansa.push(5);
                    }
                    else
                    {
                        if((prev1!=cropId) && (prev2!=cropId))
                            ansa.push(1);
                        else if((prev1!=cropId) && (prev2==cropId))
                            ansa.push(2);
                        else
                            ansa.push(3);
                    }


                
        }
                console.log(ansa);
                let yyy=ansa;

     Crop.findOne({_id:cropId},(err,crop)=>{
        console.log(".....");
        
        
        let x=parseInt(crop.prodPer5);
        console.log(x);
        let plantReq=(5*qT)/x;
        let areaPer5=parseInt(crop.areaPer5);

        let areaT=(plantReq*areaPer5)/5;
        let oneP=parseInt(plot.parcelLength)*parseInt(plot.parcelWidth);

        let reqCnt=Math.ceil(areaT/oneP);


        console.log(reqCnt);


        var acAns=[];
        console.log(ansa);
        
        for(let j=0;j<yyy.length;j++)
        {
                inf = -1000;
               // console.log(yyy);
                feild =[...yyy];
                dis = j;

                const x=main(feild.length-1,reqCnt);
                //console.log(reqCnt);
                //console.log(x);

                for (let i = 0; i < x.length; i++) {
                    feild[x[i]]=6;
                    //console.log(parseInt(x[i])); 
                }
                //console.log(sz);

                if(feild.length===(sz+1))
                     acAns.push(feild);
        }


        res.send(acAns);
           
           // res.send("done");
        });  });  
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



