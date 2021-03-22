var app = angular.module("sa_app", ['datatables']);
app.controller("controller", function ($scope, $http) {
    $scope.btnName = "Insert";    
    $scope.insert = function () {
        if($scope.btnName == "Update"){

        }else{
            if ($scope.service_id == null) {
                alert("Select a Service");
            } else if ($scope.user_id == null) {
                alert("Select the User");
            }  else if ($scope.cost == null) {
                alert("Enter the Cost");
            } else {
                $http.post(
                    "http://local.restapicalculator.com/api/v1/record", {
                    'service_id': $scope.service_id,
                    'user_id': $scope.user_id,
                    'cost': $scope.cost,
                    'btnName': $scope.btnName,
                    'id': $scope.id
                }
                ).success(function (data) {
                    alert(data);
                    $scope.service_id = null;
                    $scope.user_id = null;
                    $scope.cost = null;
                    $scope.btnName = "Insert";
                    $scope.show_data();
                });
            }
        }
    }
    $scope.show_data = function () {
        $http.get('http://local.restapicalculator.com/api/v1/records')
        .success(function (data) {
            $scope.names = data;
        });
    }
    $scope.update_data = function (id, type, cost, status) {
        $scope.id = id;
        $scope.type = type;
        $scope.cost = cost;
        $scope.status = status;
        $scope.btnName = "Update";
    }
    $scope.delete_data = function (id) {
        if (confirm("Are you sure you want to delete?")) {
            $http.post("../../models/service.php", {
                'id': id,
                'btnName': 'Delete'
            })
            .success(function (data) {
                alert(data);
                $scope.show_data();
            });
        } else {
            return false;
        }
    }
    $scope.generate_random_string = function (){
        $http.get('https://www.random.org/strings/?num=10&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')
        .success(function (data) {
            alert(data.replace(/\n/g,''));
        });
    }
});