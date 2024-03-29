$("#searchInp").on("keyup", function () {
  // your code
});

$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    $.ajax({
      url: "getAll.php",
      type: "GET",
      dataType: "json",
      success: function (result) {
        var resultCode = result.status.code;
        if (resultCode == 200) {
          $("#personnelTableBody").html("");

          $.each(result.data, function () {
            $("#personnelTableBody").append(
              '<tr><td class="align-middle text-nowrap">' +
                this.lastName +
                ", " +
                this.firstName +
                '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
                this.jobTitle +
                '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
                this.location +
                '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
                this.email +
                `</td><td class="text-end text-nowrap"><button
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#editPersonnelModal"
              data-id="${this.id}"
            >
              <i class="fa-solid fa-pencil fa-fw"></i>
            </button>
            <button
              type="button"
              class="btn btn-primary btn-sm deletePersonnelBtn"
              data-id="${this.id}"
            >
              <i class="fa-solid fa-trash fa-fw"></i>
            </button>
          </td>
        </tr>`
            );
          });
        } else {
          $("#personnelTableBody").html(
            "<tr><td colspan='7'>No data available</td></tr>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#personnelTableBody").html(
          "<tr><td colspan='7'>An error occurred</td></tr>"
        );
      },
    });
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Refresh department table
      $.ajax({
        url: "getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
          var resultCode = result.status.code;
          if (resultCode == 200) {
            $("#departmentTableBody").html("");

            $.each(result.data, function () {
              $("#departmentTableBody").append(
                '<tr><td class="align-middle text-nowrap">' +
                  this.name +
                  '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
                  this.locationName +
                  `</td>
                  <td class="align-middle text-end text-nowrap">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editDepartmentModal"
                      data-id="${this.id}"
                    >
                      <i class="fa-solid fa-pencil fa-fw"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm deleteDepartmentBtn"
                      data-id="${this.id}"
                    >
                      <i class="fa-solid fa-trash fa-fw"></i>
                    </button>
                  </td>
                </tr>`
              );
            });
          } else {
            $("#departmentTableBody").html(
              "<tr><td colspan='7'>No data available</td></tr>"
            );
          }
        },
      });
    } else {
      // Refresh location table
      $.ajax({
        url: "getAllLocations.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
          var resultCode = result.status.code;
          if (resultCode == 200) {
            $("#locationTableBody").html("");

            $.each(result.data, function () {
              $("#locationTableBody").append(
                '<tr><td class="align-middle text-nowrap">' +
                  this.name +
                  `</td>
                  <td class="align-middle text-end text-nowrap">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editLocationModal"
                      data-id="${this.id}"
                    >
                      <i class="fa-solid fa-pencil fa-fw"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm deleteLocationBtn"
                      data-id="${this.id}"
                    >
                      <i class="fa-solid fa-trash fa-fw"></i>
                    </button>
                  </td>
                </tr>`
              );
            });
          } else {
            $("#locationTableBody").html(
              "<tr><td colspan='7'>No data available</td></tr>"
            );
          }
        },
      });
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

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "getPersonnelByID.php",
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

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.personnel[0].departmentID
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

$("#editDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editDepartmentID").val(result.data.department[0].id);
        $("#editDepartmentName").val(result.data.department[0].name);
        $("#editDepartmentLocation").html("");
        $.each(result.data.location, function () {
          $("#editDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

$("#editLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;
      console.log(result);
      if (resultCode == 200) {
        $("#editLocationID").val(result.data[0].id);
        $("#editLocationName").val(result.data[0].name);
      } else {
        $("#editLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith("Error retrieving data");
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
    url: "editPersonnel.php",
    type: "POST",
    data: {
      id: $("#editPersonnelEmployeeID").val(),
      firstName: $("#editPersonnelFirstName").val(),
      lastName: $("#editPersonnelLastName").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      email: $("#editPersonnelEmailAddress").val(),
      departmentID: $("#editPersonnelDepartment").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#editPersonnelModal").modal("hide");
        $("#refreshBtn").click();
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error saving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith("Error saving data");
    },
  });
});

$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data
  console.log('here');
  $.ajax({
    url: "editDepartment.php",
    type: "POST",
    data: {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#editDepartmentModal").modal("hide");
        $("#refreshBtn").click();
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error saving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith("Error saving data");
    },
  });
});

$("#editLocationForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data

  $.ajax({
    url: "editLocation.php",
    type: "POST",
    data: {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#editLocationModal").modal("hide");
        $("#refreshBtn").click();
      } else {
        $("#editLocationModal .modal-title").replaceWith("Error saving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith("Error saving data");
    },
  });
});
