var fscan = require('./app/scannerService')

module.exports = function (app) {
    app.get('/lists/', fscan.list.bind(fscan))
	app.post('/rescan/', fscan.rescan.bind(fscan))
    app.get('/smscan/', fscan.testscan.bind(fscan))
}