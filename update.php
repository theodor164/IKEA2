<?php

	$select4 =  mysqli_query($conn, "UPDATE personnel SET departmentID = (SELECT department.id FROM department WHERE department.name = 'department_name') WHERE id = 'id';") or exit(mysqli_error($conn));
	$row = mysqli_fetch_assoc($select4);

	echo json_encode($row);

?>