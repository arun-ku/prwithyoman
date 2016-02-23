'use strict';

describe('Controller: HomeuserCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var HomeuserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeuserCtrl = $controller('HomeuserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
