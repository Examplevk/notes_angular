 angular.module('notesApp.autorizationProvider', []).provider('autorization',[function () {

    var LOGIN_URL = 'http://localhost:3000/autoriz';

    this.$get = ['$http','$location',function($http, $location) {
        return {
            register: function($scope){
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
                });
                $scope.loginData = {};
            },
            login: function($scope){
                $http.post(LOGIN_URL+'/login', $scope.loginData).success((data)=>{
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
            }
        };

    }];
}])

