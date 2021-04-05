angular.module("app", ['ngRoute', 'LocalStorageModule', 'datatables', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'angularjs-crypto'])
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
                templateUrl: '../views/user/balance.html',
                controller: 'userCtrl'
            })
            .when('/user/profile', {
                templateUrl: '../views/user/profile.html',
                controller: 'profileCtrl'
            })
            .when('/services', {
                templateUrl: '../views/service/admin.html',
                controller: 'serviceCtrl'
            })
            .when('/records', {
                templateUrl: '../views/record/admin.html',
                controller: 'recordCtrl'
            })
            .when('/records/user', {
                templateUrl: '../views/record/records.html',
                controller: 'recordCtrl'
            })
            .when('/record/create', {
                templateUrl: '../views/record/create.html',
                controller: 'createCtrl'
            })
            .otherwise({
                redirectTo: '/',
            })
    });