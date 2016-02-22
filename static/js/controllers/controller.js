
var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('LoginCtrl', ['$scope', '$http', '$location', 'autorization',
    function($scope, $http, $location, autorization) {
        $scope.loginData = {};
        $scope.showLoginErr = false;
        $scope.showRegisterSuccess = false;
        $scope.showRegisterBtn = true;

        $scope.login = function(){
            autorization.login($scope);
            $scope.loginData = {};
        };

        $scope.register = function(){
            autorization.register($scope);
        }
    }]);

notesControllers.controller('NotesCtrl', ['$scope', '$http', 'data',
    function($scope, $http, data){
        $scope.showBtnDelete = false;
        $scope.text;
        $scope.date;
        $scope.showAddForm = false;

        data.getUsersNotes($scope);

        $scope.notes;

        $scope.mouseEnterOnTodoActive = function(){
            $scope.showBtnDelete = true;
        }
        $scope.deleteNote = function(note){
            data.deleteNote($scope, note);
        }
        $scope.showAddPanel = function(){
            $scope.showAddForm = true;
        }
        $scope.hideAddPanel = function(){
            $scope.showAddForm = false;
            $scope.text = '';
        }
        $scope.addNote = function(){
            console.log( $scope.text, typeof $scope.date);
           if($scope.text != null) data.addNote($scope);
            $scope.text = '';
        }

    }]);
notesControllers.controller('NoteCtrl', ['$scope', 'data',
    function($scope,  data){
        $scope.showPalette = false;


        $scope.changePaletteVisibility = function(val){
            $scope.showPalette = val;
        };
        $scope.getExpireTime = function(note){
           return 'Expire at: '+note.expireAt.slice(0,10);
        };
        $scope.changeColor = function(color, note){

            data.changeNoteColor(color, note);
        };

    }]);