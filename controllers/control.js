angular.module("app", ['ngRoute', 'LocalStorageModule', 'datatables', 'ngResource', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/site/login.html',
                controller: 'loginCtrl'
            })
            .when('/dashboard', {
                resolve: {
                    "check": ["$location", "localStorageService", function(l, s) {
                        if (!s.get('loggedIn')) {
                            l.path("/");
                        }
                    }]
                },
                templateUrl: '../views/site/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when('/users', {
                templateUrl: '../views/user/admin.html',
                controller: 'userCtrl'
            })
            .when('/users/balance', {
                templateUrl: '../views/user/usersBalance.html',
                controller: 'userCtrl'
            })
            .when('/services', {
                templateUrl: '../views/service/admin.html',
                controller: 'serviceCtrl'
            })
            .when('/records', {
                templateUrl: '../views/record/admin.html',
                controller: 'recordCtrl'
            })
            .otherwise({
                redirectTo: '/',
            })
    });