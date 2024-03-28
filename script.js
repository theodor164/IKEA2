$("#searchInp").on("keyup", function () {
  // your code
});

$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    // Refresh personnel table
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Refresh department table
    } else {
      // Refresh location table
    }
  }
});

$("#filterBtn").click(function () {
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
});

$("#addBtn").click(function () {
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
});

$("#personnelBtn").click(function () {
  // Call function to refresh personnel table
});

$("#departmentsBtn").click(function () {
  // Call function to refresh department table
});

$("#locationsBtn").click(function () {
  // Call function to refresh location table
});

$(".deletePersonnelBtn").click(function() {
  // Get the ID of the person to be deleted from the data-id attribute
  var personId = $(this).data("id");

  // Set the data-id attribute of the confirmation button
  $("#confirmDeleteBtn").data("person-id", personId);

  // Show the modal
  $("#deleteConfirmationModal").modal("show");
});

// Handle confirmation delete button click
$("#confirmDeleteBtn").click(function() {
  // Retrieve the person ID from the data attribute
  var personId = $(this).data("person-id");

  // Call a function to delete the person from the database
  // You can use AJAX or any other method to perform the deletion

  // After deletion, close the modal
  $("#deleteConfirmationModal").modal("hide");
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
	
	
  $.ajax({
    url: "date.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
		id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;
		console.log(result);
      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted
		
        $("#editPersonnelEmployeeID").val(result.data.id);
        $("#editPersonnelFirstName").val(result.data.firstName);
        $("#editPersonnelLastName").val(result.data.lastName);
        $("#editPersonnelJobTitle").val(result.data.department_name);
        $("#editPersonnelEmailAddress").val(result.data.email);

        $("#editPersonnelDepartment").html("");

        $.each(result.data.department, function (index, value) {

          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: index,
              text: value,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.departmentID
        );
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Executes when the form button with type="submit" is clicked

$("#editPersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour
	
  e.preventDefault();
  // AJAX call to save form data
  	 $.ajax({
    url: "update.php",
    type: "POST",
    dataType: "json",
    data: {
		department_name: $("#editPersonnelDepartment").value(), 
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $("#editPersonnelEmployeeID").val()
    },
    success: function (result) {
      var resultCode = result.status.code;
		console.log(result);
      if (resultCode == 200) {
			$('#editPersonnelModal').modal('hide');
	  }
	},
	error: function (xhr, status, error) {
              console.error("Submit error:", status, error);
      },
	 });
});

