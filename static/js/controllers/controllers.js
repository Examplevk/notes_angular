
var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('LoginCtrl', ['$scope', '$http', '$location', 'autorization',
    function($scope, $http, $location, autorization) {
        $scope.loginData = {};
        $scope.showLoginErr = false;
        $scope.showRegisterSuccess = false;
        $scope.showRegisterBtn = true;

        $scope.login = function(){
            autorization.login($scope.loginData).success((data)=>{
                if(!data) {
                    console.log('Code in !data')
                    $scope.showLoginErr = true;
                }
                else {
                    $location.path('/notes');
                    console.log('Code in data')
                }
                console.log(data)
            }).error(function(data) {
                console.log('Error: ' + data);
            });
            $scope.loginData = {};
        };

        $scope.register = function(){
            autorization.register($scope.loginData).success((data)=>{
                if(data.success) {
                    $scope.showRegisterSuccess = true;
                    $scope.showRegisterBtn = false;
                    $scope.showLoginErr = false;
                }else {
                    $scope.showLoginErr = true;
                }
                console.log(data)
            }).error(function(data) {
                console.log('Error: ' + data);
            });
            $scope.loginData = {};
        }
    }]);

notesControllers.controller('NotesCtrl', ['$scope', '$http', 'data',
    function($scope, $http, data){
        $scope.text;
        $scope.date;
        $scope.showAddForm = false;
        $scope.users;
        $scope.notes = [];

        data.getUsersNotes().then(data => {
            $scope.notes = data;
            $scope.$apply();
        }).catch(err => console.log(err));

        data.getAllUsers().then(data => {$scope.users = data}).catch(err => console.log(err));


        $scope.deleteNote = function(note){
            var newNotes = [];
            data.deleteNote(note).then(data => {
                for(var i = 0; i <  $scope.notes.length; i++){
                    if( $scope.notes[i]._id !== note._id) newNotes.push( $scope.notes[i]);
                }
                $scope.notes = newNotes;
                $scope.$apply();
            }).catch(err => console.log(err));
        }

        $scope.addNote = function(){

           if($scope.text != null) data.addNote($scope.date, $scope.text).success((data)=>{
                   $scope.notes.push(data);
                   //$scope.$apply();
               }).error(function(data) {
                   console.log('Error: ' + data);
               });

            $scope.text = '';
        }
        
        $scope.addUserToNote = function(userId, noteId){
              data.addUserToNote(userId, noteId).success((data)=>{

                  for(var i = 0; i < $scope.notes.length; i++){
                      if($scope.notes[i]._id == noteId){
                          $scope.notes[i].users.push(userId);
                      }
                  }

              }).error(function(data) {
                  console.log('Error: ' + data);
              });
        }

        $scope.deleteUserFromNote = function(userId, noteId){
            data.deleteUserFromNote(userId, noteId).success((data)=>{

                for(var i = 0; i < $scope.notes.length; i++){
                    if($scope.notes[i]._id == noteId){
                        $scope.notes[i].users = data;
                    }
                }

            }).error(function(data) {
                console.log('Error: ' + data);
            });
        }

    }]);
notesControllers.controller('NoteCtrl', ['$scope',
    function($scope){
        $scope.showPalette = false;
        $scope.showEditPanel = false;
        $scope.showBtnDelete = false;

    }]);