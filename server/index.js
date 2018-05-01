const express = require('express'),
	
	app = express(),

	port = process.env.PORT || 3000,

	// Routes
	routes = require('./routes.js');

	routes(app);
	app.listen(port);

console.log('NodeMail API ' + port + ' portu üzerinden başlatıldı...');