angular.module('notesApp.dataProvider', []).provider('data', [function () {

    var DATA_URL = 'http://localhost:3000/data';

    this.$get = ['$http','$location',function($http, $location) {
        return {
            deleteNote: function(note) {
               return new Promise((resolve, reject) => {
                   $http.post(DATA_URL+'/deletenote', {_id: note._id})
                       .success((data) => {

                       resolve(true);

                   }).error(function(data) {
                       console.log('Error: ' + data);
                       reject(data);
                   });
             })
            },
            getUsersNotes: function(){
                return new Promise((resolve, reject) => {
                    $http.post(DATA_URL + '/getusersnotes').success((data)=> {

                        //$scope.notes = data;
                        resolve(data);

                    }).error(function (data) {
                        console.log('Error: ' + data);
                        reject(data);
                    });
                })
            },
            addNote: function($scope){
              $http.post(DATA_URL+'/createnote', {expire_time: $scope.date, text: $scope.text}).success((data)=>{
                  $scope.notes.push(data);
              }).error(function(data) {
                  console.log('Error: ' + data);
              });
            },
            editNote: function(color, note){
                $http.post(DATA_URL+'/editnote', {_id: note._id, text: note.text, color: color}).success((data)=>{
                   // $scope.notes.push(data);
                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            },
            getAllUsers: function($scope){
                $http.post(DATA_URL+'/getallusers').success((data)=>{
                     $scope.users = data;
                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            },
            addUserToNote: function($scope, userId, noteId){
                console.log('code in provider addUserToNote');
                $http.post(DATA_URL+'/addusertonote', {_id_user: userId, _id_note: noteId}).success((data)=>{

                    for(var i = 0; i < $scope.notes.length; i++){
                        if($scope.notes[i]._id == noteId){
                            $scope.notes[i].users.push(userId);
                        }
                    }

                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            },
            deleteUserFromNote: function($scope, userId, noteId){
                $http.post(DATA_URL+'/deleteuserfromnote', {_id_user: userId, _id_note: noteId}).success((data)=>{

                    for(var i = 0; i < $scope.notes.length; i++){
                        if($scope.notes[i]._id == noteId){
                            $scope.notes[i].users = data;
                        }
                    }

                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        };

    }];
}])
