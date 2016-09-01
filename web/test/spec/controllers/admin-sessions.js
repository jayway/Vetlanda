'use strict';

describe('Controller: AdminSessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('vetlandaWebApp'));

  var AdminSessionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminSessionsCtrl = $controller('AdminSessionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
