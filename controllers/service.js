angular.module("app")
    .controller("serviceCtrl", ["$scope", "$http", "$resource", "localStorageService", function(m, h, r, s) {
        m.service = {};
        m.service.statuses = ['active', 'beta', 'inactive'];
        m.btnName = "Insert";
        m.insert_data = function() {
            if (m.btnName == "Update") {
                h.put(
                    "http://local.restapicalculator.com/api/v1/service/" + m.service.id, {
                        'type': m.service.type,
                        'cost': m.service.cost,
                        'status': m.service.status
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text);
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element("#_form").modal("hide");
                    m.service.type = null;
                    m.service.cost = null;
                    m.service.status = null;
                    m.btnName = "Insert";
                    m.show_data();
                });
            } else {
                if (m.service.type == null) {
                    alert("Enter Service Type");
                } else if (m.service.cost == null) {
                    alert("Enter Service Cost");
                } else if (m.service.status == null) {
                    alert("Enter Service Status");
                } else {
                    h.post(
                        "http://local.restapicalculator.com/api/v1/service", {
                            'type': m.service.type,
                            'cost': m.service.cost,
                            'status': m.service.status
                        }
                    ).then(function(response) {
                        if (response.data.notice) {
                            alert(response.data.notice.text);
                        } else {
                            alert(response.data.error.text);
                        }
                        m.service.type = null;
                        m.service.cost = null;
                        m.service.status = null;
                        m.show_data();
                    });
                }
            }
        }
        m.show_data = function() {
            //TODO use pagination from server
            m.services = r('http://local.restapicalculator.com/api/v1/services?status=active').query();
        }
        m.delete_data = function(id) {
            if (confirm("Are you sure you want to delete?")) {
                angular.element('#overlay').fadeIn();
                h.put(
                    "http://local.restapicalculator.com/api/v1/service/" + id, {
                        'status': 'inactive'
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text.replace("Updated", "Deleted"));
                    } else {
                        alert(response.data.error.text);
                    }
                    angular.element('#overlay').fadeOut();
                    angular.element("#_form").modal("hide");
                    m.show_data();
                });
            } else {
                return false;
            }
        }
        m.cancel_data = function() {
            m.service.type = null;
            m.service.cost = null;
            m.service.status = null;
        }
        m.show_form = function() {
            m.update = !m.update;
            m.details = !m.details;
            if (m.behavior_btn == "View details") {
                m.behavior_btn = "Edit";
            } else {
                m.behavior_btn = "View details";
            }

            if (m.header_name == "Update Service") {
                m.header_name = "Service details";
            } else {
                m.header_name = "Update Service";
            }
        }
        m.show_details = function(x) {
            m.service.id = x.id;
            m.service.uuid = x.uuid;
            m.service.type = x.type;
            m.service.cost = parseFloat(x.cost);
            m.service.status = x.status;

            m.details = true;
            m.update = false;
            m.insert = false;
            m.header_name = "Service details";
            m.header_description = "Service full info";
            m.behavior_btn = "Edit";
            m.submit_button = 'Save';
            m.btnName = "Update";
            angular.element("#_form").modal("show");
        }
        m.create_data = function() {
            m.details = false;
            m.insert = true;
            m.update = false;

            m.service.id = null;
            m.service.uuid = null;
            m.service.type = null;
            m.service.cost = null;
            m.service.status = null;

            m.header_name = "Create new service";
            m.submit_button = 'Save';
            m.btnName = "Insert";
            angular.element("#_form").modal("show");
        }
        m.checkAccess = function() {
            return s.get("role") == 'admin';
        }
    }]);