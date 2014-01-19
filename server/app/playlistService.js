var util = require('../util'),
  _super = require('./baseService'),
  Datastore = require('nedb');

function playlistService() {
  _super.apply(this, [util.collectionfile]);
  //this.db = new Datastore({filename: util.collectionfile, autoload: true});
};

util.extend(playlistService, _super);

module.exports = new playlistService();

// module.exports.add({playlist: {name: 'hehe'}});
// module.exports.list();
