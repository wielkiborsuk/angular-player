var scannerService = require('./app/scannerService'),
  playlistService = require('./app/playlistService'),
  util = require('./util');

var threes = [
  {reg: /^\/scanned\//, method: 'GET', handler: scannerService.list.bind(scannerService)},
  {reg: /^\/rescan\//, method: 'POST', handler: scannerService.rescan.bind(scannerService)},
  {reg: /^\/smscan\//, method: 'GET', handler: scannerService.testscan.bind(scannerService)},
  {reg: /^\/list\/(\w{14,24})/, method: 'GET', handler: playlistService.get.bind(playlistService)},
  {reg: /^\/list\/(\w{14,24})/, method: 'PUT', handler: playlistService.put.bind(playlistService)},
  {reg: /^\/list\/(\w{14,24})/, method: 'DELETE', handler: playlistService.delete.bind(playlistService)},
  {reg: /^\/list\//, method: 'GET', handler: playlistService.list.bind(playlistService)},
  {reg: /^\/list\//, method: 'POST', handler: playlistService.create.bind(playlistService)}
];

module.exports = function (options) {
	if (options) {
		if (options.defaultpath) {
			scannerService.defaultpath = options.defaultpath
		}
		if (options.basepath) {
			scannerService.basepath = options.basepath
		}
	}

	return function (req, res) {
    for (var i in threes) {
      var t = threes[i]
      if (util.req_match(req, t.reg, t.method)) {
        req.params[0] = t.reg.exec(req.path)[1];
        t.handler(req, res)
        return
      }
    }
    res.send(404)
	}
}
