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
    'ngRoute'
  ])
  .config(function ($routeProvider, $sceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $sceProvider.enabled(false);
  });
