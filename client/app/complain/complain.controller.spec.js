'use strict';

describe('Controller: ComplainCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var ComplainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComplainCtrl = $controller('ComplainCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
