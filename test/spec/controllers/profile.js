'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('soundwallApp'));

  var ProfileCtrl,
    scope,
    $httpBackend,
    Spotify;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Spotify_) {
    $httpBackend = _$httpBackend_;
    Spotify = _Spotify_;

    $httpBackend.expectGET('https://api.spotify.com/v1/me').respond(200, {display_name: "TEST"});

    $httpBackend.expectGET('https://api.spotify.com/v1/me/top/artists?limit=10').respond(200, {items: [{name: "ARTIST"}]});

    $httpBackend.expectGET('https://api.spotify.com/v1/me/top/tracks?limit=10').respond(200, {items: [{name: "TRACK"}]});

    scope = $rootScope.$new();
    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope, spotify: Spotify
      // place here mocked dependencies
    });

    $httpBackend.flush();
  }));

  it("should get user information from xhr and create profile object ", function () {
    Spotify.getCurrentUser();
    expect(scope.profile.display_name).toEqual("TEST");
  });

  it("should get artists information from xhr and create artists object ", function () {

    Spotify.getUserTopArtists();
    expect(scope.topArtists[0].name).toEqual("ARTIST");
  });

  it("should get tracks information from xhr and create tracks object ", function () {

    Spotify.getUserTopTracks();
    expect(scope.topTracks[0].name).toEqual("TRACK");
  });
});
