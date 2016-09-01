'use strict';

describe('Controller: YammerAuthCtrl', function () {

  // load the controller's module
  beforeEach(module('vetlandaWebApp'));

  var YammerAuthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YammerAuthCtrl = $controller('YammerAuthCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
