angular.module("app")
    .controller("loginCtrl", ["$scope", "$location", "localStorageService", "$http", function(m, l, s, h) {
        m.submit = function() {
            h.get('http://local.restapicalculator.com/api/v1/users?username=' +
                m.username).then(function(response) {
                debugger
                if (response.data.length > 0) {
                    if (response.data[0].status == 'inactive') {
                        alert("Your user is inactive. Contact with administrator");
                    } else {
                        if (response.data[0].password == m.password) {
                            s.set('loggedIn', true);
                            s.set('username', response.data[0].username);
                            s.set('role', response.data[0].role);
                            l.path('/dashboard');
                        } else {
                            alert("Wrong credentials");
                        }
                    }
                }
            })
        };
    }])
    .controller("dashboardCtrl", ["$scope", "$location", "localStorageService", "$timeout", function(m, l, s, t) {
        m.user = {};
        m.loggedIn = s.get('loggedIn');

        if (s.get('username')) {
            m.user.username = s.get('username');
        }
        if (s.get('role')) {
            m.user.role = s.get('role');
        }

        m.logout = function() {
            s.remove('loggedIn', 'username', 'role');
            m.user.username = null;
            m.user.role = null;
            m.loggedIn = false;
            l.path('/');
        };

        m.time = Date.now();

        m.tickInterval = 1000;

        m.tick = function() {
            m.$apply(function() {
                m.time = Date.now();
                t(m.tick, m.tickInterval);
            });
        }

        t(m.tick, m.tickInterval);

        m.checkAccess = function() {
            return m.user.role == 'admin';
        }
    }]);