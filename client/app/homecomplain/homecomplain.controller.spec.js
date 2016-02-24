'use strict';

describe('Controller: HomecomplainCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var HomecomplainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomecomplainCtrl = $controller('HomecomplainCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
