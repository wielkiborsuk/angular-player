'use strict';

angular.module('clientApp')
  .service('listsService', function listsService($http, dataService) {
    var url = dataService.endpoint_url

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
        base: dataService.upload_base_url
    }
  });
