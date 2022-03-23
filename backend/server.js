const express =require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo");
const dbConnection = require('./config/dbconnect');

const User = require('./models/user');

const Crop = require('./models/crop');
const Parcel = require('./models/parcel');
const Plot = require('./models/plot');
const Todo = require('./models/todo');


const mongoose = require('mongoose');

const cropRoutes = require('./routes/crop-routes');
//const parcelRoutes = require('./routes/parcel-routes');
const plotRoutes = require('./routes/plot-routes');
// const todoRoutes = require('./routes/todo-routes');


dbConnection.db();

dotenv.config({ path: './config.env' });
const PORT  = process.env.PORT;
var corsOptions={origin:'http://localhost:3000',credentials:true}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));


// Making cookie session
app.use(
	session({
		secret: "user",
		resave: false,
		saveUninitialized: false,
		rolling: true, // <-- Set `rolling` to `true`
		cookie: {
			httpOnly: true,
			maxAge: 8 * 60 * 60 * 1000,
		},
		store: MongoStore.create({
			mongoUrl: process.env.DB,
		}),
	})
);
// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// setting up config for google auth

require("./config/auth-config")(passport);


// Listening for google authentication
app.use(authRoutes);

// all routes 

app.use(cropRoutes);
// app.use(parcelRoutes);
app.use(plotRoutes);
// app.use(todoRoutes);

app.get('/',(req,res)=>{
    res.send('API IS RUNNING');
})


app.listen(PORT,console.log(`SERVER STARTED AT PORT ${PORT}`));
