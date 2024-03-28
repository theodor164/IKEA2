<?php

	include_once "db.php";


	$select = mysqli_query($conn, "SELECT * FROM `personnel`") or exit(mysqli_error($conn));

	$n = mysqli_num_rows($select);
	
	$result_per_page = 10;
	$nr_of_pages = ceil($n / $result_per_page);
	//echo $nr_of_pages;
	
	if(!isset($_GET["page"]))
		$page = 1;
	else 
		$page = $_GET["page"];
	//for personnel
	$limit_low = ($page-1)*10;
	$limit_up = $page *10;
	$select2 =  mysqli_query($conn, "SELECT personnel.*, department.name AS department_name, location.name AS location_name FROM personnel INNER JOIN department ON personnel.departmentID = department.id INNER JOIN  location ON department.locationID = location.id LIMIT ".$limit_low.",".$limit_up."") or exit(mysqli_error($conn));
	//for department
	$select3 =  mysqli_query($conn, "SELECT department.name AS department_name, location.name AS location_name FROM department INNER JOIN location ON department.locationID = location.id") or exit(mysqli_error($conn));
	$nr_departments = mysqli_num_rows($select3);
	
	//for location
	$select4 =  mysqli_query($conn, "SELECT * FROM location") or exit(mysqli_error($conn));
	$nr_location = mysqli_num_rows($select4);
	


	require "vizualizare.php";
?>