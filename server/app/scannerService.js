var util = require('../util'),
	fs = require('./fileScanner');

function scannerService() {
	this.__scanner = fs
	this.defaultpath = util.defaultpath
	this.basepath = util.base
}

scannerService.prototype = {
	list: function (req, res) {
		res.send(fs.list())
	},
	rescan: function (req, res) {
        if (util.jsonvalid(req, res)) return
        var query = req.body
		res.send(fs.rescan(this.basepath + query.bpath))
	},
    testscan: function (req, res) {
        res.send(fs.rescan(this.basepath + this.defaultpath))
    }
}

module.exports = new scannerService()