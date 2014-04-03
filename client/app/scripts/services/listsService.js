'use strict';

angular.module('clientApp')
  .service('listsService', function listsService($http, dataService) {
    var url = dataService.endpoint_url;

    return {
      scanned: function () {
        return $http.get(url+'scanned/');
      },
      rescan: function (path) {
        return $http.post(url+'rescan/', path);
      },
      smscan: function () {
        return $http.get(url+'smscan/');
      },
      list_list: function () {
        return $http.get(url+'list/');
      },
      list_create: function (listobj) {
        return $http.post(url+'list/', listobj);
      },
      list_get: function (listid) {
        return $http.get(url+'list/'+listid);
      },
      list_put: function (listid, listobj) {
        return $http.put(url+'list/'+listid, listobj);
      },
      list_delete: function (listid) {
        return $http.delete(url+'list/'+listid);
      },
      base: dataService.upload_base_url
    };
  });
