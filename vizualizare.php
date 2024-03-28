<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>
  <body>
    <section>
      <div class="appHeader">
        <div class="row">
          <div class="col">
            <input
              id="searchInp"
              class="form-control mb-3"
              placeholder="search"
            />
          </div>

          <div class="col-6 text-end me-2">
            <div class="btn-group" role="group" aria-label="buttons">
              <button id="refreshBtn" type="button" class="btn btn-primary">
                <i class="fa-solid fa-refresh fa-fw"></i>
              </button>
              <button id="filterBtn" type="button" class="btn btn-primary">
                <i class="fa-solid fa-filter fa-fw"></i>
              </button>
              <button id="addBtn" type="button" class="btn btn-primary">
                <i class="fa-solid fa-plus fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="personnelBtn"
              data-bs-toggle="tab"
              data-bs-target="#personnel-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              <i class="fa-solid fa-person fa-lg fa-fw"></i
              ><span class="d-none d-sm-block">Personnel</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="departmentsBtn"
              data-bs-toggle="tab"
              data-bs-target="#departments-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              <i class="fa-solid fa-building fa-lg fa-fw"></i
              ><span class="d-none d-sm-block">Departments</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="locationsBtn"
              data-bs-toggle="tab"
              data-bs-target="#locations-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              <i class="fa-solid fa-map-location-dot fa-lg fa-fw"></i
              ><span class="d-none d-sm-block">Locations</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content bg-white">
        <div
          class="tab-pane show active"
          id="personnel-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <table class="table table-hover">
            <tbody id="personnelTableBody">
              <!-- Below is an example row. Create a JS function that interogates the database and 
            dynamically creates the HTML for the table contents. -->

<?php
	session_start();
//echo $limit_low." ".$limit_up;///////////////////////////////////////////////////////////////////////////////////////////////////////////
for ($i=$limit_low; $i<$limit_up; $i++){
		$row = mysqli_fetch_assoc($select2);

		if($row['firstName']==NULL)
			break;
		$_SESSION['email'] = $row['email'];
		echo "
              <tr>
                <td class='align-middle text-nowrap' id='namee'>".$row['firstName'].", ".$row['lastName']."</td>
                <td class='align-middle text-nowrap d-none d-md-table-cell'>".$row['department_name']."</td>
                <td class='align-middle text-nowrap d-none d-md-table-cell'>".$row['location_name']."</td>
                <td class='align-middle text-nowrap d-none d-md-table-cell' id='".$i."'>".$row['email']."</td>
                <td class='text-end text-nowrap'>
                  <button onclick=alert('".$row['email']."'); type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editPersonnelModal' data-id='".$row['email']."'>
                    <i class='fa-solid fa-pencil fa-fw'></i>
                  </button>
                  <button type='button' class='btn btn-primary btn-sm deletePersonnelBtn' data-idd='23'>
                    <i class='fa-solid fa-trash fa-fw'></i>
                  </button>
                </td>
              </tr>";
			 
			  //require_once("date.php");
/*
			  $data =array(
		"firstName" => $row['firstName'],
		"lastName"  => $row['lastName'],
		"department_name" => $row['department_name'],
		"location_name" => $row['location_name'],
		"email"    => $row['email']
		);
		$response = array(
            "status" => array("code" => 200, "message" => "Success"),
            "data" => $data
        );
		echo json_encode($response);
*/
	}
?>
            </tbody>
          </table>
<?php
	for($page=1; $page<=$nr_of_pages; $page++)
		echo "<a href='http://localhost/IKEA2/index.php?page=".$page."'> ".$page." </a>";
?>
        </div>

        <div
          class="tab-pane"
          id="departments-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <table class="table table-hover">
            <tbody id="departmentTableBody">
              <!-- Below is an example row. Create a JS function that interogates the database and 
            dynamically creates the HTML for the table contents. -->
<?php
for ($i=1; $i<=$nr_departments; $i++){
		$row = mysqli_fetch_assoc($select3);

		echo "
              <tr>
                <td class='align-middle text-nowrap'>".$row['department_name']."</td>
                <td class='align-middle text-nowrap d-none d-md-table-cell'>".$row['location_name']."</td>
                <td class='align-middle text-end text-nowrap'>
                  <button
                    type='button'
                    class='btn btn-primary btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#deleteDepartmentModal'
                    data-id='1'
                  >
                    <i class='fa-solid fa-pencil fa-fw'></i>
                  </button>
                  <button
                    type='button'
                    class='btn btn-primary btn-sm deleteDepartmentBtn'
                    data-id='1'
                  >
                    <i class='fa-solid fa-trash fa-fw'></i>
                  </button>
                </td>
              </tr>";
}
?>
            </tbody>
          </table>
        </div>

        <div class="tab-pane" id="locations-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
          <table class="table table-hover">
            <tbody id="locationTableBody">
              <!-- Below is an example row. Create a JS function that interogates the database and 
            dynamically creates the HTML for the table contents. -->
<?php
for ($i=1; $i<=$nr_location; $i++){
		$row = mysqli_fetch_assoc($select4);

		echo "
              <tr>
                <td class='align-middle text-nowrap'>".$row['name']."</td>
                <td class='align-middle text-end text-nowrap'>
                  <button type='button' class='btn btn-primary btn-sm'>
                    <i class='fa-solid fa-pencil fa-fw'></i>
                  </button>
                  <button type='button' class='btn btn-primary btn-sm'>
                    <i class='fa-solid fa-trash fa-fw'></i>
                  </button>
                </td>
              </tr>";
}
?>
            </tbody>
          </table>
        </div>
      </div>

      <footer class="border-top text-center fw-bold">
        <p class="fw-light my-3">Company Directory version 1.0</p>
      </footer>
    </section>
<!-------------------------------------------------------------------------------->
    <div id="editPersonnelModal" class="modal fade" tabindex="-1" data-bs-backdrop="false" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <!--   the last two classes centre the modal and, if the content is too long, ensures  -->
      <!--   that the header and footer are always on display by making the body scroll -->

      <div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow">
          <div class="modal-header bg-primary bg-gradient text-white">
            <h5 class="modal-title">Edit employee</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form id="editPersonnelForm">
              <input type="hidden" id="editPersonnelEmployeeID" />

              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editPersonnelFirstName" placeholder="First name" required/>
                <label for="editPersonnelFirstName">First name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="editPersonnelLastName"
                  placeholder="Last name"
                  required
                />
                <label for="editPersonnelLastName">Last name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="editPersonnelJobTitle"
                  placeholder="Job title"
                  required
                />
                <label for="editPersonnelJobTitle">Job Title</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="editPersonnelEmailAddress"
                  placeholder="Email address"
                  required
                />
                <label for="editPersonnelEmailAddress">Email Address</label>
              </div>

              <div class="form-floating">
                <select
                  class="form-select"
                  id="editPersonnelDepartment"
                  placeholder="Department"
                ></select>
                <label for="editPersonnelDepartment">Department</label>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="submit"
              form="editPersonnelForm"
              class="btn btn-outline-primary btn-sm myBtn"
            >
              SAVE
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm myBtn"
              data-bs-dismiss="modal"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- HTML code for the delete modal -->
    <div class="modal" id="deleteConfirmationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this person from the database?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <script
      src="https://kit.fontawesome.com/83764effb0.js"
      crossorigin="anonymous"
    ></script>
    <script src="jquery-3.7.1.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>