const User = require("../models/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = (passport) => {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		// User.findById(id, function (err, user) {
		done(null, id);
		// });
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID:
					"864331601868-a89fh19jmrclcl23r78p8vtj66gasvc4.apps.googleusercontent.com",
				clientSecret: "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",
				callbackURL: "http://localhost:5000/google/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				console.log(profile);
				User.findOne({ googleID: profile.id }, async (err, user) => {
					if (err) throw err;
					
					if (user) {
						cb(null, user);
					} else {
						const newUser = new User({
							googleID: profile.id,
							email: profile.emails[0].value,
							username: profile.displayName,
							// phoneNo: null,
							// username: null,
						});
						await newUser.save();
						cb(null, newUser);
					}
				});
			}
		)
	);
};

// dotenv.config({ path: './config.env' });
// const CLIENTID = process.env.CLIENTID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;