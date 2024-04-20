var currentFilterDepartmentSelect = 0;
var currentFilterLocationSelect = 0;

$("#searchInp").on("keyup", function () {
  // your code

  var value = $(this).val().toLowerCase();
  if ($("#departmentsBtn").hasClass("active")) {
    $("#departmentTableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  }
  if ($("#locationsBtn").hasClass("active")) {
    $("#locationTableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  }

  $.ajax({
    url: "./model/SearchAll.php",
    type: "POST",
    dataType: "json",
    data: {
      txt: value,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        if ($("#personnelBtn").hasClass("active")) {
          $("#personnelTableBody").html("");
          let rows = "";
          $.each(result.data.found, function () {
            rows +=
              '<tr><td class="align-middle text-nowrap">' +
              this.lastName +
              ", " +
              this.firstName +
              '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
              this.jobTitle +
              '</td><td class="align-middle text-nowrap d-none d-md-table-cell">' +
              this.locationName +
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
        </tr>`;
          });
          $("#personnelTableBody").append(rows);
        }
      }
    },
  });
});

$("#refreshBtn").click(function () {
  $("#filterPersonnelByDepartment").val(0);
  $("#filterPersonnelByLocation").val(0);
  currentFilterDepartmentSelect = 0;
  currentFilterLocationSelect = 0;
  $("#searchInp").val("");
  if ($("#personnelBtn").hasClass("active")) {
    $.ajax({
      url: "./model/getAll.php",
      type: "GET",
      dataType: "json",
      success: function (result) {
        var resultCode = result.status.code;
        if (resultCode == 200) {
          $("#personnelTableBody").html("");
          let rows = "";
          $.each(result.data, function () {
            rows +=
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
        </tr>`;
          });
          $("#personnelTableBody").append(rows);
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
        url: "./model/getAllDepartments.php",
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
        url: "./model/getAllLocations.php",
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

$("#filterPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./model/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#filterPersonnelByDepartment").html("");
        $("#filterPersonnelByDepartment").append(
          $("<option>", {
            value: 0,
            text: "All",
          })
        );
        $.each(result.data, function () {
          $("#filterPersonnelByDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
        $("#filterPersonnelByDepartment").val(currentFilterDepartmentSelect);
      } else {
        $("#filterPersonnelByDepartment").html(
          "<option>No data available</option>"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelByDepartment").html(
        "<option>An error occurred</option>"
      );
    },
  });

  $.ajax({
    url: "./model/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#filterPersonnelByLocation").html("");
        $("#filterPersonnelByLocation").append(
          $("<option>", {
            value: 0,
            text: "All",
          })
        );
        $.each(result.data, function () {
          $("#filterPersonnelByLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
        $("#filterPersonnelByLocation").val(currentFilterLocationSelect);
      } else {
        $("#filterPersonnelByLocation").html(
          "<option>No data available</option>"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelByLocation").html(
        "<option>An error occurred</option>"
      );
    },
  });
});

$("#filterPersonnelByDepartment").change(function () {
  // your code
  currentFilterDepartmentSelect = $(this).val();
  currentFilterLocationSelect = 0; // Reset location select
  $("#filterPersonnelByLocation").val(0);
  var departmentID = $(this).val();
  $.ajax({
    url: "./model/filterByDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      departmentID: departmentID,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#personnelTableBody").html("");
        let rows = "";
        $.each(result.data, function () {
          rows +=
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
        </tr>`;
        });
        $("#personnelTableBody").append(rows);
      } else {
        $("#personnelTableBody").html(
          "<tr><td colspan='7'>No data available</td></tr>"
        );
      }
    },
  });
});

$("#filterPersonnelByLocation").change(function () {
  // your code
  currentFilterLocationSelect = $(this).val(); // Update variable with selected value
  currentFilterDepartmentSelect = 0; // Reset department select
  $("#filterPersonnelByDepartment").val(0);
  var locationID = $(this).val();
  $.ajax({
    url: "./model/filterByLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      locationID: locationID,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#personnelTableBody").html("");
        let rows = "";
        $.each(result.data, function () {
          rows +=
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
        </tr>`;
        });
        $("#personnelTableBody").append(rows);
      } else {
        $("#personnelTableBody").html(
          "<tr><td colspan='7'>No data available</td></tr>"
        );
      }
    },
  });
});

$("#addBtn").click(function () {
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
  if ($("#personnelBtn").hasClass("active")) {
    $("#addPersonnelModal").modal("show");

    $.ajax({
      url: "./model/getAllDepartments.php",
      type: "GET",
      dataType: "json",
      success: function (result) {
        var resultCode = result.status.code;
        if (resultCode == 200) {
          $("#addPersonnelDepartment").html("");
          $.each(result.data, function () {
            $("#addPersonnelDepartment").append(
              $("<option>", {
                value: this.id,
                text: this.name,
              })
            );
          });
        } else {
          $("#addPersonnelDepartment").html(
            "<option>No data available</option>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#addPersonnelDepartment").html("<option>An error occurred</option>");
      },
    });
    // Insert a new person into the personnel table
    $("#addPersonnelForm").on("submit", function (e) {
      e.preventDefault();
      $.ajax({
        url: "./model/getAll.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
          var resultCode = result.status.code;
          let maxId = 0;
          if (resultCode == 200) {
            result.data.forEach(function (item) {
              if (item.id > maxId) {
                maxId = item.id;
              }
            });
          }
          $.ajax({
            url: "./model/insertPersonnel.php",
            type: "POST",
            data: {
              id: parseInt(maxId) + 1,
              firstName: $("#addPersonnelFirstName").val(),
              lastName: $("#addPersonnelLastName").val(),
              jobTitle: $("#addPersonnelJobTitle").val(),
              email: $("#addPersonnelEmailAddress").val(),
              departmentID: $("#addPersonnelDepartment").val(),
            },
            success: function (result) {
              var resultCode = result.status.code;
              if (resultCode == 200) {
                $("#addPersonnelFirstName").html("");
                $("#addPersonnelFirstName").val("");
                $("#addPersonnelLastName").val("");
                $("#addPersonnelJobTitle").val("");
                $("#addPersonnelEmailAddress").val("");
                $("#addPersonnelModal").modal("hide");
                $("#addPersonnelForm").off("submit");

                $("#refreshBtn").click();
              } else {
                $("#addPersonnelModal .modal-title").replaceWith(
                  "Error saving data"
                );
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#addPersonnelModal .modal-title").replaceWith(
                "Error saving data"
              );
            },
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#personnelTableBody").html(
            "<tr><td colspan='7'>An error occurred</td></tr>"
          );
        },
      });
    });
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      $("#addDepartmentModal").modal("show");
      $.ajax({
        url: "./model/getAllLocations.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
          var resultCode = result.status.code;
          if (resultCode == 200) {
            $("#addDepartmentLocation").html("");
            $.each(result.data, function () {
              $("#addDepartmentLocation").append(
                $("<option>", {
                  value: this.id,
                  text: this.name,
                })
              );
            });
          } else {
            $("#addDepartmentLocation").html(
              "<option>No data available</option>"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#addDepartmentLocation").html(
            "<option>An error occurred</option>"
          );
        },
      });

      $("#addDepartmentForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
          url: "./model/insertDepartment.php",
          type: "POST",
          data: {
            name: $("#addDepartmentName").val(),
            locationID: $("#addDepartmentLocation").val(),
          },
          success: function (result) {
            var resultCode = result.status.code;
            if (resultCode == 200) {
              $("#addDepartmentName").val("");
              $("#addDepartmentModal").modal("hide");
              $("#addDepartmentForm").off("submit");
              $("#refreshBtn").click();
            } else {
              $("#addDepartmentModal .modal-title").replaceWith(
                "Error saving data"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#addDepartmentModal .modal-title").replaceWith(
              "Error saving data"
            );
          },
        });
      });
    } else {
      $("#addLocationModal").modal("show");
      $("#addLocationForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
          url: "./model/insertLocation.php",
          type: "POST",
          data: {
            name: $("#addLocationName").val(),
          },
          success: function (result) {
            var resultCode = result.status.code;
            if (resultCode == 200) {
              $("#addLocationName").val("");
              $("#addLocationModal").modal("hide");
              $("#addLocationForm").off("submit");
              $("#refreshBtn").click();
            } else {
              $("#addLocationModal .modal-title").replaceWith(
                "Error saving data"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#addLocationModal .modal-title").replaceWith(
              "Error saving data"
            );
          },
        });
      });
    }
  }
});

$("document").ready(function () {
  // Load personnel data
  $("#refreshBtn").click();
});

$("#personnelBtn").click(function () {
  // Call function to refresh personnel table
  $("#refreshBtn").click();
});

$("#departmentsBtn").click(function () {
  // Call function to refresh department table
  $("#refreshBtn").click();
});

$("#locationsBtn").click(function () {
  // Call function to refresh location table
  $("#refreshBtn").click();
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./model/getPersonnelByID.php",
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
    url: "./model/getDepartmentByID.php",
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
    url: "./model/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;
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
    url: "./model/editPersonnel.php",
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
        $("#editPersonnelModal .modal-title").replaceWith("Error saving data");
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
  $.ajax({
    url: "./model/editDepartment.php",
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
        $("#editDepartmentModal .modal-title").replaceWith("Error saving data");
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
    url: "./model/editLocation.php",
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

$(document).on("click", ".deletePersonnelBtn", function () {
  // AJAX call to delete personnel

  const personnelID = $(this).attr("data-id");

  $("#deletePersonnelModal").modal("show");

  $.ajax({
    url: "./model/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: personnelID,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        $("#employee-name").html(
          result.data.personnel[0].lastName +
            " " +
            result.data.personnel[0].firstName
        );
      } else {
        $("#employee-name").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#employee-name").html("Error retrieving data");
    },
  });

  $("#deletePersonnelBtn").click(function () {
    $.ajax({
      url: "./model/deletePersonnelByID.php",
      type: "POST",
      data: {
        id: personnelID,
      },
      success: function (result) {
        var resultCode = result.status.code;
        if (resultCode == 200) {
          $("#refreshBtn").click();
          $("#deletePersonnelModal").modal("hide");
        } else {
          alert("Error deleting data");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error deleting data");
      },
    });
  });
});

$(document).on("click", ".deleteDepartmentBtn", function () {
  // AJAX call to delete department

  // AJAX call to get all personnel and check if the id of the department exists in one of the personnel
  // If it does, then don't delete the department
  // If it doesn't, then delete the department
  const departmentID = $(this).attr("data-id");

  $.ajax({
    url: "./model/checkDepartmentUse.php",
    type: "POST",
    data: {
      id: departmentID,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        if (result.data[0].personnel_count > 0) {
          $("#preventDeleteDepartmentModal").modal("show");
          $("#personnel-count").html(result.data[0].personnel_count);
        } else {
          $("#deleteDepartmentModal").modal("show");

          $.ajax({
            url: "./model/getDepartmentByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: departmentID,
            },
            success: function (result) {
              var resultCode = result.status.code;
              if (resultCode == 200) {
                $("#department-name").html(result.data.department[0].name);
              } else {
                $("#department-name").html("Error retrieving data");
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#department-name").html("Error retrieving data");
            },
          });

          $("#deleteDepartmentBtn").click(function () {
            $.ajax({
              url: "./model/getAll.php",
              type: "GET",
              dataType: "json",
              success: function (result) {
                var resultCode = result.status.code;
                if (resultCode == 200) {
                  var personnelExist = false;
                  result.data.forEach(function (item) {
                    if (
                      parseInt(item.departmentID) === parseInt(departmentID)
                    ) {
                      personnelExist = true;
                      return;
                    }
                  });
                  if (personnelExist) {
                    alert("Cannot delete department as personnel exist");
                    $("#deleteDepartmentModal").modal("hide");
                  } else {
                    $.ajax({
                      url: "./model/deleteDepartmentByID.php",
                      type: "POST",
                      data: {
                        id: departmentID,
                      },
                      success: function (result) {
                        var resultCode = result.status.code;
                        if (resultCode == 200) {
                          $("#refreshBtn").click();
                          $("#deleteDepartmentModal").modal("hide");
                        } else {
                          alert("Error deleting data");
                        }
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        alert("Error deleting data");
                      },
                    });
                  }
                } else {
                  alert("Error deleting data");
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                alert("Error deleting data");
              },
            });
          });
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
  });
});

$(document).on("click", ".deleteLocationBtn", function () {
  // AJAX call to delete location

  // AJAX call to get all departments and check if the id of the location exists in one of the departments
  // If it does, then don't delete the location
  // If it doesn't, then delete the location
  const locationID = $(this).attr("data-id");

  $.ajax({
    url: "./model/checkLocationUse.php",
    type: "POST",
    data: {
      id: locationID,
    },
    success: function (result) {
      var resultCode = result.status.code;
      if (resultCode == 200) {
        if (result.data[0].department_count > 0) {
          $("#preventDeleteLocationModal").modal("show");
          $("#department-count").html(result.data[0].department_count);
        } else {
          $("#deleteLocationModal").modal("show");

          $.ajax({
            url: "./model/getLocationByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: locationID,
            },
            success: function (result) {
              var resultCode = result.status.code;
              if (resultCode == 200) {
                $("#location-name").html(result.data[0].name);
              } else {
                $("#location-name").html("Error retrieving data");
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#location-name").html("Error retrieving data");
            },
          });

          $("#deleteLocationBtn").click(function () {
            $.ajax({
              url: "./model/deleteLocationByID.php",
              type: "POST",
              data: {
                id: locationID,
              },
              success: function (result) {
                var resultCode = result.status.code;
                if (resultCode == 200) {
                  $("#refreshBtn").click();
                  $("#deleteLocationModal").modal("hide");
                } else {
                  alert("Error deleting data");
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                alert("Error deleting data");
              },
            });
          });
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
  });
});
