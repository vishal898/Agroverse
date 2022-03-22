const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    startDate:{
		type: Date,
		required: true,
	},
    cropId:{
        type:Schema.Types.ObjectId,
        ref:'Crop',
    },
    stage:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    parcels:[
        {
            type:Schema.Types.ObjectId,
            ref:'Parcel',
        },
    ],

});


const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo ;