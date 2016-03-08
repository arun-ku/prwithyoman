/**
 * Created by arun on 8/3/16.
 */
angular.module('prwithyomanApp')
  .factory('ShowComplainsService',['$resource',function($resource){
    return $resource('/api/complainss/:option/:userId/:offset',{
        userId : '@userId',
        offset : '@offset',
        option : '@option'
      },
      {
        getComplains : {
          method : 'GET'
        },
        getCount :{
          method : 'GET'
        }
      });
  }]);
