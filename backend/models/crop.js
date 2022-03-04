const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cropSchema = new Schema({
    cropname:{
		type: String,
		required: true,
	}
});


const Crop = mongoose.model('Crop',cropSchema);

module.exports = Crop ;
