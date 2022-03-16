const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cropSchema = new Schema({

	farmerId:{
        type:Schema.Types.ObjectId,
        ref:'Farmer',
    },
    cropname:{
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
	demand:[Number,366],
	supply:[Number,366],
});


const Crop = mongoose.model('Crop',cropSchema);

module.exports = Crop ;
