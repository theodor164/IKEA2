<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=<id>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	
	// this includes the login details
	
	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	// SQL statement accepts parameters and so is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

	$query = $conn->prepare('INSERT INTO location (name) VALUES(?)');

	$query->bind_param("s", $_REQUEST['name']);

	$query->execute();
	
	if (false === $query) {

		// Update failed
    $response = [
      'status' => [
        'code' => 500,
        'message' => 'Error updating record: ' . $conn->error
      ]
    ];

	} else {
		$response = [
      'status' => [
        'code' => 200,
        'message' => 'Success'
      ]
    ];
	}

	// Close the database connection
  $conn->close();

  // Send the response as JSON
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;

?>