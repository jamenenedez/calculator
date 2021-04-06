angular.module("app")
    .controller("recordCtrl", ["$scope", "$http", "$resource", "localStorageService", function(m, h, r, s) {
        m.record = {};
        m.id = s.get("id");
        m.btnName = "Insert";
        m.record.services = r(s.get('host') + '/api/v1/services?status=active').query();
        m.record.users = r(s.get('host') + '/api/v1/users').query();
        m.insert_data = function() {
            if (m.btnName == "Update") {
                h.put(
                    s.get('host') + "/api/v1/record/" + m.record.id, {
                        'service_id': m.record.service_id,
                        'user_id': m.record.user_id,
                        'service_response': m.record.service_response,
                        'cost': m.record.cost,
                        'btnName': m.btnName,
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text);
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element("#_form").modal("hide");
                    m.service_id = null;
                    m.user_id = null;
                    m.service_response = null;
                    m.cost = null;
                    m.btnName = "Insert";
                    m.show_data();
                });
            }
        }
        m.show_data = function(load = 'full') {
            let params = { status: '@status' };
            if (load == 'custom') {
                params.user_id = '@user_id';
                m.records = r(s.get('host') + '/api/v1/records?user_id=:user_id&status=:status', params)
                    .query({ status: 'active', user_id: m.id });
            } else {
                m.records = r(s.get('host') + '/api/v1/records?status=:status', params)
                    .query({ status: 'active' });
            }
            if (load == 'full') {
                setTimeout(() => {
                    var table = angular.element("#recordDatatable").DataTable();
                    // Setup datatable search field
                    angular.element("input[type='search']").on('keyup', function() {
                        let column = 2;
                        table.columns(column).search(this.value).draw();
                    });
                }, 500);
            }

        }
        m.update_data = function(id, type, cost, status) {
            m.id = id;
            m.type = type;
            m.cost = cost;
            m.status = status;
            m.btnName = "Update";
        }
        m.delete_data = function(id) {
            if (confirm("Are you sure you want to delete?")) {
                h.put(
                    s.get('host') + "/api/v1/record/" + id, {
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
            m.record.service_id = null;
            m.record.user_id = null;
            m.record.cost = null;
        }
        m.show_form = function() {
            m.update = !m.update;
            m.details = !m.details;
            if (m.behavior_btn == "View details") {
                m.behavior_btn = "Edit";
            } else {
                m.behavior_btn = "View details";
            }

            if (m.header_name == "Update record") {
                m.header_name = "Record details";
            } else {
                m.header_name = "Update record";
            }
        }
        m.show_details = function(x, load = 'full') {
            m.record.id = x.id;
            m.record.uuid = x.uuid;
            m.record.service_id = x.service_id;
            m.record.user_id = x.user_id;
            m.record.service_response = x.service_response;
            m.record.service = x.type;
            m.record.user = x.username;
            m.record.cost = parseFloat(x.cost);

            if (load == 'custom') {
                m.personal = true;
            } else {
                m.personal = false;
            }

            m.details = true;
            m.update = false;
            m.insert = false;
            m.header_name = "Record details";
            m.header_description = "Record full info";
            m.behavior_btn = "Edit";
            m.submit_button = 'Save';
            m.btnName = "Update";
            angular.element("#_form").modal("show");
        }
        m.create_data = function() {
            m.details = false;
            m.insert = true;
            m.update = false;

            m.record.id = null;
            m.record.uuid = null;
            m.record.type = null;
            m.record.cost = null;

            m.header_name = "Create new record";
            m.submit_button = 'Save';
            m.btnName = "Insert";
            angular.element("#_form").modal("show");
        }
        m.checkAccess = function() {
            return s.get("role") == 'admin';
        }
    }]).controller('createCtrl', ["$scope", "$http", "$resource", "localStorageService", function(m, h, r, s) {
        m.record = {};
        m.record.user_id = s.get("id");
        m.record.operation = "";
        m.record.result = "";
        m.record.services = r(s.get('host') + '/api/v1/services?status=active').query();
        m.create_data = function() {
            if (m.record.service_id == null) {
                alert("Select a Service");
            } else {
                angular.element('#overlay').fadeIn();
                h.post(
                    s.get('host') + "/api/v1/record", {
                        'str': m.record.operation,
                        'user_id': m.record.user_id,
                    }
                ).then(function(response) {
                    if (response.data.result) {
                        m.record.result = response.data.result.value;
                        /* alert(response.data.result.value); */
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element('#overlay').fadeOut();

                    /* m.record.service_id = null;
                    m.record.operation = ""; */
                });
            }
        }
        m.updateOperation = function(id) {
            let countService = m.record.services.length;
            m.record.result = "";
            for (let i = 0; i < countService; i++) {
                if (m.record.services[i].id == id) {
                    if (!m.record.operation.length) {
                        m.record.operation = m.record.services[i].type + " ";
                        break;
                    } else {
                        m.record.operation = m.record.operation.replace(/\w+/, m.record.services[i].type);
                        break;
                    }
                }
            }
            m.check();
        }
        m.check = function() {
            let rndstr_id = null;
            let countService = m.record.services.length;
            for (let i = 0; i < countService; i++) {
                if (m.record.services[i].type == 'random_string') {
                    rndstr_id = m.record.services[i].id;
                    break;
                }
            }

            return (m.record.service_id == undefined || m.record.service_id == "" || (m.record.service_id == rndstr_id)) ? true : false;
        }
        m.checkAccess = function() {
            return s.get("role") == 'admin';
        }
    }]).filter('wrap', function() {
        return function(input, length) {
            // do some bounds checking here to ensure it has that index
            if (input && length) {
                if (input.length >= 25) {
                    let tokens = [];
                    let inputLength = input.length;
                    let i = 0;
                    for (let j = 0; j < inputLength; j++) {
                        tokens.push(input.slice(i, j * length));
                        i = (j * length + 1);
                    }
                    return tokens.join('\n');
                }
                return input;
            }
            return false;
        }
    });