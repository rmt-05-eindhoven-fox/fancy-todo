function login(email, password) {
  $.ajax(`${baseUrl}/user/login`, {
      type: "POST",
      data: {
          email,
          password
      },
      success: function (succeed) {
        $("#errorMessage").hide()
        localStorage.setItem("token", succeed.token)
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Loading your page....',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            $("#loginRegPage").hide()
            $("#main").show()
            $("#UsernameButton").text(function () {
                return succeed.userFound.username
            })

        })
          getMyTodos()
      },
      error: function (err) {
          $("#errorMessage").text(function () {
              return err.responseJSON
          })
          $("#errorMessage").show()
      }
  })
}

function logout() {
  localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
  $("#loginRegPage").show()
  $("#errorMessage").hide()
  $("#main").hide()
}

function register(email, password, username) {
  $.ajax(`${baseUrl}/user/register`, {
      type: "POST",
      data: {
          email,
          password,
          username
      },
      success: function (registered) {
          $("#errorMessage").hide()
          localStorage.setItem("token", registered.token)
          localStorage.setItem("username", registered.userRegistered.username)
          localStorage.setItem("UserId", registered.userRegistered.id)
          $("#loginRegPage").hide()
          $("#main").show()

          $("#UsernameButton").text(function () {
              return registered.userRegistered.username
          })
          getMyTodos()

      },
      error: function (err) {
          let pesanerror = ""
          for (let i = 0; i < err.responseJSON.length; i++) {

              if (i == err.responseJSON.length - 1) {
                  pesanerror += err.responseJSON[i]
              } else {
                  pesanerror += err.responseJSON[i] + ", "
              }
          }

          $("#errorMessage").text(function () {
              return pesanerror
          })
          $("#errorMessage").show()
      }
  })
}

function getMyTodos() {
  $.ajax(`${baseUrl}/todos/all/mine`, {
      type: "GET",
      headers: {
          token: localStorage.getItem("token")
      },
      success: function (allMine) {
          $(".bodyNotDone").empty()
          $(".bodyDone").empty()
          let done = []
          let notDone = []
          for (let i of allMine) {
              if (i.status) {
                  done.push(i)
              } else {
                  notDone.push(i)
              }
          }
          let itNotDone = generateTable(notDone)

          $(".bodyNotDone").append(itNotDone)
          let itDone = generateTable(done)
          $(".bodyDone").append(itDone)
      },
      error: function (err) {
          swal('Oops...', 'Something went wrong!', "error")
      }
  })
}

function generateTable(list) {
  let forAppend = ""
  for (let i of list) {
      let tanggal = new Date(i.due_date).toDateString()
      let project

      if (i.ProjectId == null) {
          project = "Personal"
      } else {
          let nama = getNameProject(i.ProjectId)
          project = "Project"
      }
      forAppend += `
      <tr id=${i.id}>
      <td>${i.title}</td>
      <td>${i.description}</td>
      <td>${tanggal}</td>
      <td id="project_${i.id}">${project}</td>
      <td>
      <div class="d-flex">
      <div class="btn btn-primary" data-toggle="modal" data-target="#${i.id}" onclick="preedit(${i.id})"><i class="fas fa-edit"></i></div>
      <div class="btn btn-danger" id="${i.id}" onclick="predelete(${i.id})"><i class="fas fa-trash"></i></div>
      </div>
      </td>
      </tr>
      `

  }
  return forAppend
}

