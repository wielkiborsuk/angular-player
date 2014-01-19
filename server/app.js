var express = require('express'),
	util = require('./util'),
  player = require('./main');

var app = express();

app.configure(function () {
	app.use(express.favicon())
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.cookieParser())
	app.use('/www', express.static(util.base))
	app.use('/www', express.directory(util.base, {icons:true}))

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

  app.use(player({basepath: util.base, defaultpath: util.defaultpath}));
	app.use(function (req, res) {
		res.send(404)
	})
})

module.exports = app
