/**
 * Created by arun on 24/2/16.
 */
'use strict';

angular.module('prwithyomanApp')
.filter('gethtml',['$sce',function($sce){
    return function(input) {
      console.log(input);
      return $sce.trustAsHtml(input);
    };
  }]);
