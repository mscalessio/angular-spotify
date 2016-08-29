'use strict';

/**
 * @ngdoc overview
 * @name soundwallApp
 * @description
 * # soundwallApp
 *
 * Main module of the application.
 */
angular
  .module('soundwallApp', [
    'ngAnimate',
    'ngRoute',
    'ngStorage',
    'spotify'
  ])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('c042cd8514c64f9b995fb1a759cdd5a5');
    SpotifyProvider.setRedirectUri('http://localhost:9000/callback.html');
    SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'play'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location) {
    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var publicPages = ['/'];
      var restrictedPage = publicPages.indexOf($location.path()) === -1;
      if (restrictedPage && !localStorage.getItem("spotify-token")) {
        $location.path('/');
      }
    });
  });
