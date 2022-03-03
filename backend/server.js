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
const mongoose = require('mongoose');


dbConnection.db();

dotenv.config({ path: './config.env' });
const PORT  = process.env.PORT;

var corsOptions={origin:'http://localhost:3000',credentials:true}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));






app.listen(PORT,console.log(`SERVER STARTED AT PORT ${PORT}`));
