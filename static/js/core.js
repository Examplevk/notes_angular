var notesApp = angular.module('notesApp', ['ngRoute', 'notesControllers', 'notesApp.autorizationProvider', 'notesApp.dataProvider']);

notesApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
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

