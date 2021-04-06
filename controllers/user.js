angular.module("app")
    .controller("userCtrl", ["$scope", "$http", "$resource", "localStorageService", function(m, h, r, s) {
        m.user = {};
        m.user.roles = ['user', 'admin'];
        m.user.statuses = ['active', 'trial', 'inactive'];
        m.btnName = "Insert";
        m.insert_data = function() {
            m.user.password = CryptoJS.AES.encrypt(
                    m.user.password,
                    s.get('base64Key'), { iv: s.get('iv') })
                .ciphertext.toString(CryptoJS.enc.Base64);

            if (m.btnName == "Update") {
                h.put(
                    s.get('host') + "/api/v1/user/" + m.user.id, {
                        'username': m.user.username,
                        'password': m.user.password,
                        'role': m.user.role,
                        'balance': m.user.balance,
                        'status': m.user.status
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text);
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element("#_form").modal("hide");
                    m.user.username = null;
                    m.user.password = null;
                    m.user.role = null;
                    m.user.balance = null;
                    m.user.status = null;
                    m.btnName = "Insert";
                    m.show_data();
                });
            } else {
                if (m.user.username == null) {
                    alert("Enter Your Name");
                } else if (m.user.password == null) {
                    alert("Enter Your Password");
                } else if (m.user.role == null) {
                    alert("Enter Your Role");
                } else if (m.user.status == null) {
                    alert("Enter Your Status");
                } else if (m.user.balance == null) {
                    alert("Enter Your Balance");
                } else {
                    h.post(
                        s.get('host') + "/api/v1/user", {
                            'username': m.user.username,
                            'password': m.user.password,
                            'role': m.user.role,
                            'balance': m.user.balance,
                            'status': m.user.status
                        }
                    ).then(function(response) {
                        if (response.data.notice) {
                            alert(response.data.notice.text);
                        } else {
                            alert(response.data.error.text);
                        }
                        m.user.username = null;
                        m.user.password = null;
                        m.user.role = null;
                        m.user.balance = null;
                        m.user.status = null;
                        m.show_data();
                    });
                }
            }
        }
        m.show_data = function(load = 'full') {
            //TODO use pagination from server
            m.users = r(s.get('host') + '/api/v1/users?status=active').query();
            setTimeout(() => {
                var table = angular.element("#userDatatable").DataTable();
                // Setup datatable search field
                angular.element("input[type='search']").on('keyup', function() {
                    let column = 2;
                    if (load == 'custom') {
                        column = 1;
                    }
                    table.columns(column).search(this.value).draw();
                });
            }, 500);
        }
        m.delete_data = function(id) {
            if (confirm("Are you sure you want to delete?")) {
                h.put(
                    s.get('host') + "/api/v1/user/" + id, {
                        'status': 'inactive'
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text.replace("Updated", "Deleted"));
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element("#_form").modal("hide");
                    m.show_data();
                });
            } else {
                return false;
            }
        }
        m.cancel_data = function() {
            m.user.username = null;
            m.user.password = null;
            m.user.role = null;
            m.user.status = null;
        }
        m.show_form = function() {
            m.update = !m.update;
            m.details = !m.details;
            if (m.behavior_btn == "View details") {
                m.behavior_btn = "Edit";
            } else {
                m.behavior_btn = "View details";
            }

            if (m.header_name == "Update User") {
                m.header_name = "User details";
            } else {
                m.header_name = "Update User";
            }
        }
        m.show_details = function(x, load = 'full') {
            m.user.id = x.id;
            m.user.uuid = x.uuid;
            m.user.username = x.username;
            m.user.role = x.role;
            m.user.status = x.status;
            m.user.balance = parseFloat(x.balance);

            if (load == 'custom') {
                m.balance = true;
            }

            m.details = true;
            m.update = false;
            m.insert = false;
            m.header_name = "User details";
            m.header_description = "User full info";
            m.behavior_btn = "Edit";
            m.submit_button = 'Save';
            m.btnName = "Update";
            angular.element("#_form").modal("show");
        }
        m.create_data = function() {
            m.details = false;
            m.insert = true;
            m.update = false;

            m.user.id = null;
            m.user.uuid = null;
            m.user.username = null;
            m.user.role = null;
            m.user.status = null;
            m.user.balance = null;

            m.header_name = "Create new user";
            m.submit_button = 'Save';
            m.btnName = "Insert";
            angular.element("#_form").modal("show");
        }
        m.checkAccess = function() {
            return s.get("role") == 'admin';
        }
    }]).controller('profileCtrl', ["$scope", "$http", "$resource", "localStorageService", function(m, h, r, s) {
        r(s.get('host') + '/api/v1/user/:id').get({ id: s.get('id') }).$promise.then(function(response) {
            m.user = response;
        });
        m.checkAccess = function() {
            return s.get("role") == 'admin';
        }
    }]).filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            if (input) {
                return input.split(splitChar)[splitIndex];
            }
            return false;
        }
    });