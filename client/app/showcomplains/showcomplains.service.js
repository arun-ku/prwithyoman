/**
 * Created by arun on 8/3/16.
 */
angular.module('prwithyomanApp')
  .factory('ShowComplainsService',['$resource',function($resource){
    return $resource('/api/complainss/:limit/:offset/:userId',{
        userId : '@userId',
        offset : '@offset',
        limit : '@limit'
      },
      {
        getComplains : {
          method : 'GET'
        }
      });
  }])
  .factory('ShowAllComplainsService',['$resource',function($resource){
    return $resource('/api/complainss/getAllComplains/:limit/:offset',{
        offset : '@offset',
        limit : '@limit'
      },
      {
        getAllComplains : {
          method : 'GET'
        }
      });
  }])

