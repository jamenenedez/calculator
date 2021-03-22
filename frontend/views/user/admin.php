<?php?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8"> 
<title>User Management</title>  
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="http://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-datatables/0.6.4/angular-datatables.js"></script>   
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="http://cdn.datatables.net/1.10.7/css/jquery.dataTables.css">
<script src="../../controllers/user.js"></script>  
</head>  
<body>  
<div class="col-md-12">
    <h3 align="center">User Management</h3>
    <div ng-app="sa_app" ng-controller="controller" ng-init="show_data()">
        <div class="col-md-6">
			<label>Name</label>
            <input type="text" name="username" ng-model="username" class="form-control">
            <br/>
            <label>Password</label>
            <input type="password" name="password" ng-model="password" class="form-control">
            <br/>
            <label>Role</label>
            <input type="text" name="role" ng-model="role" class="form-control">
            <br/>
			<label>Status</label>
            <input type="text" name="status" ng-model="status" class="form-control">
            <br/>
            <input type="hidden" ng-model="id">
            <input type="submit" name="insert" class="btn btn-primary" ng-click="insert()" value="{{btnName}}">
        </div>
        <div class="col-md-6">
            <table class="table table-bordered" datatable="ng">
				<thead>			
					<tr>
						<th>S.No</th>
						<th>User Name</th>                    
						<th>Role</th>
						<th>Status</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="x in names">
						<td>{{x.id}}</td>
						<td>{{x.username}}</td>
						<td>{{x.role}}</td>
						<td>{{x.status}}</td>
						<td>
							<button class="btn btn-success btn-xs" ng-click="update_data(x.id, x.username, x.password,x.role, x.status)">
								<span class="glyphicon glyphicon-edit"></span> Edit
							</button>
						</td>
						<td>
							<button class="btn btn-danger btn-xs" ng-click="delete_data(x.id)">
								<span class="glyphicon glyphicon-trash"></span> Delete
							</button>
						</td>
					</tr>
				</tbody>
            </table>
        </div>
    </div>
</div> 
</body>  
</html> 