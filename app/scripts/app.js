'use strict';

/**
 * @ngdoc overview
 * @name angularPlayerApp
 * @description
 * # angularPlayerApp
 *
 * Main module of the application.
 */
angular
  .module('angularPlayerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'perfect_scrollbar'
  ])
  .config(function ($routeProvider, $sceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:type/:list/:song/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:type/:list/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:type/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $sceProvider.enabled(false);
  });
