'use strict';

angular.module('prwithyomanApp')
  .controller('ComplainCtrl',['$stateParams','$http', function ( $stateParams, $http) {
    var complainDetails = this;
    $http.get('/api/complainss/getComplain/'+$stateParams.complainId).then(function(data){
      complainDetails.mainDetails = data.data.complain;
      complainDetails.timeline = data.data.timeline;
    });
  }]);
