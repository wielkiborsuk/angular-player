var util = require('../util'),
	fs = require('./fileScanner');

function scannerService() {
	
}

scannerService.prototype = {
	list: function (req, res) {
		res.send(fs.list())
	},
	rescan: function (req, res) {
        if (util.jsonvalid(req, res)) return
        var query = req.body
		res.send(fs.rescan(query.bpath))
	},
    testscan: function (req, res) {
        res.send(fs.rescan('../519843'))
    }
}

module.exports = new scannerService()