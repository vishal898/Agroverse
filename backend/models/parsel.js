const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parcelSchema = new Schema({
    farmerId:{
        type:Schema.Types.ObjectId,
        ref:'Farmer',
    },
    parselNo:{
        type:Number,
        required:true,
    },
    prev2:{
        type:Schema.Types.ObjectId,
        ref:'Crop',
    },
    prev1:{
        type:Schema.Types.ObjectId,
        ref:'Crop',
    },
    current:{
        type:Schema.Types.ObjectId,
        ref:'Crop',
    },
    till:{
		type: Date,
		required: true,
	}
});


const Plot = mongoose.model('Parcel',parcelSchema);

module.exports = Parcel ;
