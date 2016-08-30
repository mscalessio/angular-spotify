'use strict';

describe('Controller: PlayCtrl', function () {

  // load the controller's module
  beforeEach(module('soundwallApp'));

  var PlayCtrl,
  scope,
  $httpBackend,
  Spotify,
  audioOriginal,
  audioMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Spotify_) {
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET('https://api.spotify.com/v1/me/top/tracks?limit=50').respond(200, {items: [{name: "TRACK"}]});

    audioOriginal = window.Audio;
    audioMock = {};
    window.Audio = function() { return audioMock; };

    scope = $rootScope.$new();
    Spotify = _Spotify_;
    PlayCtrl = $controller('PlayCtrl', {
      $scope: scope, spotify: Spotify
      // place here mocked dependencies
    });

    $httpBackend.flush();
  }));

  afterEach(function() {
    window.Audio = audioOriginal;
  });

  it("shuold have the initial state ok", function () {
    expect(scope.loading).toBeFalsy();
    expect(scope.isPlaying).toBeFalsy();
    expect(scope.tracks).toBeDefined();
    expect(scope.selectedTracks).toBeDefined();
    expect(scope.playingTrack).toBeDefined();
    expect(scope.score).toEqual(0);
  });

  it("should get tracks information from xhr and create tracks object ", function () {
    Spotify.getUserTopTracks();
    expect(scope.tracks[0].name).toEqual("TRACK");
    expect(scope.loading).toBeFalsy();
  });

});
