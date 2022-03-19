const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cropSchema = new Schema({

	userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    c1ropname:{
		type: String,
		required: true,
	},
	s1:{
        type:Number,
        required: true,
    },
	s2:{
        type:Number,
        required: true,
    },
	s3:{
        type:Number,
        required: true,
    },
	prodPer5:{
        type:Number,
        required: true,
    },
	demand:[Number], 
	supply:[Number], 
});


const Crop = mongoose.model('Crop',cropSchema);

module.exports = Crop ;
