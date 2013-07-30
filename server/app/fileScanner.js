var fs = require('fs')
var sep = '/'

function fileScanner () {
    this.cache = []
    this.formats = ['mp3']
}

fileScanner.prototype = {
    list: function () {
        return this.cache;
	},
	rescan: function (bpath) {
		this.cache = []
        this.scan(bpath, '')
	},
    scan: function (bpath,path) {
        // console.log('scanning '+path);
        var files = fs.readdirSync(bpath+sep+path)
        var res = []
        for (var i in files) {
            var f = files[i]
            if (fs.statSync(bpath+sep+path+sep+f).isDirectory()) {
                this.scan(bpath, (path.length>0 ? path+sep+f : f))
            } else if (fs.statSync(bpath+sep+path+sep+f)) {
                var t = f.split('.').splice(-1)[0]
                if (this.formats.indexOf(t)>-1) {
                    res.push(f)
                }
            }
        }
        if (res.length>0) {
            var p = path.split('/').splice(-1)[0]
            this.cache.push({name:p, path:path, files:res})
        }
    }
}

module.exports = new fileScanner()