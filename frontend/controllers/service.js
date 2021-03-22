var app = angular.module("sa_app", ['datatables']);
app.controller("controller", function ($scope, $http) {
    $scope.btnName = "Insert"; 
    $scope.insert = function () {                    
        if($scope.btnName == "Update"){
            $http.put(
                "http://local.restapicalculator.com/api/v1/service/"+$scope.id, {
                'type': $scope.type,
                'cost': $scope.cost,
                'status': $scope.status
            }
            ).success(function (data) {
                if(data.notice){
                    alert(data.notice.text);
                }else{
                    alert(data.error.text);
                }   
                $scope.type = null;
                $scope.cost = null;
                $scope.status = null;
                $scope.btnName = "Insert";
                $scope.show_data();
            });
        }else{
            if ($scope.type == null) {
                alert("Enter Your Name");
            } else if ($scope.cost == null) {
                alert("Enter Your Password");
            } else if ($scope.status == null) {
                alert("Enter Your Role");
            } else{
                $http.post(
                    "http://local.restapicalculator.com/api/v1/service", {
                    'type': $scope.type,
                    'cost': $scope.cost,
                    'status': $scope.status
                }
                ).success(function (data) {
                    if(data.notice){
                        alert(data.notice.text);
                    }else{
                        alert(data.error.text);
                    }
                    $scope.type = null;
                    $scope.cost = null;
                    $scope.status = null;
                    $scope.show_data();
                });
            }
        }    
    }
    $scope.show_data = function () {
        //TODO use pagination from server
        $http.get('http://local.restapicalculator.com/api/v1/services')
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
            $http.put(
                "http://local.restapicalculator.com/api/v1/service/"+id, {
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
    $scope.generate_random_string = function (){
        $http.get('https://www.random.org/strings/?num=10&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')
        .success(function (data) {
            alert(data.replace(/\n/g,''));
        });        
    }
});