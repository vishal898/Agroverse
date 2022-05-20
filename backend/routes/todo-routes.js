const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require("../models/todo");
const Crop = require('../models/crop');
const User = require('../models/user');
const Todo = require('../models/todo');
const Parcel = require("../models/parcel");
const Plot = require('../models/plot');


router.get('/getTodoS1',async(req,res)=>{
    const uid=req.user._id;
    //const uid=req.params.uid;
    console.log(uid);
   
    Todo.find({userId:uid}).populate('cropId').exec((err,data)=>{
        if(err)throw error;

        var filtered = data.filter(function(todo) {

            let date2 = new Date();
            let date1= todo.startDate;
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays + " days");
        
             return (diffDays<=1 && todo.stage==1); 
        });

        res.json(filtered);
        console.log(filtered)
    });
});

router.get('/getTodoS2',async(req,res)=>{
    const uid=req.user._id;
    //const uid=req.params.uid;
    console.log(uid);
    
    Todo.find({userId:uid}).populate('cropId').exec((err,data)=>{
        if(err)throw error;

        var filtered = data.filter(function(todo) {

            let date2 = new Date();
            let date1= todo.startDate;
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays + " days");
        
             return (diffDays<=1 && todo.stage==2); 
        });

        res.json(filtered);
        console.log(filtered)
    });
});

router.get('/getTodoS3',async(req,res)=>{
    const uid=req.user._id;
    //const uid=req.params.uid;
    console.log(uid);
    
    Todo.find({userId:uid}).populate('cropId').exec((err,data)=>{
        if(err)throw error;

        var filtered = data.filter(function(todo) {

            let date2 = new Date();
            let date1= todo.startDate;
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays + " days");
        
             return (diffDays<=1 && todo.stage==3); 
        });

        res.json(filtered);
        console.log(filtered)
    });
});











// post create 
router.post('/todo',(req,res)=>{
    

    console.log("in create todo");
    const userId = req.user._id;
    // const userId=req.params.uid;
    console.log(userId);
    
    var dateD = new Date ("Jan 01, 2000, 00:00:01");  
    var date11=new Date();

    var total_seconds = Math.abs(date11 - dateD) / 1000;  
    console.log(total_seconds);
    //calculate days difference by dividing total seconds in a day  
    var day1 = Math.floor (total_seconds / (60 * 60 * 24));  
    day1%=366;
    

    User.findById(userId,(err,user)=>{
        
        
        for(var i=0;i<user.crops.length;i++)
        {
            var thisCrop=user.crops[i];
            console.log(thisCrop);
            Crop.findById(thisCrop,(err,crop)=>{
                
                console.log(crop);
                var s1=crop.s1;
                var s2=crop.s2;
                console.log(s1);
                day1=day1+s1+s2;
                day1%=366;
                if(crop.demand[day1]-crop.supply[day1]>0)
                {
                    var qua=crop.demand[day1]-crop.supply[day1];
                    const newTodo = new Todo({
                        userId:userId,
                        startDate:new Date(),
                        cropId:thisCrop,
                        stage:1,
                        quantity:qua,
                    });

                    newTodo.save();
                    user.todos.push(newTodo._id);
                    user.save();
                }
  
            });
        }
    });
    res.json(`added`);
});



router.post('/updateTodoS1/:idA',(req,res)=>{

      let id = req.params.idA;
      console.log(id);
      Todo.findById(id, (err, todos)=> {
      if (err){
        console.log(err);
      }
      else{
        
        var cropId=todos.cropId;
        var s1=0;
        var q=todos.quantity;

        Crop.findById(cropId, (err, crop)=> {
            if (err){
              console.log(err);
            }
            else{
              s1=crop.s1;
              s2=crop.s2;
              s3=crop.s3;


                var dateD = new Date ("Jan 01, 2000, 00:00:01");  
                var date11=new Date();

                var total_seconds = Math.abs(date11 - dateD) / 1000;  
                console.log(total_seconds);
                //calculate days difference by dividing total seconds in a day  
                var day1 = Math.floor (total_seconds / (60 * 60 * 24));  
                day1%=366;
                var day2=day1;
                day1=day1+s1+s2;
                day2=day1+s1+s2+s3;
                day1%=366;
                day2%=366;

                if(day1<=day2)
                {
                    for(var i=day1;i<=day2;i++)
                        crop.supply[i]+=q;
                }
                else
                {
                    for(var i=day1;i<=365;i++)
                        crop.supply[i]+=q;
                    for(var i=0;i<=day2;i++)
                        crop.supply[i]+=q;

                }
                crop.save();
          }
        });

        var nd = new Date();
        nd.setDate(nd.getDate() + s1);

        todos.startDate=nd;
        todos.stage=2;
        todos.save();
      }
        res.json(`updated`);
    });
    
});










router.post('/updateTodoS2/:idA/:plotId/:q',(req,res)=>{

  let id = req.params.idA;
  console.log(id);
  const feild=req.body.feild;
  let plotId=req.params.plotId;
  let q=req.params.q;

  console.log(feild);

  


  Todo.findOne({_id:id},(err,todos)=>{
  if (err){
    console.log(err);
  }
  else{
    console.log(todos);
    var cropId=todos.cropId;
    var qTotal=todos.quantity;

    Crop.findOne({_id:cropId},(err,crop)=>{
      let s2=crop.s2;
      let s3=crop.s3;

    Plot.findOne({_id:plotId},(err,plot)=>{
        if (err){
          console.log(err);
        }
        else{
          

          for(var i=0;i<feild.length-1;i++)
          { 
              let z=plot.parcels[i];
              console.log(z);
              if(feild[i+1]==6)
              {
                Parcel.findOne({_id:plot.parcels[i]},(err,parcel)=>{
          
                      if (err){
                        console.log(err);
                      }
                      else{
                        console.log(parcel);
                          parcel.prev2=parcel.prev1;
                          parcel.prev1=parcel.current;

                          parcel.current=cropId;
                          var result = new Date();
                          result.setDate(result. getDate() + s2+s3);
                          parcel.till=result;
                          
                          todos.parcels.push(plot.parcels[i]);
            
                          parcel.save();
                    }
                  });
              }

          }
      }
      

      todos.quantity=parseInt(todos.quantity)-q;
      console.log(todos.quantity);
      if(todos.quantity<=0)
      {

      

          var nd = new Date();
          nd.setDate(nd.getDate() + s2+s3);

          todos.startDate=nd;
          todos.stage=3;
          q=parseInt(q);
      }

    todos.save();

  });
  
    res.json(`updated`);
});
  }

  });
});


router.post('/updateTodoS3/:idA',(req,res)=>{

  let id = req.params.idA;
  console.log(id);
  
  Todo.findOne({_id:id},(err,todos)=>{
  if (err){
    console.log(err);
  }
  else{
 
         
          todos.stage=4;
          res.send(todos.parcels);
          todos.save();
    }
  });
  
    
});






















module.exports = router ;