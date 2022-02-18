const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const DB  = process.env.DB;


module.exports = {
	db: async () => {
		try {
			await mongoose.connect(DB);
			console.log("db connected");
		} catch (err) {
			console.log("error: ", err);
		}
	},
	close: () => {
		mongoose.connection.close();
		console.log("db is closed");
	},
};