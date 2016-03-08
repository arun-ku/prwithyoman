/**
 * Created by arun on 26/2/16.
 */
angular.module('prwithyomanApp')
  .service('Reddit', function($http) {
    var Reddit = function () {
      this.items = [];
      this.busy = false;
      this.scrol = true;
      this.done = false;
      this.i = 1;
      this.params = {
        limit : 10,
        offset : 0
      };
    };

    Reddit.prototype.nextPage = function () {
      if (this.busy) return;
      this.busy = true;
      this.scrol=true;
      var url = "/api/posts/"+this.params.offset;
      $http.get(url).then(function (data) {
        for(var i=0; i< data.data.length;i++)
        this.items.push(data.data[i]);
        this.params.offset += data.data.length;
        this.busy = false;
        if(data.data.length <=0){
          this.busy = true;
          this.scrol = false;
          this.done = true;
        }
      }.bind(this));
    };
    Reddit.prototype.nextPageCategory = function () {
      if (this.busy) return;
      this.busy = true;
      this.scrol=true;
      var url = "/api/posts/"+this.params.offset+'/Lost And Found';
      $http.get(url).then(function (data) {
        for(var i=0; i< data.data.length;i++)
          this.items.push(data.data[i]);
        this.params.offset += data.data.length;
        this.busy = false;
        if(data.data.length <=0){
          this.busy = true;
          this.scrol = false;
          this.done = true;
        }
      }.bind(this));
    };
    Reddit.prototype.updateOffsetByOne = function(){
      this.params.offset +=1;
    }
    Reddit.prototype.billu = function(){
      if(this.scrol){
        return true;
      }
      return false;
    }

  return Reddit;
})
  .factory('PostService',['$resource',function($resource){
    return $resource('/api/posts/updateOpinion/:postId/:opinion',{
        postId : '@postId',
        opinion : '@opinion'
      },
      {
        update : {
          method : 'PUT'
        }
      });
  }]);
