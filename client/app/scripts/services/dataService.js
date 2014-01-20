'use strict';

angular.module('clientApp')
  .service('dataService', function dataService() {
    return {
      //endpoint_url: 'http://localhost:4400/',
      //upload_base_url: 'http://localhost:4400/www/upload/',
      // endpoint_url: 'http://31.6.70.108:80/player/',
      // upload_base_url: 'http://31.6.70.108:80/www/upload/',
      endpoint_url: '/player/',
      upload_base_url: '/www/upload/',
      brak: ''
    }
  });
