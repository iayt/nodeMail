module.exports = (app) => {

	const controllers = require('./controllers.js');

	app.route('/').get(controllers.home);

};