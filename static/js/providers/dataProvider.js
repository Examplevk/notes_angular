angular.module('notesApp.dataProvider', []).provider('data', [function () {

    var DATA_URL = 'http://localhost:3000/data';

    this.$get = ['$http','$location',function($http, $location) {
        return {
            deleteNote: function($scope, note){
                $http.post(DATA_URL+'/deletenote', {_id: note._id}).success((data) =>{
                    console.log(data.status);
                    console.log($scope.notes);

                    var newNotes = [];
                    for(var i = 0; i <  $scope.notes.length; i++){
                        console.log( $scope.notes[i]);
                        if( $scope.notes[i]._id !== note._id) newNotes.push( $scope.notes[i]);
                    }
                    $scope.notes = newNotes;
                    console.log($scope.notes);

                }).error(function(data) {
                    console.log('Error: ' + data);
                });

            },
            getUsersNotes: function($scope){
                $http.post(DATA_URL+ '/getusersnotes').success((data)=> {

                    $scope.notes = data;

                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            },
            addNote: function($scope){
              $http.post(DATA_URL+'/createnote', {expire_time: $scope.date, text: $scope.text}).success((data)=>{
                  $scope.notes.push(data);
              }).error(function(data) {
                  console.log('Error: ' + data);
              });
            },
            changeNoteColor: function(color, note){
                $http.post(DATA_URL+'/editnote', {_id: note._id, text: note.text, color: color}).success((data)=>{
                   // $scope.notes.push(data);
                }).error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        };

    }];
}])
