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

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
            console.log(scope.customer)
          })
        })
      }
    }
  }]);
