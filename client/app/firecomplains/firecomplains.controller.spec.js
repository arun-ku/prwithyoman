'use strict';

describe('Controller: FirecomplainsCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var FirecomplainsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FirecomplainsCtrl = $controller('FirecomplainsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
