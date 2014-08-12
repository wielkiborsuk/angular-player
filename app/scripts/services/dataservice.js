'use strict';

/**
 * @ngdoc service
 * @name angularPlayerApp.Dataservice
 * @description
 * # Dataservice
 * Service in the angularPlayerApp.
 */
angular.module('angularPlayerApp')
  .service('Dataservice', function Dataservice() {
    return {
      //endpoint_url: 'http://localhost:4400/',
      //mediabase: 'http://localhost:4400/www/upload/',
      // endpoint_url: 'http://31.6.70.108:80/player/',
      // mediabase: 'http://31.6.70.108:80/www/upload/',
      //endpoint_url: '/player/',
      //mediabase: '/www/upload/',
      endpoint_url: 'http://alarmpi/player/',
      mediabase: 'http://alarmpi/www/upload/',
      brak: ''
    };
  });
