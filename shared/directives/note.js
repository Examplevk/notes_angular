

import angular from 'angular';

    angular.module('noteDirectives')
        .directive('noteBox', function () {
            console.log('asdfsadf')
            return {
                restrict: 'EA',
                scope: {
                    note: '=',
                    delete: '&',
                    users: '=',
                    checkUser: '=',
                    addUserToNote: '=',
                    deleteUserFromNote: '='
                },
                controller: ['$scope', 'data', NoteController],
                templateUrl: '/templates/note.html',
                replace: true
            }
        })
    
    function NoteController($scope, notesProvider) {
        $scope.editMode = false
        $scope.showPalette = false
        $scope.expireTime = 'Expire at: ' + $scope.note.expireAt.slice(0,10)
        $scope.deleteNote = function () {
           // notesProvider.deleteNote($scope.note)
            $scope.delete();
        }
        $scope.edit = function () {
            $scope.editMode = true
        }
        $scope.cancel = function () {
            $scope.editMode = false
        }
        $scope.setColor = function (color) {
            $scope.note.color = color
            notesProvider.updateNote($scope.note)
        }
        $scope.editNote = function () {
            notesProvider.updateNote($scope.note)
            $scope.cancel()
        }
        $scope.isUsersNote = function (user, note) {
            if(user._id == note.user) return false;
            else return true;
        }
    }
