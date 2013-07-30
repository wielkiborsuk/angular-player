'use strict';

angular.module('clientApp')
  .service('listsService', function listsService($http) {
    // var host = process.env.IP || 'localhost';
    // var port = process.env.PORT || 4400;
    var url = 'http://miscnora.wielkiborsuk.c9.io/';
    
    return {
        lists: function () {
            return $http.get(url+'lists/')
        },
        rescan: function (path) {
            return $http.post(url+'rescan/', path);
        },
        smscan: function () {
            return $http.get(url+'smscan/')
        }
    }
  });
