angular.module("app")
    .controller("serviceCtrl", function($scope, $http, $resource) {
        $scope.btnName = "Insert";
        $scope.insert = function() {
            if ($scope.btnName == "Update") {
                $http.put(
                    "http://local.restapicalculator.com/api/v1/service/" + $scope.id, {
                        'type': $scope.type,
                        'cost': $scope.cost,
                        'status': $scope.status
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text);
                    } else {
                        alert(response.data.error.text);
                    }
                    $scope.type = null;
                    $scope.cost = null;
                    $scope.status = null;
                    $scope.btnName = "Insert";
                    $scope.show_data();
                });
            } else {
                if ($scope.type == null) {
                    alert("Enter Your Name");
                } else if ($scope.cost == null) {
                    alert("Enter Your Password");
                } else if ($scope.status == null) {
                    alert("Enter Your Role");
                } else {
                    $http.post(
                        "http://local.restapicalculator.com/api/v1/service", {
                            'type': $scope.type,
                            'cost': $scope.cost,
                            'status': $scope.status
                        }
                    ).then(function(response) {
                        if (response.data.notice) {
                            alert(response.data.notice.text);
                        } else {
                            alert(response.data.error.text);
                        }
                        $scope.type = null;
                        $scope.cost = null;
                        $scope.status = null;
                        $scope.show_data();
                    });
                }
            }
        }
        $scope.show_data = function() {
            //TODO use pagination from server
            $scope.services = $resource('http://local.restapicalculator.com/api/v1/services?status=active').query();
            /* $http.get('http://local.restapicalculator.com/api/v1/services')
                .then(function(response) {
                    $scope.names = response.data;
                }); */
        }
        $scope.update_data = function(id, type, cost, status) {
            $scope.id = id;
            $scope.type = type;
            $scope.cost = cost;
            $scope.status = status;
            $scope.btnName = "Update";
        }
        $scope.delete_data = function(id) {
            if (confirm("Are you sure you want to delete?")) {
                $http.put(
                    "http://local.restapicalculator.com/api/v1/service/" + id, {
                        'status': 'inactive'
                    }
                ).then(function(response) {
                    if (response.data.notice) {
                        alert(response.data.notice.text.replace("Updated", "Deleted"));
                    } else {
                        alert(response.data.error.text);
                    }
                    $scope.show_data();
                });
            } else {
                return false;
            }
        }
        $scope.generate_random_string = function() {
            $http.get('https://www.random.org/strings/?num=10&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')
                .then(function(response) {
                    alert(response.data.replace(/\n/g, ''));
                });
        }
    });