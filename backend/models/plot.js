const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plotSchema = new Schema({
    plotname:{
		type: String,
		required: true,
	},
    parsel:[
        {
            type:Schema.Types.ObjectId,
            ref:'Parsel',
        },
    ]
});


const Plot = mongoose.model('Plot',plotSchema);

module.exports = Plot ;
