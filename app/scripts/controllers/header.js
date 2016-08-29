'use strict';

/**
 * @ngdoc function
 * @name soundwallApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the soundwallApp
 */
angular.module('soundwallApp')
  .controller('HeaderCtrl',['$rootScope', '$scope', '$location', 'Spotify', function ($rootScope, $scope, $location, Spotify) {
    if (localStorage.getItem("spotify-token")) {
      $rootScope.currentUserSignedIn = true;
    } else {
      $rootScope.currentUserSignedIn = false;
    }

    $scope.login = function () {
      Spotify.login().then(function () {
        $rootScope.currentUserSignedIn = true;
        $location.path('/profile');
      }, function () {
        console.log('didn\'t log in');
      });
    };

    $scope.logout = function () {
      localStorage.removeItem("spotify-token");
      $rootScope.currentUserSignedIn = false;
      $location.path('/');
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }]);
