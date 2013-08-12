var fscan = require('./app/scannerService')

module.exports = function (options) {
	if (options) {
		if (options.defaultpath) {
			fscan.defaultpath = options.defaultpath
		}
		if (options.basepath) {
			fscan.basepath = options.basepath
		}
	}

	return function (req, res) {
		if (/^\/lists\//.test(req.path)) {
			fscan.list(req, res);
		} else if (/^\/rescan\//.test(req.path)) {
			fscan.rescan(req, res);
		} else if (/^\/smscan\//.test(req.path)) {
			fscan.testscan(req, res);
		} else {
			res.send(404)
		}
	}
}