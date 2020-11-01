const SERVER = "http://localhost:3000/"

//global variables
let projectId = [];
let projectName = [];
let sidebar = []

// on reload
$(document).ready(function () {
  const token = localStorage.getItem('token')
  if (token) {
    $("#main-content").show()
    $("#register-page").hide()
    $("#login-page").hide()
    fetchProject()
    fetchTodo()
    fetchNotification()
  } else {
    $("#main-content").hide()
    $("#register-page").show()
    $("#login-page").hide()
  }
})

// global options
toastr.options.closeButton = true
toastr.options.progressBar = true

// global helper function
function showError(params) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: params,
  })
}

function showLogin(e) {
  e.preventDefault()
  $("#register-page").hide()
  $("#login-page").show()
}

function showRegister(e) {
  e.preventDefault()
  $("#register-page").show()
  $("#login-page").hide()
}

function register(e) {
  e.preventDefault()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  $.ajax({
    method: "POST",
    url: SERVER + "users/register",
    data: {
      email,
      password
    }
  })
    .done(response => {
      $("#register-page").hide()
      $("#login-page").show()
      $("#login-email").val(email)
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function login(e) {
  e.preventDefault()
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    method: "POST",
    url: SERVER + "users/login",
    data: {
      email,
      password
    }
  })
    .done(response => {
      const { accessToken, UserProjectId } = response
      localStorage.setItem("token", accessToken)
      localStorage.setItem("personalId", UserProjectId)
      toastr.success('Login success')
      $("#main-content").show()
      $("#register-page").hide()
      $("#login-page").hide()
      fetchTodo()
      fetchProject()
      fetchNotification()
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

// Google sign in
function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: SERVER + "users/googlelogin",
    data: {
      google_access_token
    }
  })
    .done(response => {
      const token = response.token
      localStorage.setItem("token", token)
      $("#main-content").show()
      $("#register-page").hide()
      $("#login-page").hide()
      fetchTodo()
      fetchProject()
      fetchNotification()
    })
    .fail(err => {
      console.log(err)
    })
}

function fetchProject() {
  $.ajax({
    method: "GET",
    url: SERVER + "projects",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(res => {
      $("#project-dropdown").empty()
      projectId = [];
      projectName = [];
      res.forEach(project => {
        const id = project.Project.id
        const name = project.Project.name
        projectId.push(id)
        projectName.push(name)
        const html = `
        <a onclick=fetchTodo(${id}) class="dropdown-item dropdown-project">${name}</a>
        `
        $("#project-dropdown").append(html)
      })
      const html = `
      <div class="dropdown-divider"></div>
      <a onclick=showAddProject() class="dropdown-item dropdown-project">Add project</a>
      `
      $("#project-dropdown").append(html)
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function fetchNotification() {
  $.ajax({
    method: 'GET',
    url: SERVER + 'notifications',
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(res => {
      $("#notification-content").empty()
      $("#notification_count").empty()
      if (!res.length) {
        const html = `
          <div class="dropdown-item notification">
                <div class="notification-title">No notification</div>
              </div>
          `
        $("#notification-content").append(html)
      } else {
        $("#notification_count").append(`${res.length}`)
        res.forEach(notification => {
          console.log(notification)
          const html = `
          <div class="dropdown-item notification">
                <div class="notification-title">New project invitation</div>
                <div class="notification-body text-wrap text-muted"><span id="email-notif">${notification.assigner}</span> is
                  inviting you
                  to
                  project
                  <span id="project-notif">${notification.Project.name}</span> do you want to accept their invitation?</div>
                <div class="d-flex justify-content-center">
                  <button onclick=deleteNotification(${notification.id}) class="notification-button btn-cancel">Decline</button>
                  <button onclick=acceptInvitation(${notification.id}) class="notification-button btn-confirm">Accept</button>
                </div>
              </div>
          `
          $("#notification-content").append(html)
        })
      }
    })
    .fail(err => {
      console.log(err)
    })
}

function fetchNews() {
  $.ajax({
    method: "GET",
    url: SERVER + "news"
  })
    .done(res => {
      console.log(res)
      sidebar = [];
      $("#covid-news").empty()
      for (let i = 0; i < 4; i++) {
        const image = res[i].poster
        const title = res[i].judul
        const category = res[i].tipe
        const publishedAt = res[i].waktu
        sidebar.push(res[i].link)
        const html = `
        <div class="card covid-news-card">
        <div class="card-body">
          <div class="row">
            <div class="col-4">
              <img src="${image}" alt="" class="news-image-sidebar">
              <button onclick="showNews(id)" id="sidebar-${i}"  onclick="showNews(id)" class="btn-read">Read</button>
            </div>
            <div class="col">
              <h6>${title}</h6>
              <p class="card-text">${category}</p>
              <p class="card-text"><i class="far fa-clock news-icon"></i> ${publishedAt}</p>
            </div>
          </div>
        </div>
        </div>        
        `
        $("#covid-news").append(html)
      }
    })
    .fail(err => {
      console.log(err)
    })
}

function deleteNotification(params) {
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure want to delete this item?',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
    reverseButtons: true
  })
    .then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token')
        $.ajax({
          method: 'delete',
          url: SERVER + `notifications/${params}`,
          headers: {
            token
          }
        })
          .done(res => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Item has been deleted!',
              timer: 1000,
              showConfirmButton: false
            })
            fetchTodo()
            fetchProject()
            fetchNotification()
          })
          .fail(err => {
            showError(err.responseJSON.msg)
          })
      }
    })
}

