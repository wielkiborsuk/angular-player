var util = require('../util'),
	fs = require('./fileScanner');

function scannerService() {
	__scanner = fs
	defaultpath = util.defaultpath
	basepath = util.base
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