'use strict';

/**
* @ngdoc function
* @name soundwallApp.controller:ProfileCtrl
* @description
* # ProfileCtrl
* Controller of the soundwallApp
*/
angular.module('soundwallApp')
.config(function (SpotifyProvider) {
  if (localStorage.getItem("spotify-token")) {
    SpotifyProvider.setAuthToken(localStorage.getItem("spotify-token"));
  }
})
.controller('ProfileCtrl',['$scope', '$location', 'Spotify', function ($scope, $location, Spotify) {
  var userId;
  $scope.follow = function (artist) {
    console.log(artist);
  };

  $scope.play = function (track) {
    console.log(track);
  }

  Spotify.getCurrentUser().then(function (data) {
    // console.log(data);
    $scope.profile = data;
    userId = data.id;
  }, function (response) {
    console.log(response.error.status);
    if (response.error.status === 401) {
      localStorage.removeItem("spotify-token");
      alert('Session expired. Please log-in again.');
      $location.path('/');
    }
  });

  Spotify.getUserTopArtists({ limit: 10 }).then(function (data) {
    console.log(data);
    $scope.topArtists = data.items;
  },
  function (response) {
    if (response.error.status === 401) {
      localStorage.removeItem("spotify-token");
      alert('Session expired. Please log-in again.');
      $location.path('/');
    }
  });

  Spotify.getUserTopTracks({ limit: 10 }).then(function (data) {
    console.log(data);
    $scope.topTracks = data.items;
  },
  function (response) {
    if (response.error.status === 401) {
      localStorage.removeItem("spotify-token");
      alert('Session expired. Please log-in again.');
      $location.path('/');
    }
  });



}]);