function acceptInvitation(params) {
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'POST',
    url: SERVER + 'userprojects',
    headers: {
      token
    },
    data: {
      id: params
    }
  })
    .done(res => {
      Swal.fire({
        icon: 'success',
        title: 'Accepted!',
        text: 'Invitation request has been accepted! Please reload to see project',
        timer: 1000,
        showConfirmButton: false
      })
      fetchTodo()
      fetchProject()
      fetchNotification()
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
  $.ajax({
    method: 'delete',
    url: SERVER + `notifications/${params}`,
    headers: {
      token
    }
  })
    .done(res => {

    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function getProjectName(params) {
  $.ajax({
    method: 'GET',
    url: SERVER + `projects/${params}`,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(res => {
      $("#project-selected").empty().append(`${res.name}`)
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function fetchTodo(params) {
  if (!params) {
    params = localStorage.getItem("personalId")
  }
  $.ajax({
    method: "GET",
    url: SERVER + `todos/project/${params}`,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(res => {
      $("#todo-content").empty()
      $("#doing-content").empty()
      $("#done-content").empty()
      let todoCount = 0;
      let doingCount = 0;
      let doneCount = 0;
      $("#edit-project").empty().append(`
        <button onclick=showEditProject(${params}) class="btn btn-project"><i class="fa fa-edit"></i></button>
        <button onclick=showInviteProject(${params}) class="btn btn-project"><i class="fa fa-user-plus"></i></button>
        `)
      if (!res.length) {
        getProjectName(params)
      } else {
        const todos = res
        $("#project-selected").empty().append(`${res[0].Project.name}`)
        todos.forEach(todo => {
          const date = new Date(todo.due_date).toDateString()
          const html = `
        <div class="card todo-card">
          <div class="card-body">
            <div class="card-title todo-title d-flex justify-content-between">
              <h6>${todo.title}</h6>
              <a class="close-btn"><i class="fas fa-palette todo-icon"></i></a>
            </div>
            <div class="scrollable todo-body">
              <p class="card-text todo-description text-muted">${todo.description}</p>
            </div>
            <div class="row todo-footer">
              <div class="col">
                <p><i class="far fa-calendar-alt todo-icon"></i>${date}</p>
              </div>
              <div class="col-3 d-flex justify-content-right">
                <a onclick = showEdit(${todo.id}) ><i class="fa fa-edit todo-icon"></i></a>
                <a onclick = deleteTodo(${todo.id}) ><i class="fa fa-trash todo-icon"></i></a>
              </div>
            </div>
          </div>
        </div>
        `
          switch (todo.status) {
            case "To do":
              $("#todo-content").append(html)
              todoCount += 1;
              break;
            case "Doing":
              $("#doing-content").append(html)
              doingCount += 1;
              break;
            case "Done":
              $("#done-content").append(html)
              doneCount += 1;
              break;
            default:
              break;
          }
        });
      }
      $("#todo-count").empty().append(todoCount)
      $("#doing-count").empty().append(doingCount)
      $("#done-count").empty().append(doneCount)
    })
    .fail(err => {
      console.log(err)
    })
}

function showAddTodo(params) {
  $("#addtodo-title").val('')
  $("#addtodo-description").val('')
  $("#addtodo-status").val(params)
  $('#addtodo-due_date').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayHighlight: true,
    startDate: new Date()
  });
  $("#addtodo-project").empty()
  $("#addtodo-due_date").val('')
  for (let i = 0; i < projectId.length; i++) {
    $("#addtodo-project").append(`
      <option value="${projectId[i]}">${projectName[i]}</option>
    `)
  }
  $("#todoform-modal").modal('show')

}

function addTodo(e) {
  e.preventDefault()
  const title = $("#addtodo-title").val()
  const description = $("#addtodo-description").val()
  const status = $("#addtodo-status").val()
  const due_date = $("#addtodo-due_date").val()
  const ProjectId = $("#addtodo-project").val()
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'POST',
    url: SERVER + "todos",
    data: {
      title,
      description,
      status,
      due_date,
      ProjectId
    },
    headers: {
      token
    }
  })
    .done(res => {
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Item has been added!',
        timer: 1000,
        showConfirmButton: false
      })
      fetchTodo(ProjectId)
      $('#todoform-modal').modal('hide')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function showEdit(param) {
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: SERVER + `todos/${param}`,
    headers: {
      token
    }
  })
    .done(res => {
      console.log(res)
      let { id, title, description, status, due_date } = res
      due_date = formatDate(due_date)
      $("#edit-todo-title").val(title)
      $("#edit-todo-description").val(description)
      $("#edit-todo-status").val(status)
      $("#edit-todo-due_date").val(due_date)
      $('#edit-todo-due_date').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        startDate: new Date()
      });
      $("#edit-btn").empty().append(`
      <button onclick=editTodo(${id}) class="btn btn-confirm" > Edit todo</button >
        `)
      $("#edit-todo-project").empty()
      for (let i = 0; i < projectId.length; i++) {
        $("#edit-todo-project").append(`
          <option value="${projectId[i]}">${projectName[i]}</option>
        `)
      }
      $("#todo-edit-form-modal").modal('show')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function editTodo(params) {
  const title = $("#edit-todo-title").val()
  const description = $("#edit-todo-description").val()
  const status = $("#edit-todo-status").val()
  const due_date = $("#edit-todo-due_date").val()
  const ProjectId = $("#edit-todo-project").val()
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'PUT',
    url: SERVER + `todos/${params}`,
    data: {
      title,
      description,
      status,
      due_date,
      ProjectId
    },
    headers: {
      token
    }
  })
    .done(res => {
      $("#todo-edit-form-modal").modal('hide')
      Swal.fire({
        icon: 'success',
        title: 'Edited!',
        text: 'Item has been edited!',
        timer: 1000,
        showConfirmButton: false
      })
      fetchTodo(ProjectId)
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function deleteTodo(param) {
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure want to delete this item?',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
    reverseButtons: true
  })
    .then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token')
        $.ajax({
          method: 'DELETE',
          url: SERVER + `todos/${param}`,
          headers: {
            token
          }
        })
          .done(res => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Item has been deleted!',
              timer: 1000,
              showConfirmButton: false
            })
            fetchTodo()
          })
          .fail(err => {
            showError(err.responseJSON.msg)
          })
      }
    })
}

