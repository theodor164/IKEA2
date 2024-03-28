<?php

	error_reporting(E_ERROR | E_PARSE);  //SA NU AFISEZE AVERTISMENTELE IN PHP CAND O VARIABILA NU ESTE INCA DEFINITA

	$server_name = "localhost";
	$username    = "root";
	$password    = "";
	$db_name     = "companydb";

	$conn = mysqli_connect($server_name, $username, $password, $db_name) or die("Conexiunea nu a reusit!");
?>