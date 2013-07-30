var util = require('../util'),
	fs = require('./fileScanner')

function scannerService() {
	
}

scannerService.prototype = {
	list: function (req, res) {
		res.send(fs.list())
	},
	rescan: function (req, res) {
		res.send(fs.rescan())
	}
}