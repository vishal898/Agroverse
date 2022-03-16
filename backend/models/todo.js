const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    farmerId:{
        type:Schema.Types.ObjectId,
        ref:'Farmer',
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
});


const Todo = mongoose.model('Todo',noteSchema);

module.exports = Todo ;