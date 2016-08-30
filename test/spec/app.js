'use strict';

describe("Testing Navigation and Routing", function () {

  beforeEach(module('soundwallApp'));
  beforeEach(angular.mock.module('ngTemplates'));

  it("route controller should be mapped to MainCtrl", inject(function ($rootScope, $location, $route) {
    expect($route.current).toBeUndefined();
    $location.path('/');
    $rootScope.$digest();
    expect($route.current.controller).toEqual('MainCtrl');
  }));

  it("route templateUrl should be main.html", inject(function ($rootScope, $location, $route) {
    $location.path('/');
    $rootScope.$digest();
     expect($route.current.templateUrl).toEqual('views/main.html');
  }));

  it("route controller should be mapped to ProfileCtrl", inject(function ($rootScope, $location, $route) {
    expect($route.current).toBeUndefined();
    $location.path('/profile');
    $rootScope.$digest();
    expect($route.current.controller).toEqual('ProfileCtrl');
  }));

  it("route templateUrl should be profile.html", inject(function ($rootScope, $location, $route) {
    $location.path('/profile');
    $rootScope.$digest();
     expect($route.current.templateUrl).toEqual('views/profile.html');
  }));

  it("route controller should be mapped to PlayCtrl", inject(function ($rootScope, $location, $route) {
    expect($route.current).toBeUndefined();
    $location.path('/play');
    $rootScope.$digest();
    expect($route.current.controller).toEqual('PlayCtrl');
  }));

  it("route templateUrl should be play.html", inject(function ($rootScope, $location, $route) {
    $location.path('/play');
    $rootScope.$digest();
     expect($route.current.templateUrl).toEqual('views/play.html');
  }));

});
