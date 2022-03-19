const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parcelSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    plotId:{
        type:Schema.Types.ObjectId,
        ref:'Plot',
    },
    parcelNo:{
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


const Parcel = mongoose.model('Parcel',parcelSchema);

module.exports = Parcel ;
