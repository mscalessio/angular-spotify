'use strict';

/**
* @ngdoc function
* @name soundwallApp.controller:ProfileCtrl
* @description
* # ProfileCtrl
* Controller of the soundwallApp
*/
angular.module('soundwallApp')
// .config(function (SpotifyProvider) {
//   if (localStorage.getItem("spotify-token")) {
//     SpotifyProvider.setAuthToken(localStorage.getItem("spotify-token"));
//   }
// })
.controller('ProfileCtrl',['$scope', '$location', 'Spotify', function ($scope, $location, Spotify) {

  Spotify.getCurrentUser().then(function (data) {
    //console.log(data);
    $scope.profile = data;
  }, function (response) {
    sessionExpired(response);
  });

  Spotify.getUserTopArtists({ limit: 10 }).then(function (data) {
    //console.log(data);
    $scope.topArtists = data.items;
  },
  function (response) {
    sessionExpired(response);
  });

  Spotify.getUserTopTracks({ limit: 10 }).then(function (data) {
    //console.log(data);
    $scope.topTracks = data.items;
  },
  function (response) {
    sessionExpired(response);
  });

  function sessionExpired(response) {
    if (response.error.status === 401) {
      localStorage.removeItem("spotify-token");
      alert('Session expired. Please log-in again.');
      $location.path('/');
    }
  }

}]);
