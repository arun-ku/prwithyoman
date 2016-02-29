/**
 * Created by arun on 25/2/16.
 */
angular.module('prwithyomanApp')
  .directive('fileModel',['$parse',function($parse){
    return {
      restrict : 'A',
      link: function(scope, element, attribute){
        var model = $parse(attribute.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(e){
          scope.canvasShow = true;
          var ctx = document.getElementById('canvas').getContext('2d');
          var url = URL.createObjectURL(e.target.files[0]);
          var img = new Image();
          img.onload = function() {
            ctx.drawImage(img, 0, 0, 500, 480);
          }
          img.src = url;
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          })
        })
      }
    }
  }]);
