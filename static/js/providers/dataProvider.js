angular.module('notesApp.dataProvider', []).provider('data', [function () {

    var DATA_URL = 'http://localhost:3000/data';

    this.$get = ['$http', function($http) {
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
                        resolve(data);

                    }).error(function (data) {
                        console.log('Error: ' + data);
                        reject(data);
                    });
                })
            },
            addNote: function(date, text){
              return $http.post(DATA_URL+'/createnote', {expire_time: date, text: text});
            },
            editNote: function(color, note){
                return $http.post(DATA_URL+'/editnote', {_id: note._id, text: note.text, color: color});
            },
            getAllUsers: function(){
                return new Promise((resolve, reject) => {
                    $http.post(DATA_URL+'/getallusers').success((data)=>{
                        resolve(data);
                    }).error(function(data) {
                        console.log('Error: ' + data);
                        reject(data);
                    })
                })
            },
            addUserToNote: function(userId, noteId){
                console.log('code in provider addUserToNote');
                return $http.post(DATA_URL+'/addusertonote', {_id_user: userId, _id_note: noteId});

            },
            deleteUserFromNote: function(userId, noteId){
                 return $http.post(DATA_URL+'/deleteuserfromnote', {_id_user: userId, _id_note: noteId});

            }
        };

    }];
}])
