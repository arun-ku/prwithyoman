/**
 * Created by arun on 7/3/16.
 */
angular.module('prwithyomanApp')
  .factory('ComplainService',['$resource',function($resource){
    return $resource('/api/complainss/:id',{
        id : '@id'
      },
      {
        addComplain : {
          method : 'POST'
        },
        getComplains : {
          method : 'GET'
        }
      });
  }])
