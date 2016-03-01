import angular                  from 'angular';
import  'angular-route/angular-route.min.js';
import  'jquery/dist/jquery.min.js';

import noteDirectives           from './directives/directives';
import noteDirective from './directives/note'

import notesControllers         from './controllers/controllers';

import autorizationProvider     from './providers/autorizationProvider';

import dataProvider             from './providers/dataProvider';

var notesApp = angular.module('notesApp', ['ngRoute', 'notesControllers', 'autorizationProvider', 'dataProvider', 'noteDirectives']);

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

