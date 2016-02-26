/**
 * Created by arun on 26/2/16.
 */
angular.module('prwithyomanApp')
  .service('Reddit', function($http) {
    var Reddit = function () {
      this.items = [];
      this.busy = false;
      this.params = {
        limit : 10,
        offset : 0
      };
    };

    Reddit.prototype.nextPage = function () {
      if (this.busy) return;
      this.busy = true;
      console.log("meh");
      var url = "http://localhost:9000/api/posts/"+this.params.offset;
      $http.get(url).then(function (data) {
        for(var i=0; i< data.data.length;i++)
        this.items.push(data.data[i]);
        this.params.offset += 10;
        console.log(this.params.offset);
        this.busy = false;
      }.bind(this));
    };
  return Reddit;
});
