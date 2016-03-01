import angular from 'angular';

let noteDirectives =  angular.module('noteDirectives', []);

noteDirectives.directive('inputDirective', [  function(){

    return {
        restrict: 'EA',
        controller: function ($scope) {
            $scope.showAddPanel = function(){
                $scope.showAddForm = true;
            }
            $scope.hideAddPanel = function(){
                $scope.showAddForm = false;
                $scope.text = '';
            }
        },
    }

}])


export default noteDirectives;