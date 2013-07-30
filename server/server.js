var http = require('http'),
	https = require('https'),
	app = require('./app')

var port = process.env.PORT || 4400

http.createServer(app).listen(port, function () {
	console.log("Express server listening on " + port)
})
