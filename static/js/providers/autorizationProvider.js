 angular.module('notesApp.autorizationProvider', []).provider('autorization',[function () {

    var LOGIN_URL = 'http://localhost:3000/autoriz';

    this.$get = ['$http','$location',function($http, $location) {
        return {
            register: function(loginData){
                return $http.post(LOGIN_URL+'/register', loginData);
            },
            login: function(loginData){
                return $http.post(LOGIN_URL+'/login', loginData);
            }
        };

    }];
}])

