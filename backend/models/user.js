const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
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
	crops:[
        {
            type:Schema.Types.ObjectId,
            ref:'Crop',
        },
    ],
	plots:[
        {
            type:Schema.Types.ObjectId,
            ref:'Plot',
        },
    ],
	todos:[
        {
            type:Schema.Types.ObjectId,
            ref:'todo',
        },
    ],
});


const User = mongoose.model('User',userSchema);

module.exports = User ;
