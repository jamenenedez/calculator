angular.module("app")
    .controller("loginCtrl", ["$scope", "$location", "localStorageService", "$resource", function(m, l, s, r) {
        s.set('base64Key', CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef'));
        s.set('iv', CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210'));
        r('../config/config.json').get().$promise.then(function(response) {
            s.set('host', response.host);
        });
        m.submit = function() {
            r(s.get('host') + '/api/v1/users?username=:username', { username: m.username })
                .query().$promise.then(function(response) {
                    if (response.length > 0) {
                        if (response[0].status == 'inactive') {
                            alert("Your user is inactive. Contact with administrator");
                        } else {

                            let password = CryptoJS.AES.encrypt(
                                m.password,
                                s.get('base64Key'), { iv: s.get('iv') }).ciphertext.toString(CryptoJS.enc.Base64);


                            if (response[0].password == password) {
                                s.set('loggedIn', true);
                                s.set('username', response[0].username);
                                s.set('role', response[0].role);
                                s.set('id', response[0].id);
                                l.path('/dashboard');
                            } else {
                                alert("Wrong credentials");
                            }
                        }
                    } else {
                        alert("Username or password incorrect");;
                    }
                })
        };
    }])
    .controller("dashboardCtrl", ["$scope", "$location", "localStorageService", "$timeout", "$window", function(m, l, s, t, w) {
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