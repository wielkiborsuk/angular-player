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
      endpoint_url: 'http://nora.no-ip.org/player/',
      mediabase: 'http://nora.no-ip.org/www/upload/',
      brak: '',


      state: {
        active: {},
        curr: '',
        song_queue: [],
        new_list: {},
        mediadirs: {},
        lists: {},
        path: {
          type: null,
          list: null,
          song: null
        }
      }
    };
  });
