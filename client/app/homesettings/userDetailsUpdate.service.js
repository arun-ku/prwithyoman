/**
 * Created by arun on 12/3/16.
 */
angular.module('prwithyomanApp')
  .factory('UserUpdateService',['$resource',function($resource){
    return $resource('/api/users/:id',{
        id : '@id'
      },
      {
        update : {
          method : 'PUT'
        }
      });
  }]);
