var fs = require('fs')

module.exports = {
	cache: [],
	list: function () {
		return cache;
	},
	rescan: function () {
		this.cache = []
	}
}
