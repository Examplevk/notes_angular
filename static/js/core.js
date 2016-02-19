var notesApp = angular.module('notesApp', ['ngRoute', 'notesControllers']);

const LOGIN_URL = 'http://localhost:3000/autoriz';
const DATA_URL = 'http://localhost:3000/data';

notesApp.service('notes', ['$http', function() {

    return {
        all: function() {

        }
    }

}]);
notesApp.config(['$routeProvider', '$locationProvider', 'notesProvider',
    function($routeProvider, $locationProvider, notesProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.
        when('/', {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        }).
        when('/notes', {
            templateUrl: 'templates/notes.html',
            controller: 'NotesCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('LoginCtrl', ['$scope', '$http', '$location', 'notes',
    function($scope, $http, $location, notes) {
        $scope.loginData = {};
        $scope.showLoginErr = false;
        $scope.showRegisterSuccess = false;
        $scope.showRegisterBtn = true;
        console.log(notes(getPrivate()));
        $scope.login = function(){
            console.log($scope.loginData);
            $http.post(LOGIN_URL+'/login', $scope.loginData).success((data)=>{
                if(!data) $scope.showLoginErr = true;
                else $location.path('/notes');
                console.log(data)
            }).error(function(data) {
                console.log('Error: ' + data);
            });
            $scope.loginData = {};
        };
        $scope.register = function(){
            console.log($scope.loginData);
            $http.post(LOGIN_URL+'/register', $scope.loginData).success((data)=>{
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
            });;
            $scope.loginData = {};
        }
    }]);
notesControllers.controller('NotesCtrl', ['$scope', '$http',
    function($scope, $http){
        $scope.showBtnDelete = false;


        $http.post(DATA_URL+ '/getusersnotes').success((data)=> {
            console.log(data)


            $scope.notes = data;

        }).error(function(data) {
            console.log('Error: ' + data);
        });

        $scope.notes;
        console.log(typeof $scope.notes, 'type notes');

        $scope.mouseEnterOnTodoActive = function(){
            $scope.showBtnDelete = true;
        }

        $scope.deleteNote = function(note){
            console.log(note, 'from delete');
           $http.post(DATA_URL+'/deletenote', {_id: note._id}).success((data) =>{
               console.log(data.status);
               console.log($scope.notes);
               var newNotes = [];
               for(var todo in $scope.notes){
                   if(todo._id != note._id) newNotes.push(todo);
               }
               console.log(newNotes)
               $scope.notes = newNotes;

           }).error(function(data) {
               console.log('Error: ' + data);
           });
        }

    }]);