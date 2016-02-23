'use strict';

describe('Controller: HomesettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var HomesettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomesettingsCtrl = $controller('HomesettingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
