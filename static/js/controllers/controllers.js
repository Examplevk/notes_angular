
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
        $scope.users;
        $scope.notes;

        data.getUsersNotes().then(data => $scope.notes = data).catch(err => console.log(err)); //  ?


        data.getAllUsers($scope);

        $scope.mouseEnterOnTodoActive = function(){
            $scope.showBtnDelete = true;
        }
        $scope.deleteNote = function(note){
            var newNotes = [];
            data.deleteNote(note).then(data => {
                for(var i = 0; i <  $scope.notes.length; i++){
                    if( $scope.notes[i]._id !== note._id) newNotes.push( $scope.notes[i]);
                }
            }).catch(err => console.log(err));
            $scope.notes = newNotes;
        }
        $scope.showAddPanel = function(){
            $scope.showAddForm = true;
        }
        $scope.hideAddPanel = function(){
            $scope.showAddForm = false;
            $scope.text = '';
        }
        $scope.addNote = function(){

           if($scope.text != null) data.addNote($scope);

            $scope.text = '';
        }
        $scope.checkUser = function(user_id, note_id){
            console.log('in checkuser');
            for(var i = 0; i < $scope.notes.length; i++){
                if($scope.notes[i]._id == note_id){
                   for (var k = 0; k < $scope.notes[i].users.length; k++){
                       if($scope.notes[i].users[k] == user_id) return true;
                   }
                }
            }
            return false;
        }
        $scope.addUserToNote = function(userId, noteId){
              data.addUserToNote($scope, userId, noteId);
        }
        $scope.deleteUserFromNote = function(userId, noteId){
            data.deleteUserFromNote($scope, userId, noteId);
        }


    }]);
notesControllers.controller('NoteCtrl', ['$scope', 'data',
    function($scope,  data){
        $scope.showPalette = false;
        $scope.showEditPanel = false;


        $scope.changePaletteVisibility = function(val){
            $scope.showPalette = val;
        };
        $scope.getExpireTime = function(note){
           return 'Expire at: '+note.expireAt.slice(0,10);
        };
        $scope.editNote = function(color, note){
            data.editNote(color, note);
        };
        $scope.toggleEditPanel = function(val){
            $scope.showEditPanel = val;
        }

    }]);