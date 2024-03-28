<?php

	include_once "db.php";
	session_start();
	$select2 =  mysqli_query($conn, "SELECT personnel.*, department.name AS department_name, location.name AS location_name FROM personnel INNER JOIN department ON personnel.departmentID = department.id INNER JOIN  location ON department.locationID = location.id WHERE email='".$_SESSION['email']."'") or exit(mysqli_error($conn));
	$select3 =  mysqli_query($conn, "SELECT * FROM department");
	$row = mysqli_fetch_assoc($select2);

	$departments = array();
		for($i=1; $i<=12; $i++)
		{
			$row2 = mysqli_fetch_assoc($select3);
			$departments[] = $row2['name'];
		}


	 $data =array(
	 	"id"        => $row['id'],
		"firstName" => $row['firstName'],
		"lastName"  => $row['lastName'],
		"department_name" => $row['department_name'],
		"location_name" => $row['location_name'],
		"email"    => $row['email'],
		"department" => $departments
		);
		$response = array(
            "status" => array("code" => 200, "message" => "Success"),
            "data" => $data
        );
		echo json_encode($response);
		

		// Step 4: Convert PHP array to JSON
		//$jsonData = json_encode($departments);

		// Output JSON  
		//echo $jsonData;*/
?>