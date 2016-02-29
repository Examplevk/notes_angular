
var noteDirectives = angular.module('noteDirectives', []);


noteDirectives.directive('noteDirective', [ 'data', function(data){

    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            scope.changePaletteVisibility = function(val){
                scope.showPalette = val;
            };
            scope.getExpireTime = function(note){
                return 'Expire at: '+note.expireAt.slice(0,10);
            };
            scope.editNote = function(color, note){
                data.editNote(color, note).success((data)=>{
                    // $scope.notes.push(data);
                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            };
            scope.toggleEditPanel = function(val){
                scope.showEditPanel = val;
            }
            scope.mouseEnterOnTodoActive = function(){
                scope.showBtnDelete = true;
            }
            scope.checkUser = function(user_id, note_id){
                console.log('in checkuser');
                for(var i = 0; i < scope.notes.length; i++){
                    if(scope.notes[i]._id == note_id){
                        for (var k = 0; k < scope.notes[i].users.length; k++){
                            if(scope.notes[i].users[k] == user_id) return true;
                        }
                    }
                }
                return false;
            }
        },
    }

}])

noteDirectives.directive('inputDirective', [ 'data', function(data){

    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            scope.showAddPanel = function(){
                scope.showAddForm = true;
            }
            scope.hideAddPanel = function(){
                scope.showAddForm = false;
                scope.text = '';
            }
        },
    }

}])