const request = require('request');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {google} = require('googleapis');
const gmail = google.gmail('v1');
const auth = new google.auth.OAuth2;
const dotenv = require('dotenv').config();
/* const mongoose = require('mongoose'); */



passport.serializeUser(function(user, done) {
  done(null, user); // done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj); // Users.findById(obj, done);
});



passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

  	/*
	  	console.log(profile.id);
	  	console.log(profile.displayName);
	*/

  	// Kullanıcının ID'si
  	// Error Kontrolü

	auth.setCredentials({
		access_token: accessToken,
		refresh_token: refreshToken
	});



	return done(null, profile); 
  	
  	/*
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
	*/
  }
));


// https://expressjs.com/en/guide/routing.html
module.exports = (app) => { 

	const controllers = require('./controllers.js');


    app.use(passport.initialize());
    app.use(passport.session());

 
	app.route('/')
		.get(controllers.home);
		//.post(controllers.login);

	app.get('/mails',
		function(req, res) {
			console.log('burası /mails sayfası...');

			gmail.users.messages.list({ auth:auth, userId:'me', maxResults:5 },
			function(err, response) {
				console.log(response.data);
			});

		}
	);

	app.route('/mail/:mail_id')
		.get(controllers.mail_read);
		//.put(controllers.mail_update)
		//.delete(controllers.mail_delete)
		//.post(controllers.mail_create);

 

	app.get('/auth/google',
		passport.authenticate('google', { scope: ['profile','https://www.googleapis.com/auth/gmail.readonly'] }));

	app.get('/auth/google/callback', 
		passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {	
			res.redirect('/mails');
		}
	);

};