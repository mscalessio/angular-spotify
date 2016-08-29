'use strict';

/**
* @ngdoc function
* @name soundwallApp.controller:PlayCtrl
* @description
* # PlayCtrl
* Controller of the soundwallApp
*/
angular.module('soundwallApp')
.controller('PlayCtrl',['$scope', 'Spotify', function ($scope, Spotify) {
  $scope.loading = true;
  $scope.isPlaying = false;
  var userTopTracks;
  $scope.tracks;
  $scope.selectedTracks = [];
  $scope.playingTrack = {};
  $scope.score = 0;
  var audio = new Audio();

  $scope.playGame = playGame;

  $scope.stopGame = stopGame;

  $scope.$on('$routeChangeStart', function(next, current) {
    stopGame();
  });

  $scope.selectTrack = function (track) {
    if (track.id === $scope.playingTrack.id) {
      alert('GOOD!');
      audio.pause();
      audio.src = "";
      $scope.score++;
      $scope.tracks.splice($scope.playingTrackNum, 1);
      // console.log($scope.tracks.length);
      $scope.selectedTracks = [];
      $scope.playingTrack = {};
      playGame();
    } else {
      alert('YOU LOSE!');
      stopGame();
    }

  };

  function playGame() {
    var randomTrackNum = [];
    var totalTracks = $scope.tracks.length - 1;
    while(randomTrackNum.length < 3) {
      var randomNumber = getRandomIntInclusive(0, totalTracks)
      var found = false;
      for (var i = 0; i < randomTrackNum.length; i++) {
        if(randomTrackNum[i] == randomNumber) {
          found = true;
          break;
        }
      };
      if (!found) {
        randomTrackNum[randomTrackNum.length] = randomNumber;
        $scope.selectedTracks.push($scope.tracks[randomNumber]);
      }
    };
    $scope.randomTrackNum = randomTrackNum;
    // console.log($scope.randomTrackNum);
    // console.log($scope.selectedTracks);
    var playingTrackNum = randomTrackNum[getRandomIntInclusive(0, 2)];
    $scope.playingTrackNum = playingTrackNum;
    $scope.playingTrack = $scope.tracks[playingTrackNum];
    // console.log($scope.playingTrackNum);
    console.log($scope.playingTrack.name);
    $scope.isPlaying = true;
    audio.src = $scope.playingTrack.preview_url;
    audio.play();
  }

  function stopGame () {
    audio.pause();
    audio.src = "";
    $scope.score = 0;
    $scope.selectedTracks = [];
    $scope.playingTrack = {};
    $scope.tracks = userTopTracks;
    $scope.isPlaying = false;
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Spotify.getUserTopTracks({ limit: 50 }).then(
    function (data) {
      // console.log(data);
      userTopTracks = data.items;
      $scope.tracks = userTopTracks;
      $scope.loading = false;
      // console.log($scope.tracks);
    },
    function (response) {
      if (response.error.status === 401) {
        localStorage.removeItem("spotify-token");
        alert('Session expired. Please log-in again.');
        $location.path('/');
      }
    });

  }]);
