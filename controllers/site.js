angular.module("app")
    .controller("loginCtrl", ["$scope", "$location", "localStorageService", "$http", "$resource", function(m, l, s, h, r) {
        s.set('base64Key', CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef'));
        s.set('iv', CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210'));
        r('../config/config.json').get().$promise.then(function(response) {
            if (!s.get('host')) {
                s.set('host', response.host);
            }

        });
        m.submit = function() {
            h.get(s.get('host') + '/api/v1/users?username=' +
                m.username).then(function(response) {
                if (response.data.length > 0) {
                    if (response.data[0].status == 'inactive') {
                        alert("Your user is inactive. Contact with administrator");
                    } else {

                        let password = CryptoJS.AES.encrypt(
                            m.password,
                            s.get('base64Key'), { iv: s.get('iv') }).ciphertext.toString(CryptoJS.enc.Base64);


                        if (response.data[0].password == password) {
                            s.set('loggedIn', true);
                            s.set('username', response.data[0].username);
                            s.set('role', response.data[0].role);
                            s.set('id', response.data[0].id);
                            l.path('/dashboard');
                        } else {
                            alert("Wrong credentials");
                        }
                    }
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

        m.onExit = function() {
            return ('bye bye')
        };

        w.onbeforeunload = m.onExit();

        m.checkAccess = function() {
            return m.user.role == 'admin';
        }
    }]);