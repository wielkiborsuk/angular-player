var express = require('express'),
	routes = require('./routes'),
	util = require('./util');

var app = express();

app.configure(function () {
	app.use(express.favicon())
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.cookieParser())
	app.use('/static', express.static(util.base))
	app.use('/static', express.directory(util.base, {icons:true}))

	app.all('*', function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Range, X-Requested-With');
		if (req.method == "OPTIONS") {
			res.send(200);
		} else {
			next();
		}
	})

	routes(app)
	app.use(function (req, res) {
		res.send(404)
	})
})

module.exports = app