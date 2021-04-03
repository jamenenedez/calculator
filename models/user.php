<?php
$conn = mysqli_connect("localhost", "root", "Estudios-*2020", "API_CALCULATOR");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    $btn_name = $info->btnName;
    if ($btn_name == "Delete") {
        if (count($info) > 0) {
            $id = $info->id;
            $query = "Update User SET status = 'inactive' WHERE id = $id";
            if (mysqli_query($conn, $query)) {
                echo 'Data Deleted Successfully...';
            } else {
                echo 'Failed';
            }
        }
    } else {
        $uuid = uniqid();
        $username = mysqli_real_escape_string($conn, $info->username);
        $password = mysqli_real_escape_string($conn, $info->password);
        $role = mysqli_real_escape_string($conn, $info->role);
        $status  = mysqli_real_escape_string($conn, $info->status);

        if ($btn_name == "Insert") {
            $query = "INSERT INTO User(uuid, username, password, role, status) VALUES ('$uuid', '$name', '$password', '$role', '$status')";
            if (mysqli_query($conn, $query)) {
                echo "Data Inserted Successfully...";
            } else {
                echo 'Failed';
            }
        }
        if ($btn_name == "Update") {
            $id = $info->id;
            $query = "UPDATE User SET username = '$username', password = '$password', role = '$role' WHERE id = '$id'";
            if (mysqli_query($conn, $query)) {
                echo 'Data Updated Successfully...';
            } else {
                echo 'Failed';
            }
        }
    }
} else {
    $output = array();
    $query  = "SELECT * FROM User WHERE status <> 'inactive' ";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $output[] = $row;
        }
        echo json_encode($output);
    }
}