function createTodo(due_date, title, description, status) {
  $.ajax(`${baseUrl}/todos/`, {
      type: "POST",
      headers: {
          token: localStorage.getItem("token")
      },
      data: {
          due_date,
          title,
          description,
          status
      },
      success: function () {
          getMyTodos()
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function getNameProject(id) {
  $.ajax(`${baseUrl}/projects/api/name/${id}`, {
      type: "GET",
      success: function (found) {
          if (found) {
              $(`#project_${id}`).text(found.name)
          } else {
              $("#project_" + id).text("deleted project")
          }
      },
      error: function (err) {
          swal('Oops...', err, "error")
      }
  })
}

function preedit(id) {
  idTodoForEdit = id
  getTodoById(id, "editVanilla")

}

function getTodoById(id, statusedit) {
  $.ajax(`${baseUrl}/todos/${id}`, {
      type: "Get",
      success: function (resultGet) {
          let date = new Date(resultGet.due_date).toDateString()
          let statusNya
          if (resultGet.status) {
              statusNya = "Done"
          } else {
              statusNya = "Not Done"
          }
          if (statusedit == "editVanilla") {
              $("#editModal").modal("show")
              $("#titleEdit").val(resultGet.title)
              $("#descriptionEdit").val(resultGet.description)
              $("#statusEdit").children(`[value="${statusNya}"]`).attr('selected', true);
          } else {
              $("#modalEditTodoProject").modal("show")
              $("#titleEditTP").val(resultGet.title)
              $("#descriptionEditP").val(resultGet.description)
              $("#statusEditP").children(`[value="${statusNya}"]`).attr('selected', true);
          }
      },
      error: function (err) {
          swal("Oops...", err, "error")
      }
  })
}

function editTodo(id, title, status, due_date, description) {
  $.ajax(`${baseUrl}/todos/${id}`, {
      type: "PUT",
      headers: {
          token: localStorage.getItem("token")
      },
      data: {
          status,
          title,
          description,
          due_date
      },
      success: function () {

          $("#editModal").modal("hide")
          getMyTodos()
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function predelete(id) {
  $("#modalDelete").modal("show")
  $("#deleteTodo").click(function () {
      $.ajax(`${baseUrl}/todos/${id}`, {
          type: "DELETE",
          headers: {
              token: localStorage.getItem("token")
          },
          success: function () {
              $("#modalDelete").modal("hide")
              getMyTodos()
          },
          error: function (err) {
              let errorMessage = ""
              for (let j = 0; j < err.responseJSON.length; j++) {
                  if (j == err.responseJSON.length - 1) {
                      errorMessage += err.responseJSON[j]
                  } else {
                      errorMessage += err.responseJSON[j] + ", "
                  }
              }
              swal('Oops...', errorMessage, "error")
          }
      })
  })
}

function getMyProjects() {
  $.ajax(`${baseUrl}/projects/myProjects`, {
      type: "GET",
      headers: {
          token: localStorage.getItem("token")
      },
      success: function (gotResponse) {

          $("#cardProject").empty()
          let inCardProject = generateCardProject(gotResponse)
          $("#cardProject").append(inCardProject)
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function generateCardProject(responseGetProject) {
  let appendProject = ""
  if (responseGetProject.length > 0) {
      for (let perProject of responseGetProject) {
          appendProject += `
          <div class="card-header projectHeader text-align-center animated slideInUp">
              <div class= "d-flex mx-auto justify-content-between align-self-center">
                  <div class="d-flex">
                      ${perProject.Project.name}
                  </div>
                  <div class="d-flex">
                      <div class="btn btn-primary" onclick="newTodoProject(${perProject.ProjectId})" ><i class="fas fa-sticky-note"></i> New Todo</div>
                      <div class="btn btn-primary mx-2" onclick="preInvite(${perProject.ProjectId})"><i class="fas fa-envelope-open-text"></i> Invite Member</div>
                      <div class="btn btn-primary" onclick="previewMembers(${perProject.ProjectId})"><i class="fas fa-eye"></i> See Member</div>
                      <div class="btn btn-danger ml-2" onclick="preDeleteProject(${perProject.ProjectId})"><i class="fas fa-trash"></i></div>
                  </div>
              </div>
              </div>
          </div>
          <div class="card-body cardInside overflow-auto animated slideInUp">
              <table class="table">
                  <thead class="thead-dark">
                      <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Due Date</th>
                          
                          <th>Action</th>
                      </tr>
                  </thead>    
                  <tbody id="bodyProject${perProject.ProjectId}" ></tbody>
              </table>
          </div>
          `
          getTodoInProject(perProject.ProjectId)
          
      }
  } else {
      appendProject += `
      <div class="d-flex mx-auto justify-content-center text-align-center">
          <h2>Oops! No Project yet! Let's create a new one!</h2>
      </div>
      `
  }
  return appendProject
}

function addProject(name) {
  $.ajax(`${baseUrl}/projects/`, {
      type: "POST",
      headers: {
          token: localStorage.getItem("token")
      },
      data: {
          name
      },
      success: function () {
          getMyProjects()
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function getTodoInProject(id) {
  $.ajax(`${baseUrl}/projects/all/todo/${id}`, {
      type: "GET",
      success: function (hasilGet) {
          $(`#bodyProject${id}`).empty()
          let bodyProject = generateTableTodoProject(hasilGet)
          $(`#bodyProject${id}`).append(bodyProject)
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function generateTableTodoProject(hasilGet) {
  let forAppend = ""
  for (let satuan of hasilGet) {
      let statusnya
      if (satuan.status) {
          statusnya = "Done"
      } else {
          statusnya = "Not Done"
      }
      let tanggal = new Date(satuan.due_date).toDateString()
     forAppend += `
      <tr id=${satuan.id}>
      <td>${satuan.title}</td>
      <td>${satuan.description}</td>
      <td>${statusnya}</td>
      <td>${tanggal}</td>
    
      <td>
      <div class="d-flex">
      <div class="btn btn-primary" data-toggle="modal" data-target="#${satuan.id}" onclick="preeditTodoProject(${satuan.id})"><i class="fas fa-edit"></i></div>
      <div class="btn btn-danger" id="${satuan.id}" onclick="predeleteTodoProject(${satuan.id})"><i class="fas fa-trash"></i></div>
      </div>
      </td>
      </tr>
      `
  }
  return forAppend
}

function getUserById(id) {
  $.ajax(`${baseUrl}/user/${id}`, {
      type: "GET",
      success: function (result) {
          $("#assigned" + id).text(result.username)
      },
      error: function (err) {
          let errorMessage = ""
          for (let j = 0; j < err.responseJSON.length; j++) {
              if (j == err.responseJSON.length - 1) {
                  errorMessage += err.responseJSON[j]
              } else {
                  errorMessage += err.responseJSON[j] + ", "
              }
          }
          swal('Oops...', errorMessage, "error")
      }
  })
}

function preeditTodoProject(id) {
  idTodoForEditProject = id
  getTodoById(id, "editTodoProject")
}


function editTodoProject(id, title, status, due_date, description) {
  $.ajax(`${baseUrl}/projects/todo/${id}`, {
      type: "PUT",
      data: {
          title,
          status,
          due_date,
          description
      },
      headers: {
          token: localStorage.getItem("token")
      },
      success: function () {
          $("#modalEditTodoProject").modal("hide")
          getMyProjects()
      },
      error: function (err) {
          let errorMessage = err.responseJSON

          swal('Oops...', errorMessage, "error")
      }
  })
}

function predeleteTodoProject(id) {
  $("#modalDeleteTodoProject").modal("show")
  $("#deleteTodoProject").click(function () {
      $.ajax(`${baseUrl}/projects/todo/${id}`, {
          type: "DELETE",
          headers: {
              token: localStorage.getItem("token")
          },
          success: function () {
              $("#modalDeleteTodoProject").modal("hide")
              getMyProjects()
          },
          error: function (err) {
              let errorMessage = ""
              for (let j = 0; j < err.responseJSON.length; j++) {
                  if (j == err.responseJSON.length - 1) {
                      errorMessage += err.responseJSON[j]
                  } else {
                      errorMessage += err.responseJSON[j] + ", "
                  }
              }
              swal('Oops...', errorMessage, "error")
          }
      })
  })
}

function newTodoProject(idProject) {
  $("#newTodoModalProject").modal("show")
  $("#createTodoProject").click(function () {
      let due_date = $("#dueDateTodoProject").val()
      let title = $("#titleTodoProject").val()
      let description = $("#descriptionTodoProject").val()
      let status = false
      createTodoProject(idProject, due_date, title, description, status)
  })
}

function createTodoProject(id, due_date, title, description, status) {
  $.ajax(`${baseUrl}/projects/todo/${id}`, {
      type: "POST",
      data: {
          due_date,
          title,
          description,
          status
      },
      headers: {
          token: localStorage.getItem("token")
      },
      success: function () {
          $("#newTodoModalProject").modal("hide")
          getMyProjects()
      },
      error: function (err) {
          let errorMessage
          if (typeof err.responseJSON == "string") {
              errorMessage = err.responseJSON
          } else {
              let jadinya = ""
              for (let i of err.responseJSON) {
                  jadinya += i + " "
              }
              errorMessage = jadinya
          }

          swal('Oops...', errorMessage, "error")
      }
  })
}

function previewMembers(id) {
  $.ajax(`${baseUrl}/projects/all/members/${id}`, {
      type: "GET",
      success: function (allMembers) {
          let isinya = listingMembers(allMembers)
          $("#membersLoop").empty()
          $("#membersLoop").append(isinya)
          $("#memberList").modal("show")
      },
      error: function (err) {
          swal('Oops...', err.responseJSON, "error")
      }
  })
      .then(listMember => {
          return listMember
      })
}

function listingMembers(membersnya) {
  let appendan = ""
  for (let i of membersnya) {
      appendan += `
      <div class="d-flex justify-content-between">
      <p onmouseover="this.style.color='lightgray'; this.style.cursor='pointer'" onmouseout="this.style.color='black'" onclick="action(${i.User.id})">${i.User.username}</p>
      <p> ${i.User.email}</p>
      </div>
      `
  }
  return appendan

}

function action(id) {

}
function preInvite(id) {
  $("#inviteMember").modal("show")
  $("#inviteThisMember").click(function () {
      let email = $("#emailMember").val()
      inviteMember(id, email)
  })
}

function inviteMember(id, email) {
  $.ajax(`${baseUrl}/projects/addMember/${id}`, {
      type: "POST",
      data: {
          email
      },
      headers: {
          token: localStorage.getItem("token")
      },
      success: function (hasinya) {
          getMyProjects()
          swal("Yay!", "Member has been successfully added!", "success")
      },
      error: function (err) {
          let errMessage
          if (typeof err.responseJSON == "string") {
              errMessage = err.responseJSON
          } else {
              errMessage = err.responseJSON.message
          }
          swal("Oops..", errMessage, "error")
      }
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax(`${baseUrl}/user/google`, {
      type: "POST",
      data: {
          id_token
      },
      success: function (succeed) {
          $("#errorMessage").hide()
          localStorage.setItem("token", succeed.token)
          localStorage.setItem("username", succeed.userFromGoogle.username)
          localStorage.setItem("UserId", succeed.userFromGoogle.id)
          $("#loginRegPage").hide()
          $("#main").show()

          $("#UsernameButton").text(function () {
              return succeed.userFromGoogle.username
          })
          getMyTodos()
      },
      error: function (err) {
          console.log(err)
      }
  })
}

function preDeleteProject(id) {
  $("#deleteProjectModal").modal("show")
  $.ajax(`${baseUrl}/projects/${id}`, {
      type: "GET",
      success: function (theResult) {
          let inside = appendConfirmationDelete(theResult)
          $("#confirmationDeleteProject").empty()
          $("#confirmationDeleteProject").append(inside)
          $("#deleteThisProject").click(function () {
              sureDeleteProject(id, theResult)
          })
      },
      error: function (err) {
          swal("Oops", "Something is wrong", "error")
      }
  })
}

function appendConfirmationDelete(insideResult) {
  forAppend = `
 <p>Please type in <strong>${insideResult.name}</strong> to continue</p>
 <form>
 <input type="text" id="sureDelete">
 </form>
 `
  return forAppend
}

function sureDeleteProject(id, dataProject) {
  let sesuatu = $("#sureDelete").val()
  if (sesuatu == dataProject.name) {
      $.ajax(`${baseUrl}/projects/${id}`, {
          type: "DELETE",
          headers: {
              token: localStorage.getItem("token")
          },
          success: function (theMessage) {
              swal("Ok", theMessage.message, "success")
              getMyProjects()
          },
          error: function (err) {
              swal("Oops", "something is wrong!", "error")
          }
      })
  } else {
      swal("Oops", "input does not match", "error")
  }

}