var app = angular.module("sa_app", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '../frontend/views/site/login.html'
    })
    .when('/dashboard',{
        templateUrl: '../frontend/views/site/dashboard.html'
    })
    .otherwise({
        redirectTo: '/'
    })
})

app.controller("loginCtrl", function ($scope, $location) {
    $scope.submit = function(){
        var username = $scope.username;
        var password = $scope.password;
        if(username == "admin" && password == "admin"){
            $location.path('/dashboard');
        }else{
            
            alert("Wrong credentials");
        }
    };
});