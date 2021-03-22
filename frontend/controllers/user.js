var app = angular.module("sa_app", ['datatables']);
app.controller("controller", function ($scope, $http) {
    $scope.btnName = "Insert";    
    $scope.insert = function () {                    
        if($scope.btnName == "Update"){
            $http.put(
                "http://local.restapicalculator.com/api/v1/user/"+$scope.id, {
                'username': $scope.username,
                'password': $scope.password,
                'role': $scope.role,
                'status': $scope.status
            }
            ).success(function (data) {
                if(data.notice){
                    alert(data.notice.text);
                }else{
                    alert(data.error.text);
                }   
                $scope.username = null;
                $scope.password = null;
                $scope.role = null;
                $scope.status = null;
                $scope.btnName = "Insert";
                $scope.show_data();
            });
        }else{
            if ($scope.username == null) {
                alert("Enter Your Name");
            } else if ($scope.password == null) {
                alert("Enter Your Password");
            } else if ($scope.role == null) {
                alert("Enter Your Role");
            } else if ($scope.status == null) {
                alert("Enter Your Status");
            }else{
                $http.post(
                    "http://local.restapicalculator.com/api/v1/user", {
                    'username': $scope.username,
                    'password': $scope.password,
                    'role': $scope.role,
                    'status': $scope.status
                }
                ).success(function (data) {
                    if(data.notice){
                        alert(data.notice.text);
                    }else{
                        alert(data.error.text);
                    }
                    $scope.username = null;
                    $scope.password = null;
                    $scope.role = null;
                    $scope.status = null;
                    $scope.show_data();
                });
            }
        }    
    }
    $scope.show_data = function () {
        //TODO use pagination from server
        $http.get('http://local.restapicalculator.com/api/v1/users')
        .success(function (data) {
            $scope.names = data;
        });
    }
    $scope.update_data = function (id, username, password, role, status) {
        $scope.id = id;
        $scope.username = username;
        $scope.password = password;
        $scope.role = role;
        $scope.status = status;
        $scope.btnName = "Update";        
    }
    $scope.delete_data = function (id) {
        if (confirm("Are you sure you want to delete?")) {
            $http.put(
                "http://local.restapicalculator.com/api/v1/user/"+id, {
                'status': 'inactive'
            }
            ).success(function (data) {
                if(data.notice){
                    alert(data.notice.text.replace("Updated", "Deleted"));
                }else{
                    alert(data.error.text);
                }   
                $scope.show_data();
            });
        } else {
            return false;
        }
    }
});