<?php
// Assuming this code is in the editPersonnel.php file

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the values from the POST data
  $id = $_POST['id'];
  $name = $_POST['name'];
  // Perform any necessary operations with the data
  // For example, update the personnel record in the database
  // Connect to the database (replace with your own database credentials)
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

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Prepare and execute the update query
  $sql = "UPDATE location SET name='$name' WHERE id='$id'";

  if ($conn->query($sql) === TRUE) {
    // Update successful
    $response = [
      'status' => [
        'code' => 200,
        'message' => 'Success'
      ]
    ];
  } else {
    // Update failed
    $response = [
      'status' => [
        'code' => 500,
        'message' => 'Error updating record: ' . $conn->error
      ]
    ];
  }

  // Close the database connection
  $conn->close();

  // Send the response as JSON
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
}
?>