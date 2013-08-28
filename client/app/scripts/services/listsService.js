'use strict';

angular.module('clientApp')
  .service('listsService', function listsService($http, dataService) {
    // var host = process.env.IP || 'localhost';
    // var port = process.env.PORT || 4400;
    var endpoint = dataService.listsendpoint
    
    var base = 'http://'+endpoint+'/static/upload/'
    var url = 'http://'+endpoint+'/player/';
    
    return {
        lists: function () {
            return $http.get(url+'lists/')
        },
        rescan: function (path) {
            return $http.post(url+'rescan/', path);
        },
        smscan: function () {
            return $http.get(url+'smscan/')
        },
        base: base
    }
  });
