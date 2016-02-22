'use strict';

angular.module('prwithyomanApp')
  .factory("Auth", function($http) {
    var currentUser = {};

    $http.get("").success(function(user) {
      currentUser = user;
    });

    return {
      getCurrentUser: function () {
        return currentUser;
      }
    }
  });
