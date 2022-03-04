const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    farmername:{
		type: String,
		required: true,
	},
    googleID: {
		type: String,
		required: true,
	},
    email:{
		type: String,
		required: true,
	},
    crop:[
        {
            type:Schema.Types.ObjectId,
            ref:'Crop',
        },
    ],
    plot:[
        {
            type:Schema.Types.ObjectId,
            ref:'Plot',
        },
    ]
});


const Farmer = mongoose.model('Farmer',farmerSchema);

module.exports = Farmer ;
