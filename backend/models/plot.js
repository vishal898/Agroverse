const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plotSchema = new Schema({
    farmerId:{
        type:Schema.Types.ObjectId,
        ref:'Farmer',
    },
    plotname:{
		type: String,
		required: true,
	},
    parcelCnt:{
        type:Number,
        required: true,
    },
    parcels:[
        {
            type:Schema.Types.ObjectId,
            ref:'Parcel',
        },
    ],
    parcelLength:{
        type:Number,
        required: true,
    },
    parcelWidth:{
        type:Number,
        required: true,
    }
});


const Plot = mongoose.model('Plot',plotSchema);

module.exports = Plot ;
