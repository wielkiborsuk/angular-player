'use strict';

angular.module('clientApp')
  .service('dataService', function dataService() {
    return {
    	listsendpoint: 'localhost:4000'
    	// listsendpoint: '31.6.70.108:8080'
    }
  });
