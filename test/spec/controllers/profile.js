'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('soundwallApp'));

  var ProfileCtrl,
    scope,
    Spotify;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Spotify_) {
    Spotify = _Spotify_;
    scope = $rootScope.$new();
    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope, spotify: Spotify
      // place here mocked dependencies
    });
  }));

  it('', function () {
  });
});
