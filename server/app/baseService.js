var Datastore = require('nedb'),
	util = require('../util')

function baseService(collectionFile){
    this.collectionFile = collectionFile;
    this.db = new Datastore({filename: this.collectionFile, autoload: true});
}

baseService.prototype = {
  create: function(req, res) {
    if (util.jsonvalid(req, res)) return;
    delete req.body._id;
    this.db.insert(req.body, function (err, inserted) {
      if (util.erres(err, res)) return;
      res.send(201, inserted['_id']);
    });
  },
  delete: function (req, res) {
    this.db.remove({'_id': req.params[0]}, {}, function (err, num) {
      if (util.erres(err, res)) return;
      res.send(200);
    });
  },
  get: function (req, res) {
    this.db.findOne({'_id': req.params[0]}, function (err, doc) {
      console.log([req.params[0], err, doc, req.params]);
      if (util.erres(err, res)) return;
      if (doc) res.send(doc);
      else res.send(404);
    });
  },
  put: function (req, res) {
    if (util.jsonvalid(req, res)) return;
    delete req.body._id;
    this.db.update({'_id': req.params[0]}, req.body, {}, function (err, num, flag) {
        if (util.erres(err, res)) return;
        res.send(200);
    });
  },
  list: function (req, res) {
    this.db.find({}, function (err, list) {
      if (util.erres(err, res)) return;
      res.send(list);
    });
  }
}

module.exports = baseService