function showAddProject() {
  $("#project-add-name").val('')
  $("#project-add-description").val('')
  $("#project-add-modal").modal("show")
}

function addProject(e) {
  e.preventDefault()
  const token = localStorage.getItem('token')
  const name = $("#project-add-name").val()
  const description = $("#project-add-description").val()
  $.ajax({
    method: "POST",
    url: SERVER + "projects",
    headers: {
      token
    },
    data: {
      name,
      description
    }
  })
    .done(res => {
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Item has been added!',
        timer: 1000,
        showConfirmButton: false
      })
      fetchTodo(res.id)
      fetchProject()
      $('#project-add-modal').modal('hide')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function showEditProject(params) {
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: SERVER + `projects/${params}`,
    headers: {
      token
    }
  })
    .done(res => {
      $("#project-edit-name").val(res.name)
      $("#project-edit-description").val(res.description)
      $("#btn-delete-project").empty().append(`
      <button onclick = deleteProject(${res.id}) class="btn btn-cancel">Delete project</button>
      `)
      $("#btn-edit-project").empty().append(`
      <button onclick = editProject(${res.id}) class="btn btn-confirm">Edit project</button>
      `)
      $("#project-edit-modal").modal('show')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function editProject(params) {
  const name = $("#project-edit-name").val()
  const description = $("#project-edit-description").val()
  const token = localStorage.getItem('token')
  $.ajax({
    method: "PUT",
    url: SERVER + `projects/${params}`,
    headers: {
      token
    },
    data: {
      name,
      description
    }
  })
    .done(res => {
      Swal.fire({
        icon: 'success',
        title: 'Edited!',
        text: 'Item has been edited!',
        timer: 1000,
        showConfirmButton: false
      })
      fetchTodo(res.id)
      fetchProject()
      $('#project-edit-modal').modal('hide')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })
}

function deleteProject(params) {
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure want to delete this item?',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
    reverseButtons: true
  })
    .then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token')
        $.ajax({
          method: 'DELETE',
          url: SERVER + `projects/${params}`,
          headers: {
            token
          }
        })
          .done(res => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Item has been deleted!',
              timer: 1000,
              showConfirmButton: false
            })
            fetchTodo()
            fetchProject()
            $('#project-edit-modal').modal('hide')
          })
          .fail(err => {
            showError(err.responseJSON.msg)
          })
      }
    })
}

