'use strict';

describe('Controller: ShowcomplainsCtrl', function () {

  // load the controller's module
  beforeEach(module('prwithyomanApp'));

  var ShowcomplainsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowcomplainsCtrl = $controller('ShowcomplainsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
