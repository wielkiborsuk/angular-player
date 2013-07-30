var fscan = require('./app/scannerService')

module.exports = function (app) {
	app.get('/lists/', fscan.list.bind(chat))
	app.get('/rescan/', fscan.refresh.bind(chat))
}