function showInviteProject(params) {
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: SERVER + `projects/${params}`,
    headers: {
      token
    }
  })
    .done(res => {
      $("#invite-project-btn").empty().append(`
        <button onclick=inviteProject(${res.id}) type="submit" class="btn btn-confirm">Invite User</button>
      `)
      $("#project-invite-modal").modal("show")
    })
    .fail(err => {
      showError('You cannot invite another user to personal project')
    })
}

function inviteProject(params) {
  const invitationInput = $("#project-invite-name").val()
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'POST',
    url: SERVER + `projects/${params}/invite`,
    headers: {
      token
    },
    data: {
      invitationInput
    }
  })
    .done(res => {
      Swal.fire({
        icon: 'success',
        title: 'Invited!',
        text: `${res.msg}`,
        timer: 2000,
        showConfirmButton: false
      })
      fetchTodo(params)
      fetchProject()
      $('#project-invite-modal').modal('hide')
    })
    .fail(err => {
      showError(err.responseJSON.msg)
    })

}

function logout() {
  Swal.fire({
    icon: 'info',
    title: 'Are you sure want to logout?',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
    reverseButtons: true
  })
    .then((result) => {
      if (result.isConfirmed) {
        $("#login-page").show()
        $("#main-content").hide()
        localStorage.removeItem("token")
        localStorage.removeItem("personalId")
        $("#login-email").val("")
        $("#login-password").val("")
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
    })
}

function formatDate(thisDate) {
  let date = new Date(thisDate)
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  const year = date.getFullYear()

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